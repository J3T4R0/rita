import {Atom} from "./Atom";
import {Term} from "./Term";
import {assertNumberOrDate} from "../assertions";
import {add, sub, Duration, format} from "date-fns"

enum dateUnits {
    seconds = "seconds",
    minutes = "minutes",
    hours = "hours",
    days = "days",
    months = "months",
    years = "years"
}

enum operations {
    add = "add",
    subtract = "subtract",
    multiply = "multiply",
    divide = "divide",
    modulo = "modulo"
}

export function mapParameterToJSONReady(item: Atom | number | Date | string | Calculation) {
    if (item instanceof Atom || item instanceof Calculation) {
        return item.toJsonReady();
    } else if (item instanceof Date) {
        return format(item, "yyyy-MM-dd")
    } else {
        return item;
    }

}

export class Calculation extends Term {
    public parameters: Array<Atom | number | Date | Calculation>;

    public operation: operations;

    public dateResultUnit: dateUnits;

    public dateCalculationUnit: dateUnits;


    constructor(parameters: Array<Atom | number | Date | Calculation>, operation: operations, dateResultUnit: dateUnits = dateUnits.seconds, dateCalculationUnit: dateUnits = dateUnits.seconds) {
        super();
        this.parameters = parameters;
        this.operation = operation;
        this.dateResultUnit = dateResultUnit;
        this.dateCalculationUnit = dateCalculationUnit;
    }

    private dateMath(func: (x1: number, x2: number) => number): (d1: Date | Duration, d2: Date | Duration) => Date | Duration {
        function unionSet(setA: Array<string>, setB: Array<string>): Array<string> {
            let _union = new Set(setA);
            for (let elem of setB) {
                _union.add(elem);
            }
            return Array.from(_union);
        }

        const operation = this.operation;

        return function (d1: Date | Duration, d2: Date | Duration) {
            if (d1 instanceof Date && d2 instanceof Date) {
                return new Date(func(d1.getTime(), d2.getTime()));
            }
            if (!(d1 instanceof Date) && !(d2 instanceof Date)) {
                const keys = unionSet(Object.keys(d1), Object.keys(d2));
                const d: Duration = {};
                for (let key of keys) {
                    // @ts-ignore
                    d[key] = d1[key] | 0 + d2[key] | 0;
                }
                return d;
            }

            let date: Date;
            let duration: Duration;
            if (d1 instanceof Date && !(d2 instanceof Date)) {
                date = d1;
                duration = d2;
            } else {
                date = <Date>d2;
                duration = <Duration>d1;
            }
            switch (operation) {
                case operations.add:
                    return add(date, duration);
                case operations.subtract:
                    return sub(date, duration);
                default:
                    throw new TypeError("Invalid Operation for Dates")
            }

        }
    }

    evaluate(data: Record<string, any>): Date | number {
        let func: (x1: any, x2: any) => number;
        switch (this.operation) {
            case operations.add:
                func = (x1, x2) => x1 + x2;
                break;
            case operations.subtract:
                func = (x1, x2) => x1 - x2;
                break;
            case operations.multiply:
                func = (x1, x2) => x1 * x2;
                break;
            case operations.divide:
                func = (x1, x2) => x1 / x2;
                break
            case operations.modulo:
                func = (x1, x2) => x1 % x2;
        }

        let results = this.parameters.map(item => ((item instanceof Calculation) || (item instanceof Atom)) ? item.evaluate(data) : item);
        let calculatingDates = false;
        for (const parameter of results) {
            if (parameter instanceof Date) {
                calculatingDates = true;
                break;
            }
        }
        if (calculatingDates) {
            const tmp = results.map(item => {
                assertNumberOrDate(item);
                if (typeof item === 'number') {
                    let d: Duration;
                    d = {[this.dateCalculationUnit]: item};
                    return d;
                } else {
                    return item;
                }
            });
            return <Date>tmp.reduce(this.dateMath(func), {days: 0});
        } else {
            return <number>results.splice(1).reduce(func, results[0]);

        }
    }

    toJsonReady(): Record<string, any> {
        return {
            type: "calculation",
            operation: this.operation,
            parameters: this.parameters.map(mapParameterToJSONReady),
            dateResultUnit: this.dateResultUnit,
            dateCalculationUnit: this.dateCalculationUnit
        };
    }

    validate(): boolean {
        //@TODO
        return true;
    }
}

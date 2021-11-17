import {Atom} from "./Atom";
import {Term} from "./Term";
import {assertNumberOrDate} from "../Assertions";
import {DateTime, Duration, DurationObjectUnits} from "luxon";


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
        return DateTime.fromJSDate(item).toISO();
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

    private dateMath(func: (x1: number, x2: number) => number): (d1: Date | DurationObjectUnits, d2: Date | DurationObjectUnits) => Date  | DurationObjectUnits {

        const operation = this.operation;

        return function (d1: Date | DurationObjectUnits, d2: Date | DurationObjectUnits) {

            if (d1 instanceof Date && d2 instanceof Date) {
                const d: Duration = Duration.fromMillis(func(d1.getTime(), d2.getTime()));
                return d.toObject();
            }
            if (!(d1 instanceof Date) && !(d2 instanceof Date)) {
                const d_p1: Duration = Duration.fromObject(d1);
                const d_p2: Duration = Duration.fromObject(d2);
                return Duration.fromMillis(func(d_p1.toMillis(), d_p2.toMillis())).toObject();
            }

            let date: Date;
            let duration: Duration;
            if (d1 instanceof Date && !(d2 instanceof Date)) {
                date = d1;
                duration = <Duration>d2;
            } else {
                date = <Date>d2;
                duration = <Duration>d1;
            }
            const lDate: DateTime = DateTime.fromJSDate(date);
            switch (operation) {
                case operations.add:
                    return lDate.plus(duration).toJSDate();
                case operations.subtract:
                    return lDate.minus(duration).toJSDate();
                default:
                    throw new TypeError("Invalid Operation for Dates");
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
                break;
            case operations.modulo:
                func = (x1, x2) => x1 % x2;
                break;
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
                    let d: DurationObjectUnits;
                    d = {[this.dateCalculationUnit]: item};
                    return d;
                } else {
                    return item;
                }
            });
            const res = tmp.splice(1).reduce(this.dateMath(func), tmp[0]);
            if (res instanceof Date) {
                return res;
            }
            return Duration.fromObject(res).as(this.dateResultUnit);



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
        return this.parameters.length >= 2;
    }
}

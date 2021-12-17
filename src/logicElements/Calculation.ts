import {Atom} from "./Atom";
import {Term} from "./Term";
import {assertNumberOrDate} from "../Assertions";
import {DateTime, Duration} from "luxon";
import {RulesetError} from "../Errors";

/**
 * Possible units for time intervals
 */
enum timeUnits {
    seconds = "seconds",
    minutes = "minutes",
    hours = "hours",
    days = "days",
    months = "months",
    years = "years"
}

/**
 * Mathematical operations
 */
enum operations {
    add = "add",
    subtract = "subtract",
    multiply = "multiply",
    divide = "divide",
    modulo = "modulo"
}

/**
 * A function that is supposed to be used as argument for the Array.map() function, to map parameters to their rita-json ready counterparts.
 * @param item The item to be mapped
 * @example ```typescript
 *      const jsonParameters = someCalculation.parameters.map(mapParameterToJSONReady);
 */
export function mapParameterToJSONReady(item: Atom | number | Date | string | Calculation) {
    if (item instanceof Atom || item instanceof Calculation) {
        return item.toJsonReady();
    } else if (item instanceof Date) {
        return DateTime.fromJSDate(item).toISO();
    } else {
        return item;
    }

}

/**
 * Class for all calculations.
 * Calculations are also possible with Dates (for details see schema)
 */
export class Calculation extends Term {
    /**
     * The parameters of the calculation
     */
    public parameters: Array<Atom | number | Date | Calculation>;

    /**
     * The operation of the calculation
     */
    public operation: operations;

    /**
     * The unit of the result of the calculation when calculating with dates and result is a number
     */
    public dateResultUnit: timeUnits;

    /**
     * The unit to calculate when calculating with dates and numbers
     */
    public dateCalculationUnit: timeUnits;


    /**
     *
     * @param parameters The parameters of the calculation
     * @param operation The operation of the calculation
     * @param dateResultUnit The unit of the result of the calculation when calculating with dates and result is a number
     * @param dateCalculationUnit The unit to calculate when calculating with dates and numbers
     */
    constructor(parameters: Array<Atom | number | Date | Calculation>, operation: operations, dateResultUnit: timeUnits = timeUnits.seconds, dateCalculationUnit: timeUnits = timeUnits.seconds) {
        super();
        this.parameters = parameters;
        this.operation = operation;
        this.dateResultUnit = dateResultUnit;
        this.dateCalculationUnit = dateCalculationUnit;
    }

    /**
     * Generates a function that can be used in an Array.reduce function as argument to reduce parameters of a calculation
     * @param func The function of the operation that needs to be calculated
     * @private
     * @example ```typescript
     *      const tmp = someDateCalculation.parameters;
     *      const result = tmp.splice(1).reduce(this.dateMath(func), tmp[0]);
     */
    private dateMath(func: (x1: number, x2: number) => number): (d1: Date | Duration, d2: Date | Duration) => Date  | Duration {

        const operation = this.operation;

        return function (d1: Date | Duration, d2: Date | Duration): Date | Duration {

            //If arguments are two dates, calculate the result with the milliseconds of the dates
            if (d1 instanceof Date && d2 instanceof Date) {
                return Duration.fromMillis(func(d1.getTime(), d2.getTime()));
            }

            //If neither arguments are dates, combine the durations by applying the function to their millisecond values
            if (!(d1 instanceof Date) && !(d2 instanceof Date)) {
                return Duration.fromMillis(func(d1.toMillis(), d2.toMillis()));
            }

            //If neither of the above returned, we now know one must be a date and one a duration, so let's find out which is which
            let date: Date;
            let duration: Duration;
            if (d1 instanceof Date && !(d2 instanceof Date)) {
                date = d1;
                duration = <Duration>d2;
            } else {
                date = <Date>d2;
                duration = <Duration>d1;
            }

            //Add or subtract the duration to/from the date
            const lDate: DateTime = DateTime.fromJSDate(date);
            switch (operation) {
                case operations.add:
                    return lDate.plus(duration).toJSDate();
                case operations.subtract:
                    return lDate.minus(duration).toJSDate();
                default:
                    throw new RulesetError("Invalid Operation for Dates");
            }

        }
    }

    evaluate(data: Record<string, any>): Date | number {
        if (!this.validate()) {
            throw new RulesetError("Calculations need at least two parameters")
        }

        //Get the function matching our operation
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

        //Now evaluate all parameters if they can be evaluated
        let results = this.parameters.map(item => ((item instanceof Calculation) || (item instanceof Atom)) ? item.evaluate(data) : item);

        //Check if dates are involved in th calculation
        let calculatingDates = false;
        for (const parameter of results) {
            if (parameter instanceof Date) {
                calculatingDates = true;
                break;
            }
        }

        //If dates are involved
        if (calculatingDates) {
            //Map numbers to durations
            const tmp = results.map(item => {
                assertNumberOrDate(item);
                if (typeof item === 'number') {
                    return Duration.fromObject({[this.dateCalculationUnit]: item});
                } else {
                    return item;
                }
            });

            //Reduce the array with the dateMath function
            const res = tmp.splice(1).reduce(this.dateMath(func), tmp[0]);
            if (res instanceof Date) {
                return res;
            }
            return res.as(this.dateResultUnit);



        } else {
            //No dates are involved, just reduce the array with the function
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

import {Term} from "./Term"
import {Atom} from "./Atom";
import {Calculation, mapParameterToJSONReady} from "./Calculation";
import {RulesetError, UnimplementedError} from "../Errors";

/**
 * Types of comparisons
 */
enum comparisons {
    equals = "equals",
    smaller = "smaller",
    greater = "greater",
    smallerOrEqual = "smallerOrEqual",
    greaterOrEqual = "greaterOrEqual"
}

/**
 * Parent class for all Comparisons
 */
export class Comparison extends Term {
    /**
     * The parameters of the comparison
     */
    public parameters: Array<(Atom | number | Date | string | Calculation)>

    /**
     * Type of the comparison
     */
    public operation: comparisons;

    /**
     * @constructor
     * @param parameters The parameters
     * @param operation Type of the comparison
     */
    constructor(parameters: Array<(Atom | number | Date | string | Calculation)>, operation: comparisons) {
        super();
        this.parameters = parameters;
        this.operation = operation;
    }

    toJsonReady(): Record<string, any> {
        return {
            type: "comparison",
            operation: this.operation,
            parameters: this.parameters.map(mapParameterToJSONReady)
        };
    }

    evaluate(data: Record<string, any>): boolean {
        if (!this.validate()) {
            throw new RulesetError("Comparisons need exactly two parameters")
        }

        //if one of the parameters is either an Atom or a Calculation evaluate it first
        const p1 = (this.parameters[0] instanceof Atom || this.parameters[0] instanceof Calculation) ? this.parameters[0].evaluate(data): this.parameters[0];
        const p2 = (this.parameters[1] instanceof Atom || this.parameters[1] instanceof Calculation)? this.parameters[1].evaluate(data):this.parameters[1];

        if (p1 === undefined || p2 === undefined) return false;

        switch (this.operation) {
            case comparisons.equals:
                return p1 === p2;
            case comparisons.greater:
                return p1 > p2;
            case comparisons.greaterOrEqual:
                return p1 >= p2;
            case comparisons.smaller:
                return p1 < p2;
            case comparisons.smallerOrEqual:
                return p1 <= p2;
            default:
                throw new UnimplementedError("Unknown operation");
        }
    }

    validate(): boolean {
        return this.parameters.length === 2;
    }
}

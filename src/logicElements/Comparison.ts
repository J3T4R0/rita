import {Term} from "./Term"
import {Atom} from "./Atom";
import {Calculation} from "./Calculation";

enum comparisons {
    equals="equals",
    smaller="smaller",
    greater="greater",
    smallerOrEqual="smallerOrEqual",
    greaterOrEqual="greaterOrEqual"
}

/**
 * Parent class for all Comparisons
 */
export class Comparison extends Term {
    /**
     * The parameters of the operator
     */
    public parameters: Array<(Atom| number| Date| String | Calculation)>

    public operation: comparisons;

    /**
     * @constructor
     * @param parameters The parameters
     * @param operation Type of the comparison
     */
    constructor(parameters: Array<(Atom| number| Date| String)>, operation: comparisons) {
        super();
        this.parameters = parameters;
        this.operation = operation;
    }

    toJsonReady(): Record<string, any> {
        return {
            type: "comparison",
            operation: this.operation,
            parameters: this.parameters.map(item => {
                if (item instanceof Atom) {
                    return item.toJsonReady();
                } else {
                    return item;
                }
            })
        };
    }

    evaluate(data: Record<string, any>): boolean {
        let p1, p2;
        if(this.parameters[0] instanceof Atom || this.parameters[0] instanceof Calculation) p1 = this.parameters[0].evaluate(data);
        if(this.parameters[1] instanceof Atom || this.parameters[1] instanceof Calculation) p2 = this.parameters[1].evaluate(data);
        if(p1===undefined || p2 ===undefined) return false;
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
        }
    }

    validate(): boolean {
        //@TODO
        return true;
    }
}

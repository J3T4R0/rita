import {Term} from "./Term"

/**
 * Parent class for all operators
 */
export abstract class Operator extends Term {
    /**
     * The parameters of the operator
     */
    public parameters: Array<Term>

    /**
     * @constructor
     * @param parameters The parameters of the operator
     */
    constructor(parameters: Array<Term>) {
        super();
        this.parameters = parameters;
    }

    abstract evaluate(data: Record<string, any>): boolean

    abstract validate(): boolean;

    toJsonReady(): Record<string, any> {
        return {
            parameters: this.parameters.map(item => item.toJsonReady())
        };
    }
}

/**
 * "And" Operator
 * Behaves like "&&" in JavaScript when evaluated
 */
export class And extends Operator {
    evaluate(data: Record<string, any>): boolean {
        if (!this.validate()) {
            throw new Error("'and' needs at least two parameters")
        }
        return this.parameters.reduce((acc: boolean, curr: Term):boolean => acc && curr.evaluate(data), true);
    }

    validate(): boolean {
        return this.parameters.length > 1;
    }

    toJsonReady(): Record<string, any> {
        return {
            ...super.toJsonReady(),
            type: 'and'
        };
    }
}

/**
 * "Not" Operator
 * Behaves like "!" in JavaScript when evaluated
 */
export class Not extends Operator{
    evaluate(data: Record<string, any>): boolean {
        if (!this.validate()) {
            throw new Error("'not' accepts only one parameter")
        }
        return !this.parameters[0].evaluate(data);
    }

    validate(): boolean {
        return this.parameters.length === 1;
    }

    toJsonReady(): Record<string, any> {
        return {
            ...super.toJsonReady(),
            type: 'not'
        };
    }
}

/**
 * "Or" Operator
 * Behaves like || in JavaScript when evaluated
 */
export class Or extends Operator {
    evaluate(data: Record<string, any>): boolean {
        if (!this.validate()) {
            throw new Error("'or' needs at least two parameters")
        }
        return this.parameters.reduce((acc: boolean, curr: Term):boolean => acc || curr.evaluate(data), false);
    }

    validate(): boolean {
        return this.parameters.length > 1;
    }

    toJsonReady(): Record<string, any> {
        return {
            ...super.toJsonReady(),
            type: 'or'
        };
    }
}

/**
 * "Xor" Operator
 * Exclusive Or
 * NOT the same thing as "only on" for more than two parameters, e.g.: true xor true xor true = (true xor true) xor true = false xor true = true
 */
export class Xor extends Operator {
    private static xor(a: boolean, b: boolean): boolean {
        return (a || b) && !(a && b)
    }

    evaluate(data: Record<string, any>): boolean {
        if (!this.validate()) {
            throw new Error("'xor' needs at least two parameters")
        }
        return this.parameters.reduce((acc: boolean, curr: Term): boolean => Xor.xor(acc, curr.evaluate(data)), false);
    }

    validate(): boolean {
        return this.parameters.length > 1;
    }

    toJsonReady(): Record<string, any> {
        return {
            ...super.toJsonReady(),
            type: 'xor'
        };
    }
}

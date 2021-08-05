import {Term} from "./Term"

export abstract class Operator extends Term {
    public parameters: Array<Term>

    constructor(parameters: Array<Term>) {
        super();
        this.parameters = parameters;
    }

    abstract evaluate(data: Record<string, any>): boolean

    abstract validate(): boolean;
}

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

}

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

}

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

}

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

}

import {Term} from "../../elements"

export abstract class Operator extends Term {
    public parameters: Array<Term>

    constructor(parameters: Array<Term>) {
        super();
        this.parameters = parameters;
    }

    abstract evaluate(data: Record<string, any>): boolean

    abstract validate(): boolean;
}

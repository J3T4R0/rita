import {Operator} from "../../elements";

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

};

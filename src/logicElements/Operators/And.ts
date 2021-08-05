import Operator from "./Operator";
import Term from "../Term";

export default class And extends Operator {
    evaluate(data: Record<string, any>): boolean {
        if (!this.validate()) {
            throw new Error("'and' needs at least two parameters")
        }
        return this.parameters.reduce((acc: boolean, curr: Term):boolean => acc && curr.evaluate(data), true);
    }

    validate(): boolean {
        return this.parameters.length > 1;
    }

};

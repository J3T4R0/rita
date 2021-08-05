import Operator from "./Operator";
import Term from "../Term";

export default class Or extends Operator {
    evaluate(data: Record<string, any>): boolean {
        if (!this.validate()) {
            throw new Error("'or' needs at least two parameters")
        }
        return this.parameters.reduce((acc: boolean, curr: Term):boolean => acc || curr.evaluate(data), false);
    }

    validate(): boolean {
        return this.parameters.length > 1;
    }

};

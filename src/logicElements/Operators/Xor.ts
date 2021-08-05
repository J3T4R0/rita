import Operator from "./Operator";
import Term from "../Term";

export default class Xor extends Operator {
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

};

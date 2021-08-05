import Term from "../Term";
import Not from "./Not";
import Or from "./Or";
import And from "./And";
import Xor from "./Xor";

export default abstract class Operator extends Term {
    public parameters: Array<Term>

    static parseOperator(jsonRuleset: Record<string, any>): Operator {
        const parameters: Array<Term> = []
        for (const parameter of jsonRuleset["parameters"]) {
            parameters.push(Term.parseTerm(parameter));
        }
        switch (jsonRuleset["type"]) {
            case "not":
                return new Not(parameters)
            case "and":
                return new And(parameters)
            case "or":
                return new Or(parameters)
            case "xor":
                return new Xor(parameters)
            default:
                throw new Error("Invalid type: " + jsonRuleset["type"]);
        }
    }

    protected constructor(parameters: Array<Term>) {
        super();
        this.parameters = parameters;
    }

    abstract evaluate(data: Record<string, any>): boolean

    abstract validate(): boolean;
}

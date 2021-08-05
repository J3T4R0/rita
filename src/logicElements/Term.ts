import Atom from "./Atom";
import Operator from "./Operators/Operator";

export default abstract class Term {
    static parseTerm(jsonRuleset: Record<string, any>): Term {
        switch (jsonRuleset["type"]) {
            case "atom":
                return Atom.parseAtom(jsonRuleset);
            default:
                return Operator.parseOperator(jsonRuleset);
        }
    }
    /**
     * Evaluates the term with the given data
     * @param data The data that's used for evaluation
     */
    abstract evaluate(data: Record<string, any>): boolean;

    /**
     * Check if the term is valid
     */
    abstract validate(): boolean;
}

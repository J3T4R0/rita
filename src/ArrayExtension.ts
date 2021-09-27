import {logger} from "./Logger";
import {Rule} from "./logicElements/Rule"

/**
 * This class extends the Array Prototype to have a method evaluateAll to evaluate all rules in an array at once.
 */

export {}

type EvaluationDetails = {
    /**
     * The ID of the rule
     */
    id: string;

    /**
     * The result of the rule
     */
    result: boolean;
};
type EvaluationResult = {

    /**
     * The result of all rules combined (combined by logical "and")
     */
    result: boolean;

    /**
     * Amount of rules that were evaluated to true or false respectively.
     */
    counts: {
        true: number,
        false: number
    }

    /**
     * The results for every rule
     */
    details: Array<EvaluationDetails>
}


declare global {
    interface Array<T> {
        evaluateAll(data: Record<string, any>): EvaluationResult;
    }
}

if (!Array.prototype.evaluateAll) {
    Array.prototype.evaluateAll = function <T>(this: T[], data: Record<string, any>): EvaluationResult {
        const ret: EvaluationResult = {
            result: true,
            details: [],
            counts: {
                true: 0,
                false: 0
            }
        }
        for (const argument of this) {
            if (argument instanceof Rule) {
                let evaluated = argument.evaluate(data);
                if (evaluated) ret.counts.true++; else ret.counts.false++;
                ret.result = ret.result && evaluated;
                ret.details.push({
                    id: argument.id,
                    result: evaluated
                })
            } else {
                logger.warn("Skipping element at index "+this.indexOf(argument)+" because it isn't of type 'Rule'.")
            }
        }

        return ret;
    };
}

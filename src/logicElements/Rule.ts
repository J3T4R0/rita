import {Term} from "./Term";

/**
 * A Rule that can be evaluated
 */
export class Rule {
    /**
     * The id of the rule
     */
    public readonly id: string;
    /**
     * The root of the rule
     */
    public rule: Term;

    constructor(id: string, rule: Term) {
        this.id = id;
        this.rule = rule;
    }

    public evaluate(data: Record<string, any>): boolean {
        return this.rule.evaluate(data);
    }

    public toJsonReady(): Record<string, any> {
        return {
            id: this.id,
            rule: this.rule.toJsonReady()
        }
    }
}

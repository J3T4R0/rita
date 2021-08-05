import {Term} from "../elements";

export class Rule {
    public readonly id: string;
    public rule: Term;


    constructor(id: string, rule: Term) {
        this.id = id;
        this.rule = rule;
    }

    public evaluate(data: Record<string, any>): boolean {
        return this.rule.evaluate(data);
    }
};

import Operator from "./Operators/Operator";
import Term from "./Term";

export default class Rule {
    public readonly id: string;
    public rule: Term;


    constructor(id: string, rule: Term) {
        this.id = id;
        this.rule = rule;
    }


    static parseRule(jsonRuleset: Record<string, any>):Rule {
        return new Rule(jsonRuleset["id"], Operator.parseTerm(jsonRuleset["rule"]));
    }
};

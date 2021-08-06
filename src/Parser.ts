import {Term, Operator, Atom, Rule, And, Not, Or, Xor} from "./elements"

export function parseRuleSet(jsonRuleset: Record<string, any>): Array<Rule> {
    return jsonRuleset.rules.map((item: Record<string, any>) => parseRule(item))
}

export function parseRule(jsonRuleset: Record<string, any>):Rule {
    return new Rule(jsonRuleset["id"], parseTerm(jsonRuleset["rule"]));
}

function parseTerm(jsonRuleset: Record<string, any>): Term {
    switch (jsonRuleset["type"]) {
        case "atom":
            return parseAtom(jsonRuleset);
        default:
            return parseOperator(jsonRuleset);
    }
}

function parseOperator(jsonRuleset: Record<string, any>): Operator {
    const parameters: Array<Term> = []
    for (const parameter of jsonRuleset["parameters"]) {
        parameters.push(parseTerm(parameter));
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

function parseAtom(jsonRuleset: Record<string, any>): Atom {
    return new Atom(jsonRuleset["path"]);
}

export {parseOperator, parseAtom, parseTerm}

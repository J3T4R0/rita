import {Parser} from "../../src";
// @ts-ignore
import {exampleData, ruleTemplate} from "../assets/exampleData";
import mathExample from "../assets/exampleMath.json"

it("equals", () => {
    const rule = Parser.parseRule({
        ...ruleTemplate,
        rule: {
            type: "comparison",
            operation: "equal",
            parameters: [
                4, 4
            ]
        }
    })
    expect(rule.evaluate({})).toBe(true);
});

it("name equals Julian", () => {
    const rule = Parser.parseRule({
        ...ruleTemplate,
        rule: {
            type: "comparison",
            operation: "equal",
            parameters: [
                "Julian", {
                    type: "atom",
                    path: "name"
                }
            ]
        }
    })
    expect(rule.evaluate(exampleData)).toBe(true);
});

it("birthday before 27.02.2002", () => {
    const rule = Parser.parseRule({
        ...ruleTemplate,
        rule: {
            type: "comparison",
            operation: "smaller",
            parameters: [
                {
                    type: "atom",
                    path: "dateOfBirth"
                },
                "2002-02-27"
            ]
        }
    })
    expect(rule.evaluate(exampleData)).toBe(true);
});

it("birthday before 27.02.2002, but other birthday", () => {
    const rule = Parser.parseRule({
        ...ruleTemplate,
        rule: {
            type: "comparison",
            operation: "smaller",
            parameters: [
                "2003-02-28",
                "2002-02-27"
            ]
        }
    })
    expect(rule.evaluate(exampleData)).toBe(false);
});

it('run math example', () => {
    const ruleset = Parser.parseRuleSet(mathExample);
    expect(ruleset.evaluateAll(exampleData).result).toBe(true);
});

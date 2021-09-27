import exampleRule from "../assets/example1.json"
// @ts-ignore
import {exampleData} from "../assets/exampleData"
import {Parser} from "../../src";
it("rule1 should be true", () => {
    expect(Parser.parseRuleSet(exampleRule)[0].evaluate(exampleData)).toBe(true)
});

it("rule2 should be false", () => {
    expect(Parser.parseRuleSet(exampleRule)[1].evaluate(exampleData)).toBe(false);
});

it('all combined should be false', () => {
    const results = Parser.parseRuleSet(exampleRule).evaluateAll(exampleData);
    expect(results.result).toBe(false);
});

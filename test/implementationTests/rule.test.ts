import exampleRule from "../assets/example1.json"
// @ts-ignore
import {exampleData} from "../assets/exampleData"
import {parseRuleSet} from "../../src";
it("Example should be true", () => {
    expect(parseRuleSet(exampleRule)[0].evaluate(exampleData)).toBe(true)
});

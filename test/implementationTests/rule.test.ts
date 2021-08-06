import exampleRule from "../assets/example1.json"
// @ts-ignore
import {exampleData} from "../assets/exampleData"
import {Parser} from "../../src";
it("Example should be true", () => {
    expect(Parser.parseRuleSet(exampleRule)[0].evaluate(exampleData)).toBe(true)
});

import {Parser} from "../../src";
// @ts-ignore
import {exampleData, ruleTemplate} from "../assets/exampleData"

it("isMember", () => {
    const rule = Parser.parseRule({
        ...ruleTemplate,
        rule: {
            type: "atom",
            path: "member"
        }
    });
    expect(rule.evaluate(exampleData)).toBe(true);
});
it("isNotEmployee", () => {
    const rule = Parser.parseRule({
        ...ruleTemplate,
        rule: {
            type: "atom",
            path: "employee"
        }
    });
    expect(rule.evaluate(exampleData)).toBe(false);
});
it("nestedAtom", () => {
    const rule = Parser.parseRule({
        ...ruleTemplate,
        rule: {
            type: "atom",
            path: "visit.paymentDetails.payed"
        }
    });
    expect(rule.evaluate(exampleData)).toBe(true);
});
it("second customer rated", () => {
    const rule = Parser.parseRule({
        ...ruleTemplate,
        rule: {
            type: "atom",
            path: "customers[1].rated"
        }
    });
    expect(rule.evaluate(exampleData)).toBe(true);
});

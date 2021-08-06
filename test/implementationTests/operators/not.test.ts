import {parseRule} from "../../../src";
// @ts-ignore
import {exampleData, ruleTemplate} from "../../assets/exampleData";


it("!member", () => {
    const rule = parseRule({
        ...ruleTemplate,
        rule: {
            type: "not",
            parameters: [
                {
                    type: "atom",
                    path: "member"
                }
            ]
        }

    })
    expect(rule.evaluate(exampleData)).toBe(false);
});
it("member  employee", () => {
    const rule = parseRule({
        ...ruleTemplate,
        rule: {
            type: "not",
            parameters: [
                {
                    type: "atom",
                    path: "member"
                },
                {
                    type: "atom",
                    path: "employee"
                }
            ]
        }

    })
    expect(() => rule.evaluate(exampleData)).toThrow();
});


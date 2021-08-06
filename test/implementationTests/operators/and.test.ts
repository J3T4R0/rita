import {Parser} from "../../../src";
// @ts-ignore
import {exampleData, ruleTemplate} from "../../assets/exampleData";

it("member", () => {
    const rule = Parser.parseRule({
        ...ruleTemplate,
        rule: {
            type: "and",
            parameters: [
                {
                    type: "atom",
                    path: "member"
                }
            ]
        }

    })
    expect(() => rule.evaluate(exampleData)).toThrow();
});
it("member && employee", () => {
    const rule = Parser.parseRule({
        ...ruleTemplate,
        rule: {
            type: "and",
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
    expect(rule.evaluate(exampleData)).toBe(false);
});
it("customers[0].rated && employee", () => {
    const rule = Parser.parseRule({
        ...ruleTemplate,
        rule: {
            type: "and",
            parameters: [
                {
                    type: "atom",
                    path: "customers[0].rated"
                },
                {
                    type: "atom",
                    path: "employee"
                }
            ]
        }

    })
    expect(rule.evaluate(exampleData)).toBe(false);
});
it("member && visit.paymentDetails.payed", () => {
    const rule = Parser.parseRule({
        ...ruleTemplate,
        rule: {
            type: "and",
            parameters: [
                {
                    type: "atom",
                    path: "member"
                },
                {
                    type: "atom",
                    path: "visit.paymentDetails.payed"
                }
            ]
        }

    })
    expect(rule.evaluate(exampleData)).toBe(true);
});
it("member && member && visit.paymentDetails.payed", () => {
    const rule = Parser.parseRule({
        ...ruleTemplate,
        rule: {
            type: "and",
            parameters: [
                {
                    type: "atom",
                    path: "member"
                },
                {
                    type: "atom",
                    path: "member"
                },
                {
                    type: "atom",
                    path: "visit.paymentDetails.payed"
                }
            ]
        }

    })
    expect(rule.evaluate(exampleData)).toBe(true);
});


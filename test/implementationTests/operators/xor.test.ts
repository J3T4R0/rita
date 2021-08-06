import {Parser} from "../../../src";
// @ts-ignore
import {exampleData, ruleTemplate} from "../../assets/exampleData";


it("member", () => {
    const rule = Parser.parseRule({
        ...ruleTemplate,
        rule: {
            type: "xor",
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
it("member xor employee", () => {
    const rule = Parser.parseRule({
        ...ruleTemplate,
        rule: {
            type: "xor",
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
    expect(rule.evaluate(exampleData)).toBe(true);
});
it("customers[0].rated xor employee", () => {
    const rule = Parser.parseRule({
        ...ruleTemplate,
        rule: {
            type: "xor",
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
it("member xor visit.paymentDetails.payed", () => {
    const rule = Parser.parseRule({
        ...ruleTemplate,
        rule: {
            type: "xor",
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
    expect(rule.evaluate(exampleData)).toBe(false);
});
it("member xor member xor visit.paymentDetails.payed", () => {
    const rule = Parser.parseRule({
        ...ruleTemplate,
        rule: {
            type: "xor",
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


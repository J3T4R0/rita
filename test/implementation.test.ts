import {parseRule} from "../src/Parser";

const exampleData = {
    member: true,
    employee: false,
    visit: {
        paymentDetails: {
            payed: true
        }
    },
    customers: [
        {
            rated: false
        },
        {
            rated: true
        }
    ]
}

const ruleTemplate = {
    id: 'testrule',
    rule: {}
}
describe("Test Atom", () => {
    it("isMember", () => {
        const rule = parseRule({
            ...ruleTemplate,
            rule: {
                type: "atom",
                path: "member"
            }
        });
        expect(rule.evaluate(exampleData)).toBe(true);
    });
    it("isNotEmployee", () => {
        const rule = parseRule({
            ...ruleTemplate,
            rule: {
                type: "atom",
                path: "employee"
            }
        });
        expect(rule.evaluate(exampleData)).toBe(false);
    });
    it("nestedAtom", () => {
        const rule = parseRule({
            ...ruleTemplate,
            rule: {
                type: "atom",
                path: "visit.paymentDetails.payed"
            }
        });
        expect(rule.evaluate(exampleData)).toBe(true);
    });
    it("second customer rated", () => {
        const rule = parseRule({
            ...ruleTemplate,
            rule: {
                type: "atom",
                path: "customers[1].rated"
            }
        });
        expect(rule.evaluate(exampleData)).toBe(true);
    });
});

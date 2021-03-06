import {Parser} from "../../src";
// @ts-ignore
import {exampleData, ruleTemplate} from "../assets/exampleData";
import {DateTime} from "luxon";

describe("Numbers", () => {
    it("add", () => {
        const calc = Parser.parseCalculation({
            type: "calculation",
            operation: "add",
            parameters: [2, 6]
        });

        expect(calc.evaluate({})).toBe(8);

    });
    it("subtract", () => {
        const calc = Parser.parseCalculation({
            type: "calculation",
            operation: "subtract",
            parameters: [2, 6]
        });

        expect(calc.evaluate({})).toBe(-4);
    });
    it("subtract with three arguments", () => {
        const calc = Parser.parseCalculation({
            type: "calculation",
            operation: "subtract",
            parameters: [6, 2, 2]
        });

        expect(calc.evaluate({})).toBe(2);
    });
    it("multiply", () => {
        const calc = Parser.parseCalculation({
            type: "calculation",
            operation: "multiply",
            parameters: [2, 6]
        });

        expect(calc.evaluate({})).toBe(12);
    });
    it("divide", () => {
        const calc = Parser.parseCalculation({
            type: "calculation",
            operation: "divide",
            parameters: [6, 2]
        });

        expect(calc.evaluate({})).toBe(3);
    });
    it("modulo", () => {
        const calc = Parser.parseCalculation({
            type: "calculation",
            operation: "modulo",
            parameters: [7, 2]
        });

        expect(calc.evaluate({})).toBe(1);
    });

    it("atom sub", () => {
        const calc = Parser.parseCalculation({
            type: "calculation",
            operation: "subtract",
            parameters: [{
                type: "atom",
                path: "visit.priceWithoutTax"
            }, 2]
        });

        expect(calc.evaluate(exampleData)).toBe(8.99);
    });
});

function formatDate(d: Date): string {
    return DateTime.fromJSDate(d).toFormat("yyyy-MM-dd");
}

describe("Dates", () => {
    it("days from 20.12.2020 to 24.12.2020", () => {
        const calc = Parser.parseCalculation({
            type: "calculation",
            operation: "subtract",
            dateResultUnit: "days",
            parameters: [
                "2020-12-24",
                "2020-12-20"
            ]
        });
        expect(calc.evaluate(exampleData)).toBe(4);
    });
    it("how many full years from date of birth to 12.11.2021", () => {
        const calc = Parser.parseCalculation({
            type: "calculation",
            operation: "subtract",
            dateResultUnit: "years",
            parameters: [
                "2021-11-12",
                {
                    type: "atom",
                    path: "dateOfBirth"
                }
            ]
        });
        expect(Math.floor(<number>calc.evaluate(exampleData))).toBe(21);
    });
    it("two days ago from 12.11.2021", () => {
        const calc = Parser.parseCalculation({
            type: "calculation",
            operation: "subtract",
            dateCalculationUnit: "days",
            parameters: [
                "2021-11-12",
                2
            ]
        });
        expect(formatDate(<Date>calc.evaluate(exampleData))).toEqual(formatDate(new Date("2021-11-10")));
    });
    it("two days ago from 12.11.2021 in different order", () => {
        const calc = Parser.parseCalculation({
            type: "calculation",
            operation: "subtract",
            dateCalculationUnit: "days",
            parameters: [
                2,
                "2021-11-12"
            ]
        });
        expect(formatDate(<Date>calc.evaluate(exampleData))).toEqual(formatDate(new Date("2021-11-10")));
    });
    it("can't divide dates", () => {
        const calc = Parser.parseCalculation({
            type: "calculation",
            operation: "divide",
            dateCalculationUnit: "days",
            parameters: [
                2,
                "2021-11-12"
            ]
        });
        expect(calc.evaluate).toThrow(Error);
    });
    it("2+2 days from 12.11.2021", () => {
        const calc = Parser.parseCalculation({
            type: "calculation",
            operation: "add",
            dateCalculationUnit: "days",
            parameters: [
                2,
                2,
                "2021-11-12"
            ]
        });
        expect(formatDate(<Date>calc.evaluate(exampleData))).toEqual(formatDate(new Date("2021-11-16")));
    });
    it("two years in the future from 12.11.2021", () => {
        const calc = Parser.parseCalculation({
            type: "calculation",
            operation: "add",
            dateCalculationUnit: "years",
            parameters: [
                "2021-11-12",
                2
            ]
        });
        expect(formatDate(<Date>calc.evaluate(exampleData))).toEqual(formatDate(new Date("2023-11-12")));
    });
    it("time difference less then 2 minutes", () => {
        const calc = Parser.parseCalculation({
            type: "calculation",
            operation: "subtract",
            dateResultUnit: "minutes",
            parameters: [
                "2021-11-12T09:29",
                "2021-11-12T09:27:30"
            ]
        });
        expect(calc.evaluate({})).toBeLessThan(2);
    });
});

import Ajv from 'ajv/dist/2019';
import addFormats from "ajv-formats"
import {Parser} from "../src";
import exampleRule from "./assets/example1.json"
import exampleMath from "./assets/exampleMath.json"
import wrongExampleRule from "./assets/example_wrong.json"

const schemas = [
    {name: 'Atom', schema: () => import('../src/schema/atom.json')},
    {name: 'Operator', schema: () => import('../src/schema/operator.json')},
    {name: 'Comparison', schema: () => import('../src/schema/comparison.json')},
    {name: 'Calculation', schema: () => import('../src/schema/calculation.json')},
    {name: 'Term', schema: () => import('../src/schema/term.json')},
    {name: 'Rule', schema: () => import('../src/schema/rule.json')},

    {name: 'Main', schema: () => import('../src/schema/schema.json')},
];

describe('Validate Schema against Meta-Schema', () => {
    const ajv = new Ajv();
    addFormats(ajv);

    for (const schema of schemas) {
        it(schema.name, () => {
            expect.assertions(1);
            schema.schema().then(res => expect(ajv.validateSchema(res)).toBe(true));
        });
    }
});

const parser = Parser.getParser();

describe("Validate Rule example", () => {
    it("Correct Rule", () => {
        const result = parser.validateRuleSetJSON(exampleRule);
        expect(result.valid).toBe(true);
    });

    it("Correct comparison and calculation", () => {
        const result = parser.validateRuleSetJSON(exampleMath);
        expect(result.valid).toBe(true);
    });

    it("Wrong Rule", () => {
        const result = parser.validateRuleSetJSON(wrongExampleRule);
        expect(result.valid).toBe(false);
        expect(result.errors).not.toHaveLength(0)
    });
});

it("convert to Json", () => {
    const ruleset = Parser.parseRuleSet(exampleRule);
    const json = Parser.toJson(ruleset);
    expect(JSON.parse(json)).toEqual(exampleRule);
});

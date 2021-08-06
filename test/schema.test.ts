import Ajv from 'ajv/dist/2019';
import {Parser} from "../src";
import exampleRule from "./assets/example1.json"

const schemas = [
    {name: 'Atom', schema: () => import('../src/schema/atom.json')},
    {name: 'Operator', schema: () => import('../src/schema/operator.json')},
    {name: 'Term', schema: () => import('../src/schema/term.json')},
    {name: 'Rule', schema: () => import('../src/schema/rule.json')},

    {name: 'Main', schema: () => import('../src/schema/schema.json')},
];

describe('Validate Schema against Meta-Schema', () => {
    const ajv = new Ajv();

    for (const schema of schemas) {
        it(schema.name, () => {
            expect.assertions(1);
            schema.schema().then(res => expect(ajv.validateSchema(res)).toBe(true));
        });
    }
});

const parser = new Parser();

describe("Validate Rule example", () => {
    const result = parser.validateRuleJSON(exampleRule);
    console.log(result)
});

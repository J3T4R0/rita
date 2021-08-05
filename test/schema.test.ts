import Ajv from 'ajv/dist/2019';

const schemas = [
    {name: 'Atom', schema: () => import('../schema/atom.json')},
    {name: 'Operator', schema: () => import('../schema/operator.json')},
    {name: 'Term', schema: () => import('../schema/term.json')},
    {name: 'Rule', schema: () => import('../schema/rule.json')},

    {name: 'Main', schema: () => import('../schema/schema.json')},
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

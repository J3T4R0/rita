# README

## Top-level Schemas

*   [Atom](./atom.md "Describes an atom") – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/atom.json`

*   [Calculation](./calculation.md "Calculates a result") – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/calculation.json`

*   [Comparison](./comparison.md "Compare strings, dates or numbers with each other") – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/comparison.json`

*   [Main](./schema.md "The entrypoint of the Rita schema") – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/schema.json`

*   [Operator](./operator.md) – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/operator.json`

*   [Rule](./rule.md) – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/rule.json`

*   [Term](./term.md) – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/term.json`

## Other Schemas

### Objects

*   [Non-Unary operator](./operator-oneof-non-unary-operator.md "Requires at least two parameters") – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/operator.json#/oneOf/0`

*   [Unary operator](./operator-oneof-unary-operator.md "Requires exactly on parameter") – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/operator.json#/oneOf/1`

### Arrays

*   [Multiple Parameters](./operator-oneof-non-unary-operator-properties-multiple-parameters.md) – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/operator.json#/oneOf/0/properties/parameters`

*   [Ruleset](./schema-properties-ruleset.md "Array of all rules in this ruleset") – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/schema.json#/properties/rules`

*   [Unary Parameters](./operator-oneof-unary-operator-properties-unary-parameters.md) – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/operator.json#/oneOf/1/properties/parameters`

*   [Untitled array in Calculation](./calculation-properties-parameters.md) – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/calculation.json#/properties/parameters`

*   [Untitled array in Comparison](./comparison-properties-parameters.md) – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/comparison.json#/properties/parameters`

## Version Note

The schemas linked above follow the JSON Schema Spec version: `https://json-schema.org/draft/2019-09/schema`

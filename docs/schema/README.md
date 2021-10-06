# README

## Top-level Schemas

*   [Atom](./atom.md "Describes an atom") – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/atom.json`

*   [Main](./schema.md "The entrypoint of the Rita schema") – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/schema.json`

*   [Operator](./operator.md) – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/operator.json`

*   [Rule](./rule.md) – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/rule.json`

*   [Term](./term.md) – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/term.json`

## Other Schemas

### Objects

*   [Non-Unary operator](./operator-oneof-non-unary-operator.md "Requires at least two parameters") – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/operator.json#/oneOf/0`

*   [Unary operator](./operator-oneof-unary-operator.md "Requires exactly on parameter") – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/operator.json#/oneOf/1`

### Arrays

*   [Parameters](./operator-oneof-non-unary-operator-properties-parameters.md) – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/operator.json#/oneOf/0/properties/parameters`

*   [Ruleset](./schema-properties-ruleset.md "Array of all rules in this ruleset") – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/schema.json#/properties/rules`

*   [Untitled array in Operator](./operator-oneof-unary-operator-properties-parameters.md) – `https://raw.githubusercontent.com/educorvi/rita/main/src/schema/operator.json#/oneOf/1/properties/parameters`

## Version Note

The schemas linked above follow the JSON Schema Spec version: `https://json-schema.org/draft/2019-09/schema`

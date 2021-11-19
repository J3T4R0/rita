[![CI](https://github.com/educorvi/rita/actions/workflows/main.yml/badge.svg)](https://github.com/educorvi/rita/actions/workflows/main.yml)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
# Rule It All _(Rita)_
JSON Schema for rule-based evaluation and an Typescript Implementation to evaluate it
## Schema
The Schema is available in the schema-folder and has the id `https://raw.githubusercontent.com/educorvi/rita/main/schema/schema.json`
## Implementation
Data can be evaluated against rules. Example:
```typescript
/** Rules */
import exampleRule from "../assets/example1.json"
/** Data */
import {exampleData} from "../assets/exampleData"

/** The Parser class is used to parse a JSON Ruleset and use it for evaluation */
import {Parser} from "@educorvi/rita";

/** Parse ruleset */
const ruleSet: Array<Rule> = Parser.parseRuleSet(exampleRule);

/** Check wether data fulfilles the first rule in the ruleSet */
const result: boolean = ruleSet[0].evaluate(exampleData);
```
## Documentation
The documentation of the schema and the implementation can be found here: [https://educorvi.github.io/rita](https://educorvi.github.io/rita)

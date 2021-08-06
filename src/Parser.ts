import {Term, Operator, Atom, Rule, And, Not, Or, Xor} from "./elements"
import Ajv from 'ajv/dist/2019';
import schemas from "./schema"
import {AnyValidateFunction} from "ajv/dist/types";

/**
 * Results for validateRuleJSON
 */
interface validationResult {
    valid: boolean,
    errors: any
}

/**
 * Class for all actions related to parsing
 * Constructed as Singleton
 */
export default class Parser {
    private readonly validate: AnyValidateFunction<unknown> | undefined;
    private static parser: Parser | null = null;

    private constructor(validate: AnyValidateFunction<unknown> | undefined) {
        this.validate = validate;
    }

    /**
     * Call this Method to receive a parser
     */
    public static getParser(): Parser {
        if (!Parser.parser) {
            const validate = new Ajv({schemas: schemas}).getSchema("https://raw.githubusercontent.com/educorvi/rita/main/src/schema/schema.json");
            Parser.parser = new Parser(validate)
        }
        return Parser.parser;
    }

    public validateRuleJSON(json: Record<string, any>): validationResult {
        if (!this.validate) {
            throw new Error("Error compiling schema");
        }
        let valid = this.validate(json);
        if (typeof valid !== "boolean") {
            throw new Error("Error compiling schema")
        }
        return {
            valid,
            errors: this.validate.errors
        };
    }

    public static parseRuleSet(jsonRuleset: Record<string, any>): Array<Rule> {
        return jsonRuleset.rules.map((item: Record<string, any>) => Parser.parseRule(item))
    }

    public static parseRule(jsonRuleset: Record<string, any>): Rule {
        return new Rule(jsonRuleset["id"], Parser.parseTerm(jsonRuleset["rule"]));
    }

    public static parseTerm(jsonRuleset: Record<string, any>): Term {
        switch (jsonRuleset["type"]) {
            case "atom":
                return Parser.parseAtom(jsonRuleset);
            default:
                return Parser.parseOperator(jsonRuleset);
        }
    }

    public static parseOperator(jsonRuleset: Record<string, any>): Operator {
        const parameters: Array<Term> = []
        for (const parameter of jsonRuleset["parameters"]) {
            parameters.push(Parser.parseTerm(parameter));
        }
        switch (jsonRuleset["type"]) {
            case "not":
                return new Not(parameters)
            case "and":
                return new And(parameters)
            case "or":
                return new Or(parameters)
            case "xor":
                return new Xor(parameters)
            default:
                throw new Error("Invalid type: " + jsonRuleset["type"]);
        }
    }

    public static parseAtom(jsonRuleset: Record<string, any>): Atom {
        return new Atom(jsonRuleset["path"]);
    }

    public static toJson(rules: Array<Rule>): string {
        return JSON.stringify({
            "$schema": "https://raw.githubusercontent.com/educorvi/rita/main/schema/schema.json",
            rules: rules.map(rule => rule.toJsonReady())
        })
    }
};


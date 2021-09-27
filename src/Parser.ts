import {Term, Operator, Atom, Rule, And, Not, Or, Xor} from "./logicElements"
import Ajv from 'ajv/dist/2019';
import schemas from "./schema"
import {schema} from "./schema"
import {AnyValidateFunction} from "ajv/dist/types";
import addFormats from "ajv-formats";

/**
 * Results for validateRuleJSON
 */
interface validationResult {
    /**
     * Indicates, if the rule is valid
     */
    valid: boolean,
    /**
     * Array of errors
     */
    errors: Array<any>
}

/**
 * Class for all actions related to parsing
 * Constructed as Singleton
 */
export default class Parser {
    /**
     * The validate function used to validate RITA Json
     * @private
     */
    private readonly validate: AnyValidateFunction<unknown> | undefined;
    /**
     * The single parser instance
     * @private
     */
    private static parser: Parser | null = null;

    private constructor(validate: AnyValidateFunction<unknown> | undefined) {
        this.validate = validate;
    }

    /**
     * Call this method to receive a parser
     */
    public static getParser(): Parser {
        if (!Parser.parser) {
            const ajv = new Ajv({schemas: schemas});
            addFormats(ajv);
            const validate = ajv.getSchema("https://raw.githubusercontent.com/educorvi/rita/main/src/schema/schema.json");
            Parser.parser = new Parser(validate)
        }
        return Parser.parser;
    }

    /**
     * Check if a given RITA Ruleset is valid
     * @param json the ruleset
     */
    public validateRuleSetJSON(json: Record<string, any>): validationResult {
        if (!this.validate) {
            throw new Error("Error compiling schema");
        }
        let valid = this.validate(json);
        if (typeof valid !== "boolean") {
            throw new Error("Error compiling schema")
        }
        return {
            valid,
            errors: this.validate.errors || []
        };
    }

    /**
     * Create a Array of Rule objects from a json ruleset
     * @param jsonRuleset the ruleset
     */
    public static parseRuleSet(jsonRuleset: Record<string, any>): Array<Rule> {
        return jsonRuleset.rules.map((item: Record<string, any>) => Parser.parseRule(item))
    }

    /**
     * Create Rule from json
     * @param jsonRuleset the rule
     */
    public static parseRule(jsonRuleset: Record<string, any>): Rule {
        return new Rule(jsonRuleset["id"], Parser.parseTerm(jsonRuleset["rule"]));
    }

    /**
     * Create Rule from json
     * @param jsonRuleset the term
     */
    public static parseTerm(jsonRuleset: Record<string, any>): Term {
        switch (jsonRuleset["type"]) {
            case "atom":
                return Parser.parseAtom(jsonRuleset);
            default:
                return Parser.parseOperator(jsonRuleset);
        }
    }

    /**
     * Create Operator from json
     * @param jsonRuleset the operator
     */
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

    /**
     * Create Atom from json
     * @param jsonRuleset the atom
     */
    public static parseAtom(jsonRuleset: Record<string, any>): Atom {
        return new Atom(jsonRuleset["path"]);
    }

    /**
     * Turn an array of rule objects back into a json ruleset
     * @param rules the array of rules
     */
    public static toJson(rules: Array<Rule>): string {
        return JSON.stringify({
            "$schema": schema["$id"],
            rules: rules.map(rule => rule.toJsonReady())
        })
    }
};


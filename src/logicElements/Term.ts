export abstract class Term {
    /**
     * Evaluates the term with the given data
     * @param data The data that's used for evaluation
     */
    abstract evaluate(data: Record<string, any>): boolean | Date | number | String;

    /**
     * Check if the term is valid
     */
    abstract validate(): boolean;

    /**
     * Prepares object for conversion into rita json
     * @internal
     */
    abstract toJsonReady(): Record<string, any>;
}

export abstract class Term {
    /**
     * Evaluates the term with the given data
     * @param data The data that's used for evaluation
     */
    abstract evaluate(data: Record<string, any>): boolean;

    /**
     * Check if the term is valid
     */
    abstract validate(): boolean;

    /**
     * Prepares object for conversion into rita json
     */
    abstract toJsonReady(): Record<string, any>;
}

export class UnimplementedError extends Error {
    constructor(message?: string) {
        super(message || "This function is not implemented");
    }
}

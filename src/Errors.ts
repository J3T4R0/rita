export class UsageError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class UnimplementedError extends UsageError {
    constructor(message?: string) {
        super(message || "This function is not implemented");
    }
}

export class UndefinedPathError extends UsageError{
    constructor(message: string) {
        super(message);
    }
}

export class RulesetError extends UsageError {
    constructor(message: string) {
        super(message);
    }
}

export class InternalError extends Error {
    constructor(message: string) {
        super(message);
    }
}


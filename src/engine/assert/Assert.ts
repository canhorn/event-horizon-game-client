export const assert = (condition: any, message?: string, code?: string) => {
    if (!condition) {
        message = message || "Assertion failed";
        throw new ErrorCode(message, code); // Fallback
    }
};

export class ErrorCode extends Error {
    constructor(message: string, public code?: string) {
        super(message);
    }
}

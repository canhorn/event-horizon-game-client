export const assert = (
    condition: any,
    message?: string,
    code?: string
): void => {
    if (!condition) {
        throw new ErrorCode(message || "Assertion failed", code);
    }
};

export class ErrorCode extends Error {
    constructor(message: string, public code?: string) {
        super(message);
    }
}

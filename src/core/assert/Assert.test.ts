import { assert, ErrorCode } from "./Assert";

it("should not throw error on a condition of true", () => {
    // Given

    // When
    assert(true);

    // Then
    // Nothing should happen
});

it("should throw ErrorCode Error on a condition of false", () => {
    // Given
    const assertTest = () => {
        // When
        assert(false);
    };

    // Then
    expect(assertTest).toThrow(new ErrorCode("Assertion failed"));
});

it("should throw ErrorCode Error with passed in message on a condition of false", () => {
    // Given
    const expected = new ErrorCode("error message");
    const assertTest = () => {
        // When
        assert(false, "error message");
    };

    // Then
    expect(assertTest).toThrow(expected);
});

it("should throw ErrorCode Error with passed in message and code on a condition of false", () => {
    // Given
    const expected = new ErrorCode("error message", "error_code");
    try {
        // When
        assert(false, "error message", "error_code");
    } catch (ex) {
        // Then
        expect(ex.message).toBe(expected.message);
        expect(ex.code).toBe(expected.code);
    }
});

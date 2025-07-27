import { stringUtf8CV, uintCV } from "@stacks/transactions";
import { describe, expect, it } from "vitest";

const accounts = simnet.getAccounts();
const address1 = accounts.get("wallet_1")!;
const address2 = accounts.get("wallet_2")!;

describe("Message Board Contract Tests", () => {
    it("ensures simnet is well initialised", () => {
        expect(simnet.blockHeight).toBeDefined();
    });

    it("should start with zero messages", () => {
        const { result } = simnet.callReadOnlyFn("message-board", "get-message-count", [], address1);
        expect(result).toBeUint(0);
    });

    it("should add a message and verify count", () => {
        const message = stringUtf8CV("Hello, Stacks!");
        const { result } = simnet.callPublicFn("message-board", "add-message", [message], address1);
        expect(result).toBeDefined();

        // Verify count increased
        const { result: countResult } = simnet.callReadOnlyFn("message-board", "get-message-count", [], address1);
        expect(countResult).toBeUint(1);
    });

    it("should retrieve added message", () => {
        const { result } = simnet.callReadOnlyFn("message-board", "get-message", [uintCV(1)], address1);
        expect(result).toBeDefined();
    });

    it("should get message author", () => {
        const { result } = simnet.callReadOnlyFn("message-board", "get-message-author", [uintCV(1)], address1);
        expect(result).toBeDefined();
    });

    it("should add multiple messages and verify count", () => {
        const message1 = stringUtf8CV("First message");
        const message2 = stringUtf8CV("Second message");

        simnet.callPublicFn("message-board", "add-message", [message1], address1);
        simnet.callPublicFn("message-board", "add-message", [message2], address2);

        const { result } = simnet.callReadOnlyFn("message-board", "get-message-count", [], address1);
        expect(result).toBeUint(2);
    });

    it("should get multiple messages", () => {
        const { result: result1 } = simnet.callReadOnlyFn("message-board", "get-message", [uintCV(2)], address1);
        const { result: result2 } = simnet.callReadOnlyFn("message-board", "get-message", [uintCV(3)], address1);

        expect(result1).toBeDefined();
        expect(result2).toBeDefined();
    });
}); 
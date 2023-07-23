import { hashToToken, validateAdminToken } from "../src/tokens";
import bcrypt from "bcryptjs";

function hashPassword(plaintext: string): string {
    return bcrypt.hashSync(plaintext, 10);
}

describe("georgejmx successfully manages tokens", () => {
    test("Adding and validating a token from the admin password", () => {
        if (!process.env.ADMIN_PASSWORD) {
            throw Error("Unable to retrieve testing environment variable");
        }
        const hashedPassword = hashPassword(process.env.ADMIN_PASSWORD);
        const accessToken = hashToToken(hashedPassword);
        const isValid = validateAdminToken(accessToken);
        expect(isValid).toEqual(true);
    });

    test("Adding then failing admin validation of a random hash", () => {
        const accessToken = hashToToken(
            "232dfb7203bfba2b34252186dfa953fbfa0e58487254f53b4fcffc729RANDOM"
        );
        const isValid = validateAdminToken(accessToken);
        expect(isValid).toEqual(false);
    });

    test("Validating non existant token", () => {
        const isValid = validateAdminToken("ZZZ");
        expect(isValid).toEqual(false);
    });
});

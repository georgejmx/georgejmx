import { hashToToken, validateAdminToken } from "../src/tokens";

describe("georgejmx successfully manages tokens", () => {
    test("Adding and validating a token from the admin hash", () => {
        if (!process.env.ADMIN_HASH) {
            throw Error("Unable to retrieve testing environment variable");
        }

        const accessToken = hashToToken(process.env.ADMIN_HASH);
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

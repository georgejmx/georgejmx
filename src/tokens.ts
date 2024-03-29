import { TokenMap } from "./types.js";
import { v4 as uuid4 } from "uuid";
import { generateTokenExpiry } from "./utils.js";
import bcrypt from "bcryptjs";

const TOKEN_MAP: TokenMap = {};

// Adds a new token to the cache if correct password
const hashToToken = (hash: string): string => {
    let token = uuid4();
    while (Object.keys(TOKEN_MAP).includes(token)) {
        token = uuid4();
    }

    const admin = bcrypt.compareSync(process.env.ADMIN_PASSWORD as string, hash);
    TOKEN_MAP[token] = {
        expiry: generateTokenExpiry(),
        admin,
    };
    return token;
};

// Checks that the provided token is admin and active
const validateAdminToken = (bearerToken: string): boolean => {
    if (!(bearerToken in TOKEN_MAP)) {
        return false;
    }
    const token = TOKEN_MAP[bearerToken];
    const currentTimestamp = new Date().getTime();
    if (token.admin && currentTimestamp < token.expiry) {
        return true;
    }
    return false;
};

export { hashToToken, validateAdminToken };

import { hashToToken } from "../tokens.js";
import { ExpressRequest, ExpressResponse } from "../types.js";

// Obtaining access cookie
export const postAuthenticationController = async (
    req: ExpressRequest,
    res: ExpressResponse
): Promise<void> => {
    try {
        const hash = req.body.hash;
        if (!hash) {
            res.status(400).json({ message: "Missing hash to authenticate" });
            return;
        }
        console.log(req.body.salt); // TODO: add salt to TOKEN_MAP

        const token = hashToToken(hash);
        res.status(201).json({ accessToken: token });
    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: "Unknown error" });
    }
};

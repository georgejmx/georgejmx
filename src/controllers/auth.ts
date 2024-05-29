import type { Request, Response } from "express";
import { hashToToken } from "../tokens.js";

// Obtaining access cookie
export const postAuthenticationController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const hash = req.body.hash;
        if (!hash) {
            res.status(400).json({ message: "Missing hash to authenticate" });
            return;
        }
        const token = hashToToken(hash);
        res.status(201).json({ accessToken: token });
    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: "Unknown error" });
    }
};

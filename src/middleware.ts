import { NextFunction, type Request, type Response } from "express";
import { validateAdminToken } from "./tokens.js";
import rateLimit from "express-rate-limit";
import { REFRESH_TIME } from "./utils.js";

const limiter = rateLimit({
    windowMs: REFRESH_TIME,
    max: 25,
    standardHeaders: true,
    legacyHeaders: false,
});

const validateTokenMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const tokenField = req.headers.authorisation as string;
    try {
        if (!tokenField) {
            res.status(401).json({ message: "No admin token present in request" });
            return;
        } else if (!validateAdminToken(tokenField.slice(7))) {
            res.status(401).json({ message: "Invalid admin token in request" });
            return;
        }
        next();
    } catch (error: unknown) {
        res.status(500).json({ message: "API middleware error" });
    }
};

const notFoundMiddleware = (_: unknown, res: Response, next: NextFunction): void => {
    res.status(404).json({ message: "Resource not found" });
    next();
};

export { limiter, validateTokenMiddleware, notFoundMiddleware };

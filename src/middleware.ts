import { NextFunction } from "express";
import { validateAdminToken } from "./tokens";
import { ExpressRequest, ExpressResponse } from "./types";

const validateTokenMiddleware = (
    req: ExpressRequest,
    res: ExpressResponse,
    next: NextFunction
): void => {
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

const notFoundMiddleware = (_: unknown, res: ExpressResponse, next: NextFunction): void => {
    res.status(404).json({ message: "Resource not found" });
    next();
};

export { validateTokenMiddleware, notFoundMiddleware };

import express, { Router } from "express";
import {
    postDescriptorController,
    getFascinationsController,
    getStoryByKeyController,
} from "./controllers/api.js";
import { postDataController } from "./controllers/priviliged.js";
import { postAuthenticationController } from "./controllers/auth.js";
import { validateTokenMiddleware } from "./middleware.js";

export const apiRouter: Router = express.Router();
export const authRouter: Router = express.Router();
export const priviligedRouter: Router = express.Router();

apiRouter.post("/descriptor", postDescriptorController);
apiRouter.get("/fascinations", getFascinationsController);
apiRouter.get("/stories/:key", getStoryByKeyController);

authRouter.post("/token", postAuthenticationController);

priviligedRouter.use(validateTokenMiddleware);
priviligedRouter.post("/", postDataController);

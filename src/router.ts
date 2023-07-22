import express, { Router } from "express";
import {
    getStoryHtmlByKeyController,
    getStoriesHtmlController,
    getProjectsHtmlController,
} from "./controllers/html.js";
import {
    postDescriptorController,
    getFascinationsController,
    getArtistsController,
    getStoryByKeyController,
} from "./controllers/api.js";
import { postDataController } from "./controllers/priviliged.js";
import { postAuthenticationController } from "./controllers/auth.js";
import { validateTokenMiddleware } from "./middleware.js";

export const htmlRouter: Router = express.Router();
export const apiRouter: Router = express.Router();
export const authRouter: Router = express.Router();
export const priviligedRouter: Router = express.Router();

htmlRouter.get("/story/:key", getStoryHtmlByKeyController);
htmlRouter.get("/stories", getStoriesHtmlController);
htmlRouter.get("/projects", getProjectsHtmlController);
apiRouter.post("/descriptor", postDescriptorController);
apiRouter.get("/fascinations", getFascinationsController);
apiRouter.get("/artists", getArtistsController);
apiRouter.get("/stories/:key", getStoryByKeyController);

authRouter.post("/token", postAuthenticationController);

priviligedRouter.use(validateTokenMiddleware);
priviligedRouter.post("/", postDataController);

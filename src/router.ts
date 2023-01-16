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
import { postDataController } from "./controllers/admin.js";

export const htmlRouter: Router = express.Router();
export const apiRouter: Router = express.Router();
export const adminRouter: Router = express.Router();

// Attaching all route endpoints
htmlRouter.get("/story/:key", getStoryHtmlByKeyController);
htmlRouter.get("/stories", getStoriesHtmlController);
htmlRouter.get("/projects", getProjectsHtmlController);
apiRouter.post("/descriptor", postDescriptorController);
apiRouter.get("/fascinations", getFascinationsController);
apiRouter.get("/artists", getArtistsController);
apiRouter.get("/stories/:key", getStoryByKeyController);
adminRouter.post("/", postDataController);

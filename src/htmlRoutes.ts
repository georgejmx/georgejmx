import express, { Request, Response, Router } from "express";
import { readFileSync } from "fs";
import * as h from "./helper.js";
import * as t from "./types";
import * as db from "./dbConnector";

const NUMBER_DESCRIPTORS: number = 10;
export const htmlRouter: Router = express.Router();

/* Renders an entire html page for a specific story */
htmlRouter.get("/story/:key", (req: Request, res: Response) => {
  const keyword = req.params.key;
  const stories: t.Story[] = db.selectStories();
  const story: t.Story = stories.filter((story) => story.keyword == keyword)[0];
  res.render("story", {
    story,
    descriptors: h.generateDescriptors(NUMBER_DESCRIPTORS),
    script: readFileSync("./libs/story.js", "utf-8").toString(),
  });
});

/* Renders a chunk of html that shows a list of all story tiles */
htmlRouter.get("/stories", (req: Request, res: Response) => {
  const stories: t.Story[] = JSON.parse(JSON.stringify(db.selectStories()));
  res.render("stories", { stories: h.formatStories(stories, true) });
});

// Renders a chunk of html that shows a list of all project tiles
htmlRouter.get("/projects", (req: Request, res: Response) => {
  const projects: t.Project[] = db.selectProjects();
  res.render("projects", { projects });
});

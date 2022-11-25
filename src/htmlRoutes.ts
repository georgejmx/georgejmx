import express, { Request, Response, Router } from "express";
import { readFileSync } from "fs";
import * as h from "./helper.js";
import * as t from "./types";
import * as db from "./dbConnector";

const NUMBER_DESCRIPTORS: number = 10;
export const htmlRouter: Router = express.Router();

/* Renders an entire html page for a specific story */
htmlRouter.get("/story/:key", async (req: Request, res: Response) => {
  const keyword = req.params.key;

  try {
    const story = await db.selectStory(keyword);
    res.render("story", {
      story,
      descriptors: h.generateDescriptors(NUMBER_DESCRIPTORS),
      script: readFileSync("./libs/story.js", "utf-8").toString(),
    });
  } catch (e) {
    console.error(e);
    res.status(400).send("Database failure");
  }
});

/* Renders a chunk of html that shows a list of all story tiles */
htmlRouter.get("/stories", async (req: Request, res: Response) => {
  try {
    const rawStories = await db.selectStories();
    const stories: t.Story[] = JSON.parse(JSON.stringify(rawStories));
    res.render("stories", { stories: h.formatStories(stories, true) });
  } catch (e) {
    console.error(e);
    res.status(400).send("Database failure");
  }
});

// Renders a chunk of html that shows a list of all project tiles
htmlRouter.get("/projects", async (req: Request, res: Response) => {
  try {
    const projects = await db.selectProjects();
    projects.forEach((project) => {
      (project.imagename = project.imagename.trim()),
        (project.url = project.url.trim());
    });
    res.render("projects", { projects });
  } catch (e) {
    console.error(e);
    res.status(400).send("Database failure");
  }
});

import express, { Application, Request, Response } from "express";
import path from "path";
import fs from "fs";
import https, { Server } from "https";
import { fileURLToPath } from "url";
import * as t from "./types";
import { router } from "./routes.js";
import * as h from "./helper.js";
import sData from "./data/stories.json" assert { type: "json" };
import pData from "./data/projects.json" assert { type: "json" };

const app: Application = express();
const httpsOptions = {
  cert: fs.readFileSync("./cert/live/georgejmx.dev/fullchain.pem"),
  key: fs.readFileSync("./cert/live/georgejmx.dev/privkey.pem"),
};

// Serving frontent files and loading templating engine, routes
const __filename: string = fileURLToPath(import.meta.url);
app.set("view engine", "hbs");
app.use(
  express.static(path.join(path.dirname(__filename), "./../frontend/dist"))
);
app.use("/api", router);

/* Renders an entire html page for a specific story */
app.get("/story/:key", (req: Request, res: Response) => {
  const keyword = req.params.key;
  const stories: t.Story[] = sData.stories;
  const story: t.Story = stories.filter((story) => story.keyword == keyword)[0];
  res.render("story", { story });
});

/* Renders a chunk of html that shows a list of all story tiles */
app.get("/stories", (req: Request, res: Response) => {
  const stories: t.Story[] = JSON.parse(JSON.stringify(sData.stories));
  res.render("stories", { stories: h.formatStories(stories, true) });
});

// Renders a chunk of html that shows a list of all project tiles
app.get("/projects", (req: Request, res: Response) => {
  const projects: t.Project[] = pData.projects;
  res.render("projects", { projects });
});

const server: Server = new https.Server(httpsOptions, app);
server.listen(3000, () => {
  console.log("secure server is up on port 3000");
});

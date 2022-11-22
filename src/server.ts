import express, { Application, Request, Response } from "express";
import path from "path";
import fs from "fs";
import https, { Server as httpsServer } from "https";
import http, { Server as httpServer } from "http";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import * as t from "./types";
import { router } from "./routes.js";
import * as h from "./helper.js";
import { readFileSync } from "fs";
import sData from "./data/stories.json" assert { type: "json" };
import pData from "./data/projects.json" assert { type: "json" };

const NUMBER_DESCRIPTORS: number = 10;
const app: Application = express();

// Serving frontent files and loading templating engine, routes
const __filename: string = fileURLToPath(import.meta.url);
app.set("view engine", "hbs");
app.use(bodyParser.json());
app.use(
  express.static(path.join(path.dirname(__filename), "./../frontend/dist"))
);

app.use("/api", router);

/* Renders an entire html page for a specific story */
app.get("/story/:key", (req: Request, res: Response) => {
  const keyword = req.params.key;
  const stories: t.Story[] = sData.stories;
  const story: t.Story = stories.filter((story) => story.keyword == keyword)[0];
  res.render("story", {
    story,
    descriptors: h.generateDescriptors(NUMBER_DESCRIPTORS),
    script: readFileSync("./libs/story.js", "utf-8").toString(),
  });
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

// Launching the desired web service from node runtime
const serverType: string = process.argv[2];
if (serverType === "http") {
  const server: httpServer = new http.Server(app);
  server.listen(3000, () => {
    console.log("http server is up on port 3000");
  });
} else if (serverType === "https") {
  const server: httpServer = new https.Server(
    {
      cert: fs.readFileSync("./cert/live/georgejmx.dev/fullchain.pem"),
      key: fs.readFileSync("./cert/live/georgejmx.dev/privkey.pem"),
    },
    app
  );
  server.listen(3000, () => {
    console.log("https server is up on port 3000");
  });
} else {
  console.log("invalid command line argument passed to runtime");
  process.abort();
}

import express, { Application, Request, Response } from "express";
import path from "path";
import http, { Server } from "http";
import { fileURLToPath } from "url";
import * as t from "./types";
import * as h from "./helper.js";
import fData from "./data/fascinations.json" assert { type: "json" };
import aData from "./data/artists.json" assert { type: "json" };
import sData from "./data/stories.json" assert { type: "json" };
import tData from "./data/stories.json" assert { type: "json" };

const app: Application = express();

// Serving frontent files and loading templating engine
const __filename: string = fileURLToPath(import.meta.url);
app.set("view engine", "hbs");
app.use(
  express.static(path.join(path.dirname(__filename), "./../frontend/dist"))
);

// Renders an entire html page for a specific story
app.get("/story/:key", (req: Request, res: Response) => {
  const keyword = req.params.key;
  const stories: t.Story[] = tData.stories;
  const story: t.Story = stories.filter((story) => story.keyword == keyword)[0];
  res.render("story", { story: story });
});

// Renders a chunk of html that shows a list of all story tiles
app.get("/stories", (req: Request, res: Response) => {
  const stories: t.Story[] = JSON.parse(JSON.stringify(sData.stories));
  res.render("stories", { stories: h.formatStories(stories, true) });
});

// Getting fascinations JSON
app.get("/api/fascinations", (req: Request, res: Response) => {
  const fsc: t.Fascination[] = fData.fascinations;
  res.send(h.formatFascinations(fsc));
});

// Getting top artists JSON
app.get("/api/artists", (req: Request, res: Response) => {
  const artists: t.Artist[] = aData.artists;
  res.send(artists);
});

// Getting a specific story by keyword as JSON
app.get("/api/stories/:key", (req: Request, res: Response) => {
  const keyword = req.params.key;
  const stories: t.Story[] = sData.stories;
  res.send(stories.filter((story) => story.keyword == keyword));
});

const server: Server = new http.Server(app);
server.listen(3000, () => {
  console.log("server is up on local port 3000");
});

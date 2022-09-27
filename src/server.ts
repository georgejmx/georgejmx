import express, { Application, Request, Response } from "express";
import path from "path";
import http, { Server } from "http";
import { fileURLToPath } from "url";
import * as t from "./types";
import * as h from "./helper.js";
import fData from "./data/fascinations.json" assert { type: "json" };
import aData from "./data/artists.json" assert { type: "json" };
import sData from "./data/stories.json" assert { type: "json" };

const app: Application = express();

// Serving frontent files and loading templating engine
const __filename: string = fileURLToPath(import.meta.url);
app.set("view engine", "hbs");
app.use(
  express.static(path.join(path.dirname(__filename), "./../frontend/dist"))
);

app.get("/story/:key", (req: Request, res: Response) => {
  const keyword = req.params.key;
  const stories: t.Story[] = sData.stories;
  const story: t.Story = stories.filter((story) => story.keyword == keyword)[0];

  res.render("story", { story: story });
});

// Getting fascinations
app.get("/fascinations", (req: Request, res: Response) => {
  const fsc: t.Fascination[] = fData.fascinations;
  res.send(h.formatFascinations(fsc));
});

// Getting top artists
app.get("/artists", (req: Request, res: Response) => {
  const artists: t.Artist[] = aData.artists;
  res.send(artists);
});

// Getting all stories
app.get("/stories", (req: Request, res: Response) => {
  const stories: t.Story[] = sData.stories;
  res.send(h.formatStories(stories));
});

// Getting a specific story by keyword
app.get("/stories/:key", (req: Request, res: Response) => {
  const keyword = req.params.key;
  const stories: t.Story[] = sData.stories;
  res.send(stories.filter((story) => story.keyword == keyword));
});

const server: Server = new http.Server(app);
server.listen(3000, () => {
  console.log("server is up on local port 3000");
});

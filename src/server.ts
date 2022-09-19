import express, { Application, Request, Response } from "express";
import path from "path";
import http, { Server } from "http";
import { fileURLToPath } from "url";
import * as t from "./types";
import * as h from "./helper.js";
import fData from "./data/fascinations.json" assert { type: "json" };
import aData from "./data/artists.json" assert { type: "json" };

const app: Application = express();

// Serving frontent files
const __filename: string = fileURLToPath(import.meta.url);
app.use(
  express.static(path.join(path.dirname(__filename), "./../frontend/dist"))
);

// Getting fascinations
app.get("/fascinations", (req: Request, res: Response) => {
  const fsc: t.Fascination[] = fData.fascinations;
  res.send(h.rankFascinations(fsc));
});

// Getting top artists
app.get("/artists", (req: Request, res: Response) => {
  const art: t.Artist[] = aData.artists;
  res.send(art);
});

const server: Server = new http.Server(app);
server.listen(3000, () => {
  console.log("server is up on local port 3000");
});

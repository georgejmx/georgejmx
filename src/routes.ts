import express, { Request, Response, Router } from "express";
import * as h from "./helper";
import * as t from "./types";
import fData from "./data/fascinations.json" assert { type: "json" };
import aData from "./data/artists.json" assert { type: "json" };
import sData from "./data/stories.json" assert { type: "json" };

export const router: Router = express.Router();

// Getting fascinations JSON
router.get("/fascinations", (req: Request, res: Response) => {
  const fsc: t.Fascination[] = fData.fascinations;
  res.send(h.formatFascinations(fsc));
});

// Getting top artists JSON
router.get("/artists", (req: Request, res: Response) => {
  const artists: t.Artist[] = aData.artists;
  res.send(artists);
});

/* Getting a specific story by keyword as JSON. If the keyword is 'recents',
 * then simply return the most recent 3 keywords */
router.get("/stories/:key", (req: Request, res: Response) => {
  const keyword: string = req.params.key;
  const stories: t.Story[] = sData.stories;

  // Dealing with when only want the 3 most recent keywords
  if (keyword === "recents") {
    const recentStories: t.Story[] = h.formatStories(stories, false);
    let recents: string[] = [];
    for (let r of recentStories) recents.push(r.keyword);
    res.send({ recents });
    return;
  }

  res.send(stories.filter((story) => story.keyword == keyword));
});

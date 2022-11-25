import express, { Request, Response, Router } from "express";
import * as h from "./helper.js";
import * as t from "./types";
import * as db from "./dbConnector";

export const apiRouter: Router = express.Router();

// Posting descriptor JSON
apiRouter.post("/descriptor", (req: Request, res: Response) => {
  let newDescriptor: t.Descriptor;
  try {
    newDescriptor = {
      keyword: req.body.key,
      word: req.body.descriptor,
    };
  } catch (err) {
    console.error(err);
    res.status(400).send();
    return;
  }

  let result = !db.insertDescriptor(newDescriptor);
  if (!result) {
    res.status(400).send();
    return;
  }

  res.status(201).send();
});

// Getting fascinations JSON
apiRouter.get("/fascinations", (req: Request, res: Response) => {
  res.send(h.formatFascinations(db.selectFascinations()));
});

// Getting top artists JSON
apiRouter.get("/artists", async (req: Request, res: Response) => {
  try {
    const artists = await db.selectArtists();
    res.status(200).send(artists);
  } catch (e) {
    console.error(e);
    res.status(400).send("Database failure");
  }
});

/* Getting a specific story by keyword as JSON. If the keyword is 'recents',
 * then simply return the most recent 3 keywords */
apiRouter.get("/stories/:key", async (req: Request, res: Response) => {
  const keyword: string = req.params.key;

  // Dealing with when only want the 3 most recent keywords
  // TODO: Write a proper query for this to eliminate all that silly helper
  // logic
  if (keyword === "recents") {
    try {
      const stories = await db.selectStories();
      const recentStories: t.Story[] = h.formatStories(stories, false);
      let recents: string[] = [];
      for (let r of recentStories) recents.push(r.keyword);
      res.send({ recents });
    } catch (e) {
      console.error(e);
      res.status(400).send("Database failure");
    }
    return;
  }

  try {
    const story = await db.selectStory(keyword);
    res.status(200).send(story);
  } catch (e) {
    console.error(e);
    res.status(400).send("Database failure");
  }
});

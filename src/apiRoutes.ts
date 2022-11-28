import express, { Request, Response, Router } from "express";
import * as h from "./helper.js";
import * as t from "./types.js";
import * as db from "./dbConnector.js";

export const apiRouter: Router = express.Router();

// Posting descriptor JSON
apiRouter.post("/descriptor", async (req: Request, res: Response) => {
  let newDescriptor: t.Descriptor;
  try {
    newDescriptor = {
      storyId: req.body.id,
      word: req.body.descriptor,
    };
    await db.insertDescriptor(newDescriptor);
    res.status(201).send();
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});

// Getting fascinations JSON
apiRouter.get("/fascinations", async (req: Request, res: Response) => {
  try {
    const hmus = await db.selectFascinations();
    const preppedHmus: t.Fascination[] = h.formatFascinations(hmus);
    res.status(200).send(preppedHmus);
  } catch (e) {
    console.error(e);
    res.status(400).send("Database failure");
  }
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
  if (keyword === "recents") {
    try {
      const recentsList = await db.selectStories(true);
      if (!(recentsList instanceof Array)) throw "Db type error";
      const recents = recentsList.map((obj) => obj.keyword);
      res.status(200).send({ recents });
    } catch (e) {
      console.error(e);
      res.status(400).send("Database failure getting recents");
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

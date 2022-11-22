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
apiRouter.get("/artists", (req: Request, res: Response) => {
  res.send(db.selectArtists());
});

/* Getting a specific story by keyword as JSON. If the keyword is 'recents',
 * then simply return the most recent 3 keywords */
apiRouter.get("/stories/:key", (req: Request, res: Response) => {
  const keyword: string = req.params.key;
  const stories: t.Story[] = db.selectStories();

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

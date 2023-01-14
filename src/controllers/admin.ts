import { Request, Response } from "express";
import * as db from "../dbConnector.js";
import * as t from "../types.js";
import { AdminRequestBody } from "../types.js";

// Posting a new data
export const postDataController = async (req: Request, res: Response) => {
  try {
    // Validating hash. TODO: use middleware on the admin router
    const adminBody: AdminRequestBody = req.body;
    if (adminBody.hash !== process.env.PASSWORD) {
      throw Error("Invalid password");
    }

    // Updating database
    switch (req.query.model) {
      case "ARTIST": {
        await db.insertArtist({
          name: adminBody.name,
        });
        break;
      }
      case "HMU": {
        await db.insertFascination({
          name: adminBody.name,
          intensity: adminBody.intensity as number,
          color: adminBody.colour as number,
          tstamp: Math.floor(Date.now() / 1000),
        });
        break;
      }
      case "PROJECT": {
        await db.insertProject({
          name: adminBody.name,
          imagename: "placeholder.jpeg",
          url: adminBody.url as string,
          urlname: adminBody.urlname as string,
          description: adminBody.desc || null,
        });
        break;
      }
      case "STORY": {
        await db.insertStory({
          name: adminBody.name,
          keyword: adminBody.keyword as string,
          tstamp: Math.floor(Date.now() / 1000),
          paragraphs: adminBody.paragraphs as string[],
          theme: adminBody.theme as number,
        });
        break;
      }
      default: {
        throw Error(`Invalid modification type: ${req.query.model}`);
      }
    }
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

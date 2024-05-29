import type { Request, Response } from "express";
import {
    insertArtist,
    insertStory,
    insertFascination,
    insertProject,
} from "../dbConnector.js";
import { AdminRequestBody, THEME } from "../types.js";

// Posting a new data
export const postDataController = async (req: Request, res: Response) => {
    const adminBody: AdminRequestBody = req.body;
    const model = adminBody.model.toUpperCase();
    try {
        if (
            (model === "HMU" || model === "STORY") &&
            (adminBody.theme === undefined || !(adminBody.theme in THEME))
        ) {
            res.status(400).json({
                message: "Theme property must be either 0, 1 or 2 to match UI",
                theme: adminBody.theme,
            });
            return;
        }

        let id: number;
        switch (adminBody.model.toUpperCase()) {
            case "ARTIST": {
                id = await insertArtist({
                    name: adminBody.name,
                });
                break;
            }
            case "HMU": {
                if (
                    !adminBody.intensity ||
                    adminBody.intensity < 1 ||
                    adminBody.intensity > 9
                ) {
                    res.status(400).json({
                        message: "Intensity property must be a number from 1 to 9",
                        intensity: adminBody.intensity,
                    });
                    return;
                }
                id = await insertFascination({
                    name: adminBody.name,
                    intensity: adminBody.intensity,
                    theme: adminBody.theme as number,
                    tstamp: Math.floor(Date.now() / 1000),
                });
                break;
            }
            case "PROJECT": {
                id = await insertProject({
                    name: adminBody.name,
                    imagename: "placeholder.jpeg",
                    url: adminBody.url as string,
                    urlname: adminBody.urlname as string,
                    description: adminBody.desc || null,
                });
                break;
            }
            case "STORY": {
                id = await insertStory({
                    name: adminBody.name,
                    keyword: adminBody.keyword as string,
                    tstamp: Math.floor(Date.now() / 1000),
                    paragraphs: adminBody.paragraphs as string[],
                    theme: adminBody.theme as number,
                });
                break;
            }
            default: {
                res.status(400).json({
                    message: `Invalid modification type: ${adminBody.model}`,
                });
                return;
            }
        }
        res.status(201).json({
            message: `Successfully created ${adminBody.model} entry`,
            id,
        });
    } catch (error: unknown) {
        console.error(error);
        res.status(500).json({ message: "Error inserting entity into database" });
    }
};

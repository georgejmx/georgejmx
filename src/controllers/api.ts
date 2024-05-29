import type { Request, Response } from "express";
import { Fascination } from "../types.js";
import { formatFascinations } from "../utils.js";
import { selectFascinations, selectStory, insertDescriptor } from "../dbConnector.js";

// Posting descriptor JSON
export const postDescriptorController = async (req: Request, res: Response) => {
    const newDescriptor = {
        key: req.body.key as string,
        content: req.body.descriptor as string,
    };
    try {
        await insertDescriptor(newDescriptor);
        res.status(201).json({ message: "Success writing descriptor" });
    } catch (err: unknown) {
        console.error(err);
        res.status(500).json({ message: "Error writing descriptor" });
    }
};

// Getting fascinations JSON
export const getFascinationsController = async (_: unknown, res: Response) => {
    try {
        const hmus = await selectFascinations();
        const preppedHmus: Fascination[] = formatFascinations(hmus);
        res.status(200).json(preppedHmus);
    } catch (err: unknown) {
        console.error(err);
        res.status(500).json({ message: "Database error getting fascinations" });
    }
};

/* Getting a specific story by keyword as JSON. If the keyword is 'recents',
 * then simply return the most recent 3 keywords */
export const getStoryByKeyController = async (req: Request, res: Response) => {
    const keyword: string = req.params.key;
    try {
        const story = await selectStory(keyword);
        res.status(200).json(story);
    } catch (err: unknown) {
        console.error(err);
        res.status(500).json({ message: "Database failure getting story" });
    }
};

import { ExpressRequest, ExpressResponse } from "../types.js";
import { formatFascinations } from "../utils.js";
import * as t from "../types.js";
import {
    selectFascinations,
    selectArtists,
    selectRecentStories,
    selectStory,
    insertDescriptor,
} from "../dbConnector.js";

// Posting descriptor JSON
export const postDescriptorController = async (
    req: ExpressRequest,
    res: ExpressResponse
) => {
    let newDescriptor: t.Descriptor;
    try {
        newDescriptor = {
            storyId: req.body.id,
            word: req.body.descriptor,
        };
        const descriptorId = await insertDescriptor(newDescriptor);
        res.status(201).json({ id: descriptorId });
    } catch (err: unknown) {
        console.error(err);
        res.status(500).json({ message: String(err) });
    }
};

// Getting fascinations JSON
export const getFascinationsController = async (_: unknown, res: ExpressResponse) => {
    try {
        const hmus = await selectFascinations();
        const preppedHmus: t.Fascination[] = formatFascinations(hmus);
        res.status(200).json(preppedHmus);
    } catch (err: unknown) {
        console.error(err);
        res.status(500).json({ message: String(err) });
    }
};

// Getting top artists JSON
export const getArtistsController = async (_: unknown, res: ExpressResponse) => {
    try {
        const artists = await selectArtists();
        res.status(200).json(artists);
    } catch (err: unknown) {
        console.error(err);
        res.status(500).json({ message: String(err) });
    }
};

/* Getting a specific story by keyword as JSON. If the keyword is 'recents',
 * then simply return the most recent 3 keywords */
export const getStoryByKeyController = async (
    req: ExpressRequest,
    res: ExpressResponse
) => {
    const keyword: string = req.params.key;

    // Dealing with when only want the 3 most recent keywords
    if (keyword === "recents") {
        try {
            const recentsList = await selectRecentStories();
            if (!(recentsList instanceof Array)) throw Error("Database type error");
            const recents = recentsList.map((obj) => obj.keyword);
            res.status(200).json({ recents });
        } catch (e) {
            console.error(e);
            res.status(500).send("Database failure getting recents");
        }
        return;
    }

    try {
        const story = await selectStory(keyword);
        res.status(200).json(story);
    } catch (err: unknown) {
        console.error(err);
        res.status(500).json({ message: String(err) });
    }
};

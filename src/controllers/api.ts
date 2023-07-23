import { Descriptor, ExpressRequest, ExpressResponse, Fascination } from "../types.js";
import { formatFascinations } from "../utils.js";
import { selectFascinations, selectStory, insertDescriptor } from "../dbConnector.js";

// Posting descriptor JSON
export const postDescriptorController = async (
    req: ExpressRequest,
    res: ExpressResponse
) => {
    let newDescriptor: Descriptor;
    try {
        newDescriptor = {
            storyId: req.body.id,
            word: req.body.descriptor,
        };
        const descriptorId = await insertDescriptor(newDescriptor);
        res.status(201).json({ id: descriptorId });
    } catch (err: unknown) {
        console.error(err);
        res.status(500).json({ message: "Error writing descriptor" });
    }
};

// Getting fascinations JSON
export const getFascinationsController = async (_: unknown, res: ExpressResponse) => {
    try {
        const hmus = await selectFascinations();
        const preppedHmus: Fascination[] = formatFascinations(hmus);
        res.status(200).json(preppedHmus);
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
    try {
        const story = await selectStory(keyword);
        res.status(200).json(story);
    } catch (err: unknown) {
        console.error(err);
        res.status(500).json({ message: "Database failure getting story" });
    }
};

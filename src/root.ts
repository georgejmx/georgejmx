import {
    selectArtists,
    selectFascinations,
    selectProjects,
    selectStories,
    selectStory,
} from "./dbConnector.js";
import { ExpressRequest, ExpressResponse, IndexPayload } from "./types.js";
import {
    formatFascinations,
    formatProjects,
    formatStories,
    generateArtistsText,
    generateDescriptors,
    generateStoriesText,
    THEME_MAP,
} from "./utils.js";

const NUMBER_DESCRIPTORS = 10;
const INTENSITY_UI_OFFSET = 4;

export const healthController = async (_: unknown, res: ExpressResponse) => {
    res.status(200).send("Healthy");
};

// Route to render the index html page
export const homeRenderer = async (_: unknown, res: ExpressResponse) => {
    try {
        const responses = await Promise.all([
            selectProjects(),
            selectStories(),
            selectFascinations(),
            selectArtists(),
        ]);
        const state = {
            projects: responses[0],
            stories: responses[1],
            fascinations: responses[2],
            artists: responses[3],
        };
        const formattedStories = formatStories(state.stories, true);
        const indexPayload: IndexPayload = {
            projects: formatProjects(state.projects),
            stories: formattedStories,
            fascinations: formatFascinations(state.fascinations).map((f) => {
                f.intensity = f.intensity + INTENSITY_UI_OFFSET;
                if (f.intensity === 13) f.intensity = 14; // for good luck :)
                f.color = THEME_MAP[f.theme];
                return f;
            }),
            artistsText: generateArtistsText(state.artists),
            storiesText: generateStoriesText(formattedStories),
        };
        res.render("index", indexPayload);
    } catch (error: unknown) {
        console.error(error);
        res.render("static", {});
    }
};

// Route to render the admin html page
export const adminRenderer = async (_: unknown, res: ExpressResponse) => {
    res.render("admin", {});
};

// Route to render the story html view
export const storyRenderer = async (req: ExpressRequest, res: ExpressResponse) => {
    const keyword = req.params.key.trim();
    try {
        const story = await selectStory(keyword);
        res.render("story", {
            story,
            descriptors: generateDescriptors(NUMBER_DESCRIPTORS),
        });
    } catch (error: unknown) {
        console.error(error);
        res.render("static", {});
    }
};

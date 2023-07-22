import { ExpressRequest, ExpressResponse } from "../types.js";
import { readFileSync } from "fs";
import { formatStories, generateDescriptors } from "../utils.js";
import * as t from "../types.js";
import { selectStory, selectStories, selectProjects } from "../dbConnector.js";

const STORY_MODAL_FILEPATH = "./dist/src/clientScripts/story.js";
const NUMBER_DESCRIPTORS: number = 10;

/* Renders an entire html page for a specific story */
export const getStoryHtmlByKeyController = async (
    req: ExpressRequest,
    res: ExpressResponse
) => {
    const keyword = req.params.key;
    try {
        const story = await selectStory(keyword);
        res.render("story", {
            story,
            descriptors: generateDescriptors(NUMBER_DESCRIPTORS),
            script: readFileSync(STORY_MODAL_FILEPATH, "utf-8").toString(),
        });
    } catch (error: unknown) {
        res.render("error", {
            entity: "Story: " + keyword,
            message: "Database connection error",
        });
    }
};

/* Renders a chunk of html that shows a list of all story tiles */
export const getStoriesHtmlController = async (_: unknown, res: ExpressResponse) => {
    try {
        const stories = await selectStories();
        if (stories.length > 0) {
            res.render("stories", { stories: formatStories(stories, true) });
        } else {
            res.render("empty", { entity: "stories" });
        }
    } catch (error: unknown) {
        res.render("error", {
            entity: "Stories",
            message: "Database connection error",
        });
    }
};

/* Renders a chunk of html that shows a list of all project tiles */
export const getProjectsHtmlController = async (_: unknown, res: ExpressResponse) => {
    try {
        const projects = await selectProjects();
        if (projects.length > 0) {
            projects.forEach((project: t.Project) => {
                (project.imagename = project.imagename.trim()),
                    (project.url = project.url.trim());
            });
            res.render("projects", { projects });
        } else {
            res.render("empty", { entity: "projects" });
        }
    } catch (error) {
        res.render("error", {
            entity: "Projects",
            message: "Database connection error",
        });
    }
};

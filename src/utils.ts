import fs from "fs";
import { fascination } from "@prisma/client";
import {
    Artist,
    Fascination,
    Project,
    Story,
    story_with_descriptor,
    THEME,
} from "./types.js";

export const REFRESH_TIME = 10 * 60000;
export const THEME_MAP: Record<number, string> = {
    0: "orange-600",
    1: "yellow-500",
    2: "orange-400",
};
const ADJECTIVES_FILEPATH = "./assets/adjectives.txt";

function dateToString(date: Date): string {
    return date
        .toLocaleTimeString("en-UK", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
        })
        .substring(0, 10);
}

// Ensure a valid theme and format most recent reactions
const validateStoryFormat = (s: story_with_descriptor): Story => {
    if (!s.theme || !(s.theme in THEME)) {
        s.theme = THEME.BURNT_ORANGE;
    }
    return {
        ...s,
        theme: s.theme as THEME,
        reactions: s.descriptors
            .map((descriptor) => {
                return {
                    word: descriptor.word,
                    datestring: dateToString(descriptor.timestamp),
                };
            })
            .slice(0, 4),
    };
};

// DEPRECATED; the colour property will be pruned from database before v0.4
const validateFascinationTheme = (i: fascination & { theme?: number }) => {
    if (!i.theme) {
        i.color && i.color in THEME ? (i.theme = i.color) : (i.theme = THEME.BURNT_ORANGE);
    }
    i.color = 420;
    return i as Fascination;
};

export const truncateTime = (ts: number): number => Math.floor(ts / 10000) * 10000;

/*
 * Function for calculating the rating multiplier for a fascination used to sort
 fascinations on the UI. This ratings multiplier which is a combination of
 recency and intensity orders fascinations
 */
function findRating(f: Fascination): Fascination {
    f.name = f.name.trim();
    f.tstamp = truncateTime(f.tstamp);
    const lag = Math.floor((Date.now() / 1000 - f.tstamp) / 1000000);
    f.rating = 10 * f.intensity - lag;
    return f;
}

/* Choosing top 4 fascinations from the raw data, by calculating and sorting
 by a ratings multiplier */
export function formatFascinations(input: fascination[]): Fascination[] {
    let hmus: Fascination[] = input.map(validateFascinationTheme);
    hmus = hmus.map(findRating);
    hmus.sort((a, b) => {
        return (b.rating || 0) - (a.rating || 0);
    });
    return hmus.slice(0, 4);
}

/* Function for cropping the stories for the main view. Also clears out the
  unneeded paragraphs of the story to save space on the client */
function generateHeadline(s: Story): Story {
    s.headline = s.paragraphs[0].substring(0, 151) + "...";
    s.paragraphs = [];
    return s;
}

// Function for adding datestring to stories and trimming story name
function addDatestringAndTrim(s: Story): Story {
    s.datestring = dateToString(new Date(s.tstamp * 1000));
    s.name = s.name.trim();
    return s;
}

// Cropping stories and ordering by timestamp for overall frontend view
export function formatStories(input: story_with_descriptor[], hasHead: boolean): Story[] {
    let stories = input.map(validateStoryFormat);
    stories = hasHead ? stories.map(generateHeadline) : stories;
    stories = stories.map(addDatestringAndTrim);
    return stories;
}

// Generate random descriptors to pass to UI modal
export function generateDescriptors(numberDescriptors: number): string[] {
    const wordsBlob: string = fs.readFileSync(ADJECTIVES_FILEPATH, "utf-8");
    const allWords: string[] = wordsBlob.toString().split("\n");
    const totalWords: number = allWords.length;
    const maxI: number = Math.min(numberDescriptors, totalWords);
    let i = 0;
    let randomWords = [];

    // Adding descriptors to array
    while (i < maxI) {
        let wordPosition = Math.floor(Math.random() * totalWords + 1);
        randomWords.push(allWords[wordPosition]);
        i++;
    }
    return randomWords;
}

// Trims projects
export function formatProjects(projects: Project[]): Project[] {
    projects.forEach((project: Project) => {
        (project.imagename = project.imagename.trim()), (project.url = project.url.trim());
    });
    return projects;
}

export function generateArtistsText(artists: Artist[]): string {
    if (artists.length < 3) {
        return "Atleast 3 artists are needed to display top artists";
    }
    return `Latest top artists: ${artists[0].name}, ${artists[1].name}, ${artists[2].name}`;
}

export function generateStoriesText(stories: Story[]): string {
    if (!stories.length) {
        return "Click Upend to create a new story";
    }
    let text = "Most recent themes I have written about: ";
    let i = 0;
    while (i < 3 && i < stories.length) {
        text += stories[i].keyword;
        text += ", ";
        i++;
    }
    return text.substring(0, text.length - 2);
}

// Sets a token expiry 10 minutes in the future
export function generateTokenExpiry(): number {
    const now = new Date();
    return now.getTime() + REFRESH_TIME * 60000;
}

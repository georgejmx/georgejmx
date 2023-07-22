import * as t from "./types.js";
import fs from "fs";
import { fascination } from "@prisma/client";

const ADJECTIVES_FILEPATH = "./assets/adjectives.txt";

const validateStoryTheme = (s: t.story_with_descriptor): t.Story => {
    if (!s.theme || !(s.theme in t.THEME)) {
        s.theme = t.THEME.BURNT_ORANGE;
    }
    return s as t.Story;
};

// DEPRECATED; the colour property will be pruned from database before v0.4
const validateFascinationTheme = (i: fascination & { theme?: number }) => {
    if (!i.theme) {
        i.color && i.color in t.THEME
            ? (i.theme = i.color)
            : (i.theme = t.THEME.BURNT_ORANGE);
    }
    i.color = 420;
    return i as t.Fascination;
};

export const truncateTime = (ts: number): number => Math.floor(ts / 10000) * 10000;

/*
 * Function for calculating the rating multiplier for a fascination used to sort
 fascinations on the UI. This ratings multiplier which is a combination of
 recency and intensity orders fascinations
 */
function findRating(f: t.Fascination): t.Fascination {
    f.name = f.name.trim();
    f.tstamp = truncateTime(f.tstamp);
    const lag = Math.floor((Date.now() / 1000 - f.tstamp) / 1000000);
    f.rating = 10 * f.intensity - lag;
    return f;
}

/* Choosing top 4 fascinations from the raw data, by calculating and sorting
 by a ratings multiplier */
export function formatFascinations(input: fascination[]): t.Fascination[] {
    let hmus: t.Fascination[] = input.map(validateFascinationTheme);
    hmus = hmus.map(findRating);
    hmus.sort((a, b) => {
        return (b.rating || 0) - (a.rating || 0);
    });
    return hmus.slice(0, 4);
}

/* Function for cropping the stories for the main view. Also clears out the
  unneeded paragraphs of the story to save space on the client */
function generateHeadline(s: t.Story): t.Story {
    s.headline = s.paragraphs[0].substring(0, 151) + "...";
    s.paragraphs = [];
    return s;
}

// Function for adding datestring to stories and trimming story name
function addDatestringAndTrim(s: t.Story): t.Story {
    const dateObj = new Date(s.tstamp * 1000);
    s.datestring = dateObj
        .toLocaleTimeString("en-UK", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
        })
        .substring(0, 10);
    s.name = s.name.trim();
    return s;
}

// Gets the 4 most recent words used to describe the story and attaches
function generateReactions(s: t.Story): t.Story {
    s.reactions = s.descriptors.map((descriptor) => descriptor.word.trim()).slice(0, 4);
    return s;
}

// Cropping stories and ordering by timestamp for overall frontend view
export function formatStories(
    input: t.story_with_descriptor[],
    hasHead: boolean
): t.Story[] {
    let stories = input.map(validateStoryTheme);
    stories = hasHead ? stories.map(generateHeadline) : stories;
    stories = stories.map(addDatestringAndTrim);
    stories = stories.map(generateReactions);
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

// Checks if a day has elapsed since previous comment using the number of seconds elapsed
export function hasDayElapsed(latest: Date): boolean {
    return Date.now() - latest.getTime() < 86400000 ? true : false;
}

// Sets a token expiry 10 minutes in the future
export function generateTokenExpiry(): number {
    const now = new Date();
    const minutesInFuture = 10;
    return now.getTime() + minutesInFuture * 60000;
}

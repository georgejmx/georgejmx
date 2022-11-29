import * as t from "./types.js";
import fs from "fs";

/* Function for calculating the rating multiplier for a fascination */
function findRating(f: t.Fascination): t.Fascination {
  const recency = 5 * Math.floor((Date.now() - f.tstamp * 1000) / 1000000);
  f.rating = 100000 * f.intensity - recency;
  return f;
}

/* Choosing top 4 fascinations from the raw data, by calculating and sorting
 * by a ratings multiplier */
export function formatFascinations(input: t.Fascination[]): t.Fascination[] {
  const output: t.Fascination[] = input.map(findRating);
  output.sort((a, b) => {
    return (b.rating || 0) - (a.rating || 0);
  });
  return output.slice(0, 4);
}

/* Function for cropping the stories for the main view. Also clears out the
  unneeded paragraphs of the story to save space on the client */
function generateHeadline(s: t.Story): t.Story {
  s.headline = s.paragraphs[0].substring(0, 151) + "...";
  s.paragraphs = [];
  return s;
}

/* Gets the 4 most recent words used to describe the story and attaches */
function generateReactions(s: t.Story): t.Story {
  s.reactions = s.descriptor
    ?.map((descriptor) => descriptor.word.trim())
    .slice(0, 4);
  delete s.descriptor;
  return s;
}

/* Function for adding datestring to stories */
function addDatestring(s: t.Story): t.Story {
  const dateObj = new Date(s.tstamp * 1000);
  s.datestring = dateObj
    .toLocaleTimeString("en-UK", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    })
    .substring(0, 10);
  return s;
}

/* Cropping stories and ordering by timestamp for overall frontend view */
export function formatStories(input: t.Story[], hasHead: boolean): t.Story[] {
  let output = hasHead ? input.map(generateHeadline) : input;
  output = output.map(addDatestring);
  output = output.map(generateReactions);
  return output;
}

/* Generate random descriptors to pass to UI modal */
export function generateDescriptors(numberDescriptors: number): string[] {
  const wordsBlob: string = fs.readFileSync("./libs/adjectives.txt", "utf-8");
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

/* Checks if a day has elapsed since previous comment */
export function hasDayElapsed(latest: Date): boolean {
  if (Date.now() - latest.getTime() < 86400000) {
    return false;
  }

  // So enough seconds have elapsed to hit 1 day gap
  return true;
}

import * as t from "./types";

/* Function for calculating the rating multiplier for a fascination */
function findRating(f: t.Fascination): t.Fascination {
  const recency = 5 * Math.floor((Date.now() - f.timestamp) / 1000000);
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

/* Function for cropping the stories for the main view */
function generateHeadline(s: t.Story): t.Story {
  s.headline = s.paragraphs[0].substring(0, 151) + "...";
  return s;
}

/* Function for adding datestring to stories */
function addDatestring(s: t.Story): t.Story {
  const dateObj = new Date(s.timestamp);
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
  output.sort((a, b) => b.timestamp - a.timestamp);
  return output;
}

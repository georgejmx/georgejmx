import * as t from "./types";

/* Function for calculating the rating multiplier for a fascination */
export function findRating(f: t.Fascination): t.Fascination {
  const recency = 5 * Math.floor((Date.now() - f.timestamp) / 1000000);
  f.rating = 100000 * f.intensity - recency;
  return f;
}

/* Choosing top 3 fascinations from the raw data, by calculating and sorting
 * by a ratings multiplier */
export function rankFascinations(input: t.Fascination[]): t.Fascination[] {
  const output: t.Fascination[] = input.map(findRating);
  output.sort((a, b) => {
    return (b.rating || 0) - (a.rating || 0);
  });
  return output.slice(0, 3);
}

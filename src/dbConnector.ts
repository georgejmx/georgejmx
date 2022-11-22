import sData from "./data/stories.json" assert { type: "json" };
import pData from "./data/projects.json" assert { type: "json" };
import fData from "./data/fascinations.json" assert { type: "json" };
import aData from "./data/artists.json" assert { type: "json" };
import * as t from "./types";

export function selectStories(): t.Story[] {
  return sData.stories;
}

export function selectProjects(): t.Project[] {
  return pData.projects;
}

export function selectFascinations(): t.Fascination[] {
  return fData.fascinations;
}

export function selectArtists(): t.Artist[] {
  return aData.artists;
}

export function insertDescriptor(descriptor: t.Descriptor): boolean {
  console.log(
    `Frontend wants to post; Key: ${descriptor.keyword}, Descriptor: ${descriptor.word}`
  );
  return true;
}

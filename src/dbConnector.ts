import pData from "./data/projects.json" assert { type: "json" };
import fData from "./data/fascinations.json" assert { type: "json" };

import { PrismaClient, artist } from "@prisma/client";
import * as t from "./types";

const prisma = new PrismaClient();

export async function selectStory(keyword: string) {
  const story = await prisma.story.findUnique({
    where: { keyword: keyword },
  });
  return story;
}

export async function selectStories() {
  const allStories = await prisma.story.findMany();
  return allStories;
}

export function selectProjects(): t.Project[] {
  return pData.projects;
}

export function selectFascinations(): t.Fascination[] {
  return fData.fascinations;
}

export async function selectArtists() {
  const artists = await prisma.artist.findMany();
  return artists;
}

export function insertDescriptor(descriptor: t.Descriptor): boolean {
  console.log(
    `Frontend wants to post; Key: ${descriptor.keyword}, Descriptor: ${descriptor.word}`
  );
  return true;
}

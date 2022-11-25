import { PrismaClient } from "@prisma/client";
import * as t from "./types";

const prisma = new PrismaClient();

/* Selecting a story with the given keyword from database table */
export async function selectStory(keyword: string) {
  const story = await prisma.story.findUnique({ where: { keyword: keyword } });
  return story;
}

/* By default getting all stories in descending order from db table. If
 *isRecents*, getting the 3 most recent keywords for main page */
export async function selectStories(isRecents: boolean = false) {
  if (isRecents) {
    const recents =
      await prisma.$queryRaw`select keyword from Story order by id desc limit 3`;
    return recents;
  }

  // Simply getting everything; for HTML page
  const stories = await prisma.story.findMany({ orderBy: [{ id: "desc" }] });
  return stories;
}

/* Selecting all projects from database table */
export async function selectProjects() {
  const projects = await prisma.project.findMany({ orderBy: [{ id: "asc" }] });
  return projects;
}

/* Selecting all fascinations from database table */
export async function selectFascinations() {
  const hmus = await prisma.fascination.findMany();
  return hmus;
}

/* Selecting all artists from database table */
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

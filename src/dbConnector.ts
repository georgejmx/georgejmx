import { PrismaClient } from "@prisma/client";
import { hasDayElapsed } from "./helper";
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
    const recents = await prisma.story.findMany({
      select: { keyword: true },
      orderBy: [{ id: "desc" }],
      take: 3,
    });
    return recents;
  }

  // Simply getting everything; for HTML page
  const stories = await prisma.story.findMany({
    orderBy: [{ id: "desc" }],
    include: {
      descriptor: {
        select: { word: true, storyId: true },
        orderBy: [{ id: "desc" }],
      },
    },
  });
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

/* Adding a new descriptor to a story */
export async function insertDescriptor(descriptor: t.Descriptor) {
  // Getting post time of latest story descriptor
  const latestTimestamp = await prisma.descriptor.findMany({
    select: { timestamp: true },
    orderBy: [{ id: "desc" }],
    where: { storyId: descriptor.storyId },
    take: 1,
  });

  // Checking if latest post was within 1 day
  if (
    latestTimestamp.length > 0 &&
    !hasDayElapsed(latestTimestamp[0].timestamp)
  ) {
    throw "Too soon to add a descriptor to that post";
  }

  // Adding descriptor
  await prisma.descriptor.create({
    data: {
      word: descriptor.word,
      storyId: descriptor.storyId,
    },
  });
}

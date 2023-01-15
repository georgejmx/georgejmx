import { PrismaClient } from "@prisma/client";
import { hasDayElapsed } from "./helper.js";
import * as t from "./types.js";

const prisma = new PrismaClient();

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

export async function selectProjects() {
  const projects = await prisma.project.findMany({ orderBy: [{ id: "asc" }] });
  return projects;
}

export async function selectFascinations() {
  const hmus = await prisma.fascination.findMany();
  return hmus;
}

export async function selectArtists() {
  const artists = await prisma.artist.findMany({ orderBy: [{ id: "desc" }] });
  return artists;
}

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
    throw Error("Too soon to add a descriptor to that post");
  }

  // Adding descriptor
  await prisma.descriptor.create({
    data: {
      word: descriptor.word,
      storyId: descriptor.storyId,
    },
  });
}

export async function insertArtist(artist: t.Artist) {
  await prisma.artist.create({
    data: {
      name: artist.name,
    },
  });
}

export async function insertFascination(fascination: t.Fascination) {
  await prisma.fascination.create({
    data: {
      name: fascination.name,
      intensity: fascination.intensity,
      color: fascination.color,
      tstamp: fascination.tstamp,
    },
  });
}

export async function insertProject(project: t.Project) {
  await prisma.project.create({
    data: {
      name: project.name,
      imagename: project.imagename,
      url: project.url,
      urlname: project.urlname,
      description: project.description,
    },
  });
}

export async function insertStory(story: t.Story) {
  await prisma.story.create({
    data: {
      name: story.name,
      keyword: story.keyword,
      paragraphs: story.paragraphs,
      theme: story.theme,
      tstamp: story.tstamp,
    },
  });
}

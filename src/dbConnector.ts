import { fascination, PrismaClient, story } from "@prisma/client";
import { hasDayElapsed } from "./utils.js";
import * as t from "./types.js";

const prisma = new PrismaClient();

export async function selectStory(keyword: string): Promise<story> {
    const story = await prisma.story.findUnique({ where: { keyword: keyword } });
    if (!story) {
        throw Error("Story not found by specified keyword");
    }
    return story;
}

export async function selectRecentStories() {
    const recents = await prisma.story.findMany({
        select: { keyword: true },
        orderBy: [{ id: "desc" }],
        take: 3,
    });
    return recents;
}

export async function selectStories(): Promise<t.story_with_descriptor[]> {
    const stories = await prisma.story.findMany({
        orderBy: [{ id: "desc" }],
        include: {
            descriptors: {
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

export async function selectFascinations(): Promise<fascination[]> {
    const hmus = await prisma.fascination.findMany();
    return hmus;
}

export async function selectArtists() {
    const artists = await prisma.artist.findMany({ orderBy: [{ id: "desc" }] });
    return artists;
}

export async function insertDescriptor(descriptor: t.Descriptor): Promise<number> {
    // Getting post time of latest story descriptor
    const latestTimestamp = await prisma.descriptor.findMany({
        select: { timestamp: true },
        orderBy: [{ id: "desc" }],
        where: { storyId: descriptor.storyId },
        take: 1,
    });

    // Checking if latest post was within 1 day
    if (latestTimestamp.length > 0 && !hasDayElapsed(latestTimestamp[0].timestamp)) {
        throw Error("Too soon to add a descriptor to that post");
    }

    // Adding descriptor
    const result = await prisma.descriptor.create({
        data: {
            word: descriptor.word,
            storyId: descriptor.storyId,
        },
        select: { id: true },
    });
    return result.id;
}

export async function insertArtist(artist: t.Artist): Promise<number> {
    const result = await prisma.artist.create({
        data: {
            name: artist.name,
        },
        select: { id: true },
    });
    return result.id;
}

export async function insertFascination(
    fascination: t.FascinationRequestBody
): Promise<number> {
    const result = await prisma.fascination.create({
        data: {
            name: fascination.name,
            intensity: fascination.intensity,
            color: fascination.theme,
            tstamp: fascination.tstamp,
        },
        select: { id: true },
    });
    return result.id;
}

export async function insertProject(project: t.Project): Promise<number> {
    const result = await prisma.project.create({
        data: {
            name: project.name,
            imagename: project.imagename,
            url: project.url,
            urlname: project.urlname,
            description: project.description,
        },
        select: { id: true },
    });
    return result.id;
}

export async function insertStory(story: t.Story): Promise<number> {
    const result = await prisma.story.create({
        data: {
            name: story.name,
            keyword: story.keyword,
            paragraphs: story.paragraphs,
            theme: story.theme,
            tstamp: story.tstamp,
        },
        select: { id: true },
    });
    return result.id;
}

import { fascination, PrismaClient, story } from "@prisma/client";
import { hasDayElapsed } from "./utils.js";
import {
    Artist,
    Project,
    story_with_descriptor,
    Descriptor,
    FascinationRequestBody,
    Story,
} from "./types.js";

const prisma = new PrismaClient();

export async function selectStory(keyword: string): Promise<story> {
    const story = await prisma.story.findUnique({ where: { keyword: keyword } });
    if (!story) {
        throw Error("Story not found by specified keyword");
    }
    return story;
}

export async function selectStories(): Promise<story_with_descriptor[]> {
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

export async function selectProjects(): Promise<Project[]> {
    const projects = await prisma.project.findMany({ orderBy: [{ id: "asc" }] });
    return projects;
}

export async function selectFascinations(): Promise<fascination[]> {
    const hmus = await prisma.fascination.findMany();
    return hmus;
}

export async function selectArtists(): Promise<Artist[]> {
    const artists = await prisma.artist.findMany({ orderBy: [{ id: "desc" }] });
    return artists;
}

export async function insertDescriptor(descriptor: Descriptor): Promise<number> {
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

export async function insertArtist(artist: Artist): Promise<number> {
    const result = await prisma.artist.create({
        data: {
            name: artist.name,
        },
        select: { id: true },
    });
    return result.id;
}

export async function insertFascination(
    fascination: FascinationRequestBody
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

export async function insertProject(project: Project): Promise<number> {
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

export async function insertStory(story: Story): Promise<number> {
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

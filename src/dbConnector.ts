import { fascination, PrismaClient, story } from "@prisma/client";
import {
    Artist,
    Project,
    story_with_descriptor,
    FascinationRequestBody,
    Story,
} from "./types.js";

const prisma = new PrismaClient();

export async function selectStory(keyword: string): Promise<story> {
    return await prisma.story.findFirstOrThrow({ where: { keyword: keyword } });
}

export async function selectStories(): Promise<story_with_descriptor[]> {
    const stories = await prisma.story.findMany({
        orderBy: [{ id: "desc" }],
        include: {
            descriptors: {
                select: { word: true, storyId: true, timestamp: true },
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

export async function insertDescriptor(descriptor: {
    key: string;
    content: string;
}): Promise<number> {
    const storyResult = await prisma.story.findFirstOrThrow({
        where: {
            keyword: {
                equals: descriptor.key,
            },
        },
        select: {
            id: true,
        },
    });
    const result = await prisma.descriptor.create({
        data: {
            word: descriptor.content,
            storyId: storyResult.id,
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

import { PrismaClient } from "@prisma/client";
import * as t from "./types";

const prisma = new PrismaClient();

export async function selectStory(keyword: string) {
  const story = await prisma.story.findUnique({ where: { keyword: keyword } });
  return story;
}

export async function selectStories() {
  const stories = await prisma.story.findMany();
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
  const artists = await prisma.artist.findMany();
  return artists;
}

export function insertDescriptor(descriptor: t.Descriptor): boolean {
  console.log(
    `Frontend wants to post; Key: ${descriptor.keyword}, Descriptor: ${descriptor.word}`
  );
  return true;
}

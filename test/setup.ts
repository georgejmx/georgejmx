import { fascination, story } from "@prisma/client";
import { Descriptor, Fascination, Story } from "../src/types";

(process.env.NODE_ENV = "test"),
    (process.env.ADMIN_HASH =
        "TESTdfb7203bfba2b34252186dfa953fbfa0e58487254f53b4fcffc7295a4daf");

jest.mock("../src/dbConnector", () => ({
    selectStory: async (keyword: string): Promise<story> => {
        if (keyword === "bananas") {
            return Promise.resolve({
                id: 11,
                name: "Test story",
                keyword,
                tstamp: 64000,
                paragraphs: ["i'll", "be back.."],
                theme: 0,
            });
        } else {
            return Promise.reject(new Error("Invalid story keyword provided"));
        }
    },
    selectFascinations: async (): Promise<fascination[]> => {
        const oneWeekAgo = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
        return Promise.resolve([
            {
                id: 1,
                name: "python",
                intensity: 4,
                color: 1, // DEPRECATED; color will be removed from database in v0.4 and replaced with theme
                tstamp: new Date(oneWeekAgo).getTime() / 1000,
                theme: null,
            },
        ]);
    },
    insertStory: async (story: Story): Promise<number> => {
        return Promise.resolve(7);
    },
    insertFascination: async (fascination: Fascination): Promise<number> => {
        if (!fascination.name || !fascination.intensity || !fascination.theme) {
            return Promise.reject(new Error("Prisma error due to missing property"));
        }
        return Promise.resolve(8);
    },
    insertDescriptor: async (descriptor: Descriptor): Promise<number> => {
        if (descriptor.storyId === 4 && descriptor.word === "tranquil") {
            return Promise.resolve(9);
        } else {
            return Promise.reject(new Error("Invalid story id access attempted"));
        }
    },
}));

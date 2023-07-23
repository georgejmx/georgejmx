import { fascination } from "@prisma/client";
import { Story, Fascination, story_with_descriptor } from "../src/types";

export function storyRequestFixture(): object {
    return {
        params: {
            key: "bananas",
        },
    };
}

export const expectedStoriesArray: story_with_descriptor[] = [
    {
        id: 42,
        name: "test story",
        keyword: "testing",
        tstamp: 1689793736,
        paragraphs: ["first test paragraph", "second test paragraph"],
        descriptors: [{ word: "spicy", storyId: 42 }],
        theme: 1,
    },
    {
        id: 43,
        name: "test story 2",
        keyword: "mocking",
        tstamp: 1689863736,
        paragraphs: ["first test paragraph", "second test paragraph"],
        descriptors: [{ word: "juicy", storyId: 43 }],
        theme: 2,
    },
];

export function insertStoryRequestFixture(): object {
    return {
        body: {
            model: "STORY",
            name: expectedStoriesArray[0].name,
            keyword: expectedStoriesArray[0].keyword,
            paragraphs: expectedStoriesArray[0].paragraphs,
            theme: 1,
        },
    };
}

export function insertFascinationRequestFixture(valid: boolean = true): object {
    if (valid) {
        return {
            body: {
                model: "HMU",
                name: "jest",
                intensity: 8,
                theme: 1,
            },
        };
    } else {
        return {
            body: {
                model: "HMU",
                name: "pytest",
                intensity: 11,
                theme: 4,
            },
        };
    }
}

export function fascinationsFixture(): (fascination & { theme?: number })[] {
    return [
        { id: 1, name: "f1", intensity: 2, theme: 1, color: 1, tstamp: 1680028511 },
        { id: 2, name: "f2", intensity: 8, theme: 2, color: 2, tstamp: 1680028511 },
        { id: 3, name: "f3", intensity: 2, theme: 3, color: 2, tstamp: 1675028511 },
    ];
}

export function descriptorRequestFixture(): object {
    return {
        body: {
            id: 4,
            descriptor: "tranquil",
        },
    };
}

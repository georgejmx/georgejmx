import { story } from "@prisma/client";

type Token = {
    expiry: number;
    admin: boolean;
};

export type TokenMap = Record<string, Token>;

export type CoreExpressResponse = {
    status: (code: number) => ExpressResponse;
    json: (data: object) => ExpressResponse;
};

export type ExpressRequest = Record<string, any>;
export type ExpressResponse = Record<string, any>;

export type story_with_descriptor = story & {
    descriptors: {
        word: string;
        storyId: number;
    }[];
};

export enum THEME {
    BURNT_ORANGE = 0,
    YELLOW = 1,
    ORANGE = 2,
}

export interface ThemedEntity {
    id?: number;
    theme: THEME;
    name: string;
    tstamp: number;
}

export interface Story extends ThemedEntity {
    keyword: string;
    paragraphs: string[];
    descriptors: Descriptor[];
    headline?: string;
    datestring?: string;
    reactions?: string[];
}

export interface Fascination extends ThemedEntity {
    intensity: number;
    rating?: number;
    color: 420; // DEPRECATED; color will be removed from database in v0.4
}

export interface Artist {
    id?: number;
    name: string;
}

export interface Project {
    id?: number;
    name: string;
    imagename: string;
    url: string;
    urlname: string;
    description: string | null;
}

export interface Descriptor {
    id?: number;
    storyId: number;
    keyword?: string;
    word: string;
    timestamp?: Date;
}

export type AdminRequestBody = {
    model: string;
    name: string;
    theme?: number;
    intensity?: number;
    url?: string;
    urlname?: string;
    desc?: string;
    keyword?: string;
    paragraphs?: string[];
};

export type FascinationRequestBody = {
    name: string;
    intensity: number;
    theme: number;
    tstamp: number;
};

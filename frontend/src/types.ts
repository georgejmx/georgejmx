export type AdminRequestBody = {
    model: string;
    name: string;
    intensity?: number;
    url?: string;
    urlname?: string;
    desc?: string;
    keyword?: string;
    paragraphs?: string[];
    theme?: number;
};

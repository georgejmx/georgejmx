export type AdminRequestBody = {
  hash: string;
  name: string;
  intensity?: number;
  colour?: number;
  url?: string;
  urlname?: string;
  desc?: string;
  keyword?: string;
  paragraphs?: string[];
  theme?: number;
};

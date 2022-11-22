export type Fascination = {
  name: string;
  intensity: number;
  color: number;
  timestamp: number;
  rating?: number;
};

export type Artist = {
  name: string;
};

export type Story = {
  name: string;
  keyword: string;
  timestamp: number;
  paragraphs: string[];
  theme: number;
  datestring?: string;
  headline?: string;
};

export type Project = {
  name: string;
  imageName: string;
  url: string;
  urlName: string;
  description: string;
};

export type Descriptor = {
  keyword: string;
  word: string;
};

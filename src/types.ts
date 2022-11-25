export type Fascination = {
  name: string;
  intensity: number;
  color: number;
  timestamp: number;
  rating?: number;
};

export type Artist = {
  id: number;
  name: string;
};

export type Story = {
  id: number;
  name: string;
  keyword: string;
  tstamp: number;
  paragraphs: string[];
  theme: number | null;
  headline?: string;
  datestring?: string;
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

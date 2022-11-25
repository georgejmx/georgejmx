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

export type Fascination = {
  id: number;
  name: string;
  intensity: number;
  color: number;
  tstamp: number;
  rating?: number;
};

export type Project = {
  id: number;
  name: string;
  imageName: string;
  url: string;
  urlName: string;
  description: string | null;
};

export type Descriptor = {
  keyword: string;
  word: string;
};

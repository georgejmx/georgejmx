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
  descriptor?: Descriptor[];
  reactions?: string[];
};

export type Descriptor = {
  id?: number;
  storyId: number;
  keyword?: string;
  word: string;
  timestamp?: Date;
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
  imagename: string;
  url: string;
  urlname: string;
  description: string | null;
};

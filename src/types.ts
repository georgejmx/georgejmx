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
  contents: string;
  theme: number;
};

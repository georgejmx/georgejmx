export type Fascination = {
  color: string;
  intensity: number;
  name: string;
};

export type Panel = "home" | "projects" | "skills";

export type Project = {
  description: string;
  imageName: string;
  name: string;
  url: string;
};

export type Skill = {
  name: string;
  strength: number;
  type: "hard" | "soft" | "tool";
};

export type Panel = "home" | "career" | "projects" | "skills";

export type CareerProject = {
  name: string;
  headline: string;
  bulk: string;
};

export type Fascination = {
  color: string;
  intensity: number;
  name: string;
};

export type SideProject = {
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

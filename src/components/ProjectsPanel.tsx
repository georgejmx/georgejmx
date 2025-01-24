import projectsData from "../models/side-projects.json";
import type { SideProject } from "../types";
import SideProjectCard from "./SideProjectCard";

export default function ProjectsPanel(): JSX.Element {
  const projects: SideProject[] = projectsData;

  return (
    <>
      <div className="md:flex md:flex-row">
        {projects.map((item: SideProject) => (
          <SideProjectCard {...item} />
        ))}
      </div>
      <p className="text-white font-mono mb-6">
        Many more projects can be found on my
        <a
          href="https://github.com/georgejmx/"
          className="ml-1 font-mono text-yellow-200 hover:text-yellow-500"
        >
          GitHub
        </a>
      </p>
    </>
  );
}

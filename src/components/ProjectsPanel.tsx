import projectsData from "../models/projects.json";
import type { Project } from "../types";
import ProjectCard from "./ProjectCard";

export default function ProjectsPanel(): JSX.Element {
  const projects: Project[] = projectsData;

  return (
    <>
      <div className="md:flex md:flex-row">
        {projects.map((item: Project) => (
          <ProjectCard {...item} />
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

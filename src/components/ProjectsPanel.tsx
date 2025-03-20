import projectsData from "../models/side-projects.json";
import type { SideProject } from "../types";
import SideProjectCard from "./SideProjectCard";

export default function ProjectsPanel(): JSX.Element {
  const projects: SideProject[] = projectsData;

  return (
    <>
      <h2 className="text-lg text-white py-2 font-bold">Recreational Coding</h2>
      <p className="text-white font-mono mb-4">
        Ideas I have explored in my free time include..
      </p>
      <div className="md:flex md:flex-row">
        {projects.map((item: SideProject) => (
          <SideProjectCard key={item.name} {...item} />
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

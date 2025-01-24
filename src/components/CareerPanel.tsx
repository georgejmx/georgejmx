import projectsData from "../models/career-projects.json";
import { CareerProject } from "../types";
import CareerHighlight from "./CareerHighlight";

export default function CareerPanel(): JSX.Element {
  const projects: CareerProject[] = projectsData;

  return (
    <>
      <p className="text-white font-mono mb-6">
        High-impact projects completed at work I am most proud of include..
      </p>
      <div className="py-4">
        {projects.map((item: CareerProject) => (
          <CareerHighlight {...item} />
        ))}
      </div>
    </>
  );
}

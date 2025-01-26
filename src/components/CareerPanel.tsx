import projectsData from "../models/career-projects.json";
import { CareerProject } from "../types";
import CareerHighlight from "./CareerHighlight";

export default function CareerPanel(): JSX.Element {
  const projects: CareerProject[] = projectsData;

  return (
    <>
      <h2 className="text-lg text-white py-2 font-bold">
        Top Professional Achievments
      </h2>
      <p className="text-white font-mono mb-4">
        High-impact projects completed at work I led are..
      </p>
      <div className="py-4">
        {projects.map((item: CareerProject) => (
          <CareerHighlight {...item} />
        ))}
      </div>
    </>
  );
}

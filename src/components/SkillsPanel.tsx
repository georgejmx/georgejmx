import { useMemo } from "react";

import skillsData from "../models/skills.json";
import { Skill } from "../types";
import SkillBar from "./SkillBar";

export default function SkillsPanel(): JSX.Element {
  const sortedSkills = useMemo(() => {
    return skillsData.slice().sort((x, y) => y.strength - x.strength);
  }, [skillsData]) as Skill[];

  return (
    <>
      <h2 className="text-lg text-white py-2 font-bold">
        Strongest Competencies
      </h2>
      <p className="text-slate-300 bg-black md:text-sm">
        Top competencies I will bring to any organisation, ranked by which
        skills I have developed the most. As is the nature of any engineering
        role, this comprises a combination of{" "}
        <span className="text-orange-600">programming tools </span>,{" "}
        <span className="text-orange-400">technical skills</span> and{" "}
        <span className="text-yellow-500">non technical skills</span>
      </p>
      <div className="py-4">
        {sortedSkills.map((item: Skill) => (
          <SkillBar {...item} />
        ))}
      </div>
    </>
  );
}

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
      <h2 className="text-lg text-white font-mono py-2 mt-4 font-bold">
        Strongest Competencies
      </h2>
      <div className="py-4">
        {sortedSkills.map((item: Skill) => (
          <SkillBar {...item} />
        ))}
      </div>
    </>
  );
}

import type { Skill } from "../types";

const skillDomainToColor = {
  hard: "orange-400",
  soft: "yellow-500",
  tool: "orange-600",
};

export default function SkillBar(props: Skill): JSX.Element {
  const fillColor = skillDomainToColor[props.type] ?? "orange-400";

  return (
    <div className="flex py-1">
      <svg className={`w-${props.strength} h-4`}>
        <rect width="200" height="100" className={`fill-${fillColor}`} />
      </svg>
      <p className={`ml-2 text-${fillColor} font-mono bg-black`}>
        {props.name}
      </p>
    </div>
  );
}

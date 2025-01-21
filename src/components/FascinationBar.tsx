import type { Fascination } from "../types";

export default function FascinationBar(props: Fascination): JSX.Element {
  return (
    <div className="flex">
      <svg className={`w-${props.intensity} h-4`}>
        <rect width="150" height="60" className={`fill-${props.color}`} />
      </svg>
      <p className={`ml-2 text-${props.color} font-mono bg-black`}>
        {props.name}
      </p>
    </div>
  );
}

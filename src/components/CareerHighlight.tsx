import type { CareerProject } from "../types";

export default function CareerHighlight(props: CareerProject): JSX.Element {
  return (
    <div className="flex flex-col max-w-sm md:max-w-md border-2 border-orange-600 bg-black p-2 md:p-6 mb-6 md:mr-6 text-white">
      <h3 className="text-lg underline mb-3">{props.name}</h3>
      <p className="font-bold mb-3">{props.headline}</p>
      <p>{props.bulk}</p>
    </div>
  );
}

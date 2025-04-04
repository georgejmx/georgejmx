import type { SideProject } from "../types";

export default function SideProjectCard(props: SideProject): JSX.Element {
  return (
    <div className="flex flex-col max-w-sm md:max-w-md border-2 border-yellow-500 bg-black p-2 md:p-6 mb-6 md:mr-6">
      <img
        alt={`A screenshot of ${props.url}`}
        src={`images/projects/${props.imageName}`}
        className="max-h-70 p-2"
      />
      <div className="font-bold text-xl mb-2 font-mono text-yellow-500">
        {props.name}
      </div>
      <a href={props.url} target="_blank" rel="noreferrer">
        <img
          alt="A paperclip icon"
          src="images/logos/link.png"
          className="w-6"
        />
      </a>
      <p className="font-mono text-white text-sm py-2">{props.description}</p>
    </div>
  );
}

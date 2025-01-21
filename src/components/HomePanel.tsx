import SocialLinkRow from "./SocialLinkRow";
import fascinationsData from "../models/fascinations.json";
import type { Fascination } from "../types";
import FascinationBar from "./FascinationBar";

export default function HomePanel(): JSX.Element {
  const fascinations: Fascination[] = fascinationsData;

  return (
    <>
      <div>
        <p className="text-slate-300 font-mono bg-black md:text-sm">
          DIY developer with a passion for technology and creativity. Maths
          graduate currently pursuing my career in full-stack software
          development. Motivated by the potential of technology to drive
          positive change, and also the opportunity to be creative in and out of
          work
        </p>
      </div>
      <div className="py-2 max-w-sm w-full border-orange-400 text-orange-400 text-sm bg-black font-mono font-bold mt-4">
        <img className="inline" src="images/logos/spotify-16.png" />
        <p className="inline text-orange-400 text-sm font-mono font-bold">
          Latest top artists: 21 pilots, ski aggu, prince
        </p>
      </div>
      <h2 className="text-lg text-white font-mono py-2 font-bold">Find Me</h2>
      <table className="table-auto">
        <tbody>
          <SocialLinkRow
            imageSrc="images/logos/linkedin.jpg"
            linkTarget="https://linkedin.com/in/georgejmx/"
            text="LinkedIn"
          />
          <SocialLinkRow
            imageSrc="images/logos/github.png"
            linkTarget="https://github.com/georgejmx/"
            text="GitHub"
          />
          <SocialLinkRow
            imageSrc="images/logos/twitter.jpg"
            linkTarget="https://x.com/hologjm/"
            text="X"
          />
          <SocialLinkRow
            imageSrc="images/logos/opensea.jpg"
            linkTarget="https://opensea.io/hologjm"
            text="OpenSea"
          />
        </tbody>
      </table>
      <h2 className="text-lg text-white font-mono py-2 mt-4 font-bold">
        Hit Me Up about..
      </h2>
      <div>
        {fascinations.map((item: Fascination) => (
          <FascinationBar {...item} />
        ))}
      </div>
      <p className="mt-8 text-slate-400 font-mono italic bg-black">
        “If you do not tell the truth about yourself you cannot tell it about
        other people.”
      </p>
      <div className="flex mt-4 px-1 mb-10">
        <p
          lang="de"
          className="text-orange-600 font-mono bg-black text-sm md:text-xs"
        >
          Wenn man einen tanzenden Stern sucht, findet man Glück und Schönheit
        </p>
      </div>
    </>
  );
}

import SocialLinkRow from "./SocialLinkRow";
import fascinationsData from "../models/fascinations.json";
import type { Fascination } from "../types";
import FascinationBar from "./FascinationBar";
import QuoteFinder from "./QuoteFinder";

export default function HomePanel(): JSX.Element {
  const fascinations: Fascination[] = fascinationsData;

  return (
    <>
      <h1
        lang="de"
        className="text-xl text-white py-2 font-bold outline-black outline-2"
      >
        Gründlicher Entwickler
      </h1>
      <p className="text-slate-300 bg-black md:text-sm py-3">
        Developer with a passion for technology and creativity. Maths graduate
        currently pursuing my career in full-stack software development.
        Motivated by the potential of technology to drive positive change, and
        also the opportunity to be creative in and out of work
      </p>
      <p className="text-white my-2 italic bg-black max-w-72">
        View my CV/Lebenslauf
        <a
          href="/cv.pdf"
          target="_blank"
          rel="noreferrer"
          className="ml-2 font-mono text-yellow-200 hover:text-yellow-500"
        >
          here
        </a>
      </p>
      <h2 className="text-lg text-white py-2 font-bold">Find Me</h2>
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
            imageSrc="images/logos/opensea.jpg"
            linkTarget="https://opensea.io/hologjm"
            text="OpenSea"
          />
        </tbody>
      </table>
      <h2 className="text-lg text-white py-2 mt-4 font-bold">
        Hit Me Up about..
      </h2>
      <div>
        {fascinations.map((item: Fascination) => (
          <FascinationBar key={item.name} {...item} />
        ))}
      </div>
      <div className="py-2 max-w-sm w-full border-orange-400 text-orange-400 text-sm bg-black font-bold my-4">
        <img
          className="inline mx-2"
          alt="Spotify logo"
          src="images/logos/spotify-16.png"
        />
        <p className="inline text-orange-400 text-sm font-bold">
          21 pilots, Alligatoah, Prince
        </p>
      </div>
      <QuoteFinder />
    </>
  );
}

import { useEffect, useRef, useState } from "react";

import type { Panel } from "./types";
import MenuButton from "./components/MenuButton";
import HomePanel from "./components/HomePanel";
import CareerPanel from "./components/CareerPanel";
import ProjectsPanel from "./components/ProjectsPanel";
import SkillsPanel from "./components/SkillsPanel";
import loadBackground from "./helpers/loadBackground";

export default function App(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [panel, setPanel] = useState<Panel>("home");

  useEffect(() => {
    if (canvasRef.current) {
      loadBackground(canvasRef.current, window, document);
    }
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed top-0 left-0"></canvas>
      <main className="relative w-3/4 font-mono">
        <div className="absolute left-0 top-20 p-6">
          <div className="py-4">
            <MenuButton
              colour="orange-400"
              text="Home"
              isActive={panel === "home"}
              onClick={() => setPanel("home")}
            />
            <MenuButton
              colour="orange-600"
              text="Career Highlights"
              isActive={panel === "career"}
              onClick={() => setPanel("career")}
            />
            <MenuButton
              colour="yellow-500"
              text="Side Projects"
              isActive={panel === "projects"}
              onClick={() => setPanel("projects")}
            />
            <MenuButton
              colour="orange-400"
              text="Skills"
              isActive={panel === "skills"}
              onClick={() => setPanel("skills")}
            />
          </div>

          {panel === "home" && <HomePanel />}

          {panel === "career" && <CareerPanel />}

          {panel === "projects" && <ProjectsPanel />}

          {panel === "skills" && <SkillsPanel />}
        </div>
      </main>
      <footer>
        <div className="fixed bottom-0 left-0 h-[30px] z-30 bg-orange-600 w-full text-center text-black">
          <p className="my-1 font-mono text-xs">
            Solidarity with
            <strong className="mx-2">Trans Youth,</strong>
            <a
              href="https://genderedintelligence.co.uk/services/publicengagement/our-campaigns.html"
              className="underline"
            >
              find out more
            </a>
          </p>
        </div>
      </footer>
    </>
  );
}
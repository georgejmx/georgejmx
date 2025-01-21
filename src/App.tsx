import { useEffect, useRef, useState } from "react";

import type { Panel } from "./types";
import MenuButton from "./components/MenuButton";
import HomePanel from "./components/HomePanel";
import ProjectsPanel from "./components/ProjectsPanel";
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
      <main className="relative w-2/3">
        <div className="absolute left-0 top-20 p-6">
          <div className="py-4">
            <MenuButton
              colour="orange-400"
              text="Home"
              onClick={() => setPanel("home")}
            />
            <MenuButton
              colour="yellow-500"
              text="Projects"
              onClick={() => setPanel("projects")}
            />
          </div>

          {panel === "home" && <HomePanel />}

          {panel === "projects" && <ProjectsPanel />}
        </div>
      </main>
      <footer>
        <div className="fixed bottom-0 left-0 h-[30px] z-30 bg-orange-600 w-full text-center text-black">
          <p className="my-1 font-mono text-xs">
            Solidarity with
            <strong> Trans Youth</strong>,
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

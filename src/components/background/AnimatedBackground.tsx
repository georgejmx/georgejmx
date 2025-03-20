import { useEffect, useRef } from "react";

import loadBackground from "../../helpers/loadBackground";

export default function AnimatedBackground(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      loadBackground(canvasRef.current, window, document);
    }
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0" />;
}

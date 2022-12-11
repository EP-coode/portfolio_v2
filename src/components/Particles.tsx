import React, { useEffect, useRef, useState } from "react";
import { defaultConfig, ParticlesSystem } from "@ep44/particles-emmiter";

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particlesSystem, setParticlesSystem] =
    useState<ParticlesSystem | null>(null);
  const [isMouseOverCanvas, setIsMOuseOverCanvas] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const particlesSystem = new ParticlesSystem(canvasRef.current, {
      mouse: {
        ...defaultConfig.mouse,
        mass: 15,
      },
      ambientForce: [0.3,-0.4]
    });

    particlesSystem.setRespanw(true);
    particlesSystem.start();

    setParticlesSystem(particlesSystem);

    return () => {
      particlesSystem.stop();
      particlesSystem.dispose();
    };
  }, [canvasRef]);

  useEffect(() => {
    if (!particlesSystem) return;
    particlesSystem.setRespanw(isMouseOverCanvas);
  }, [particlesSystem, isMouseOverCanvas]);

  return (
    <canvas
      className="w-full h-full absolute z-10 md"
      ref={canvasRef}
      onMouseEnter={() => setIsMOuseOverCanvas(true)}
      onMouseLeave={() => setIsMOuseOverCanvas(false)}
    ></canvas>
  );
};

export default Particles;

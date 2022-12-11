import React, { useEffect, useRef, useState } from "react";
import { ParticlesSystem, defaultConfig, SpawnStrategy } from "@ep44/particles-emmiter";

const Particles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particlesSystem, setParticlesSystem] =
    useState<ParticlesSystem | null>(null);
  const [isMouseOverCanvas, setIsMOuseOverCanvas] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const particlesSystem = new ParticlesSystem(canvasRef.current, {
      particles: {
        ...defaultConfig.particles,
        count: 1000,
      },
    });

    particlesSystem.setRespanw(true);
    particlesSystem.start();

    setParticlesSystem(particlesSystem);

    return () => {
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

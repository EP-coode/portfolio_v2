import React, { useEffect, useRef, useState } from "react";
import {
  defaultConfig,
  ParticlesSystem,
  SpawnStrategy,
  ColorRangeSelection,
  LinearChange,
} from "@ep44/particles-emmiter";

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
        mass: 1000,
      },
      particles: {
        ...defaultConfig.particles,
        colorChangeStrategy: new ColorRangeSelection(
          [160, 100, 80],
          161,
          230,
          30
        ),
        spanwStrategy: SpawnStrategy.RANDOM,
        sizeChangeStrategy: new LinearChange(-1),
        avgMass: 2,
        respanwSpeedRange: 2,
        count: 500,
        respanwSizeRange: 5,
      },
      ambientForce: [0.02, -0.02],
      speed: 0.1,
      distanceScale: 0.05
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
    // if (!particlesSystem) return;
    // particlesSystem.setRespanw(isMouseOverCanvas);
  }, [particlesSystem, isMouseOverCanvas]);

  return (
    <canvas
      width={1920}
      height={1080}
      className="w-full h-full absolute z-10 md"
      ref={canvasRef}
      onMouseEnter={() => setIsMOuseOverCanvas(true)}
      onMouseLeave={() => setIsMOuseOverCanvas(false)}
    ></canvas>
  );
};

export default Particles;

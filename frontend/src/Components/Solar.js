import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";


const RotatingPlanet = ({ position, color, size, speed }) => {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * speed;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};


const SolarSystem = () => {
  const [key, setKey] = useState(0); 

  const handleContextLost = (event) => {
    event.preventDefault();
    console.warn("⚠️ WebGL Context Lost! Forcing a re-render...");
    setKey((prevKey) => prevKey + 1); 
  };

  useEffect(() => {
    const canvas = document.querySelector(".solar-canvas canvas");
    if (canvas) {
      canvas.addEventListener("webglcontextlost", handleContextLost);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("webglcontextlost", handleContextLost);
      }
    };
  }, []);

  return (
    <Canvas key={key} className="solar-canvas" camera={{ position: [0, 0, 5] }}>
      <Suspense fallback={null}>
        {/* Star background */}
        <Stars radius={100} depth={50} count={5000} factor={4} />
        <OrbitControls enableZoom={false} />

        {/* Sun */}
        <RotatingPlanet position={[0, 0, 0]} color="yellow" size={1.2} speed={0.3} />

        {/* Earth */}
        <RotatingPlanet position={[3, 0, 0]} color="blue" size={0.7} speed={5} />

        {/* Mars */}
        <RotatingPlanet position={[-3, 1, 0]} color="red" size={0.6} speed={6} />

        {/* Light Source */}
        <pointLight position={[0, 0, 0]} intensity={2} />
      </Suspense>
    </Canvas>
  );
};

export default SolarSystem;

// Backdrop is going to be backsplash behind the shirt
import React, { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

const Backdrop = () => {
  const shadows = useRef(); // We need to reference to that specific Shadows later on

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal // "temporal" means it's going to smooth out the edges of the shadow over time
      frames={60} // meaning the frames are going to render in 60 frames
      alphaTest={0.85} // "alphaTest" which is going to set the transparency of the shadows
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;

// import React from 'react'
// CameraRig for positioning of the Camera

import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";

import state from "../store";
import { useRef } from "react";

const CameraRig = ({ children }) => {
  // для приближения камеры
  const group = useRef();

  // implement rotation
  const snap = useSnapshot(state);

  // Need delta (means difference). This hook allows to execute code on every rendered frame (different effects update controls and other)
  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // set the initial position of the model
    let targetPosition = [-0.4, 0, 2];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5];
      else targetPosition = [0, 0, 2];
    }

    //set the model rotation smothly
    // 0 in array - z axis
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;

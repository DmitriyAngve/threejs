// import React from 'react'
// CameraRig for positioning of the Camera
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useSnapshot } from "valtio";

import state from "../store";

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

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    //set the model rotation smothly
    // 0 in array - z axis
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      // коэфициент сглаживания (затухания) - контролирует скорость изменения значения вращения
      delta // время прощеднее с предыдушего кадра анимации. применяется для вычисления изменения значения вращения в каждом кадре анимации
    );
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;

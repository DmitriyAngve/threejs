// import React from 'react'
import { Canvas } from "@react-three/fiber"; // fiber - для управления 3D сценами, а именно создание, обновление и анимации объектов three.js // drei - это набор готовых компонентов и утилит, которые упрощают создание и управление 3D-сценами с помощью React Three Fiber, а именно освещение, материалы, камеры, модели, текстуры
import { Environment, Center } from "@react-three/drei"; // Enviroment map providing a background and reflections to the objects in the scene // Center used to center the content within the scene. Helpful for aligning and positioning objects in the 3D space.

import Shirt from "./Shirt";
// import Backdrop from "./Backdrop";
import CameraRig from "./CameraRig";

const CanvasModel = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <CameraRig>
        {/* <Backdrop /> */}
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;

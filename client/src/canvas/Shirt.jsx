import React from "react";
// Actual shirt model

import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import state from "../store";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  return (
    <group>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry} // связывает геометрию футболки с соответствующим полем "geometry" в объекте "nodes.T_Shirt_male" - это экземпляр модели футболки из файла GLHF
        material={materials.lambert1} // связывает материал футболки с соответсвующим полем "lambert1" в объекте "materials"."materials.lambert1" - экземпляр материала, используемого для отображения футболки
        material-roughness={1} // шероховатость
        dispose={null} // указывает, что при удалении компонента, связанные ресурсы (гео-ия, мат-лы) не должныбыть автоматически освобождены
      ></mesh>
    </group>
  );
};

export default Shirt;

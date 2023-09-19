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

  // easing to apply the color smoothly and not dramatically - for this, use "useFrame" (it's for apply the color smoothly)
  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  );

  // key can it simply be a state. Recreate a string of the current state that we can pass in
  const stateString = JSON.stringify(snap);

  return (
    // With "key" React will render the model whenever the state changes
    <group key={stateString}>
      <mesh
        // eslint-disable-next-line
        castShadow
        // eslint-disable-next-line
        geometry={nodes.T_Shirt_male.geometry} // связывает геометрию футболки с соответствующим полем "geometry" в объекте "nodes.T_Shirt_male" - это экземпляр модели футболки из файла GLHF
        // eslint-disable-next-line
        material={materials.lambert1} // связывает материал футболки с соответсвующим полем "lambert1" в объекте "materials"."materials.lambert1" - экземпляр материала, используемого для отображения футболки
        // eslint-disable-next-line
        material-roughness={1} // шероховатость
        // eslint-disable-next-line
        dispose={null} // указывает, что при удалении компонента, связанные ресурсы (гео-ия, мат-лы) не должныбыть автоматически освобождены
      >
        {/* наложение текстуры на модель футболки */}
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]} // позиция наложения текстуры
            rotation={[0, 0, 0]} // поворот наложения
            scale={1} // масштаб
            map={fullTexture} // связываем текстуру ("fullTexture") с атрибутом "map" для наложения
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]} // позиция наложения текстуры
            rotation={[0, 0, 0]} // поворот наложения
            scale={0.15} // масштаб
            map={logoTexture} // связываем текстуру ("logoTexture") с атрибутом "map" для наложения
            anisotropy={16} // change the quality of the texture
            depthTest={false} // Параметр для рендеринга глубины в трехмерной сцене. Глубинное тестирование контролирует, какие пиксели рендерятся, основываясь на их глубине (расстоянии от камеры). При false все пиксели объекта рендерятся независимо от их глубины
            depthWrite={true} // Указывает, что запись в буфер глубины (depth buffer) разрешена. Буфер глубины используется для хранения информации о глубине каждого пикселя. Если установленно на true - то объекты будут записывать свою глубину в буфер глубины, что влияет на правильное отображение глубины и перекрытия объектов в сцене.
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;

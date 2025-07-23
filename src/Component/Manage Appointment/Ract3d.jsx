import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function DoctorModel() {
  const doctor = useGLTF('/doctor.glb');
  const teeth = useGLTF('/types_of_human_teeth.glb');

  return (
    <group>
      <primitive object={doctor.scene} scale={0.5} position={[-1.5, 0, 0]} />
      <primitive object={teeth.scene} scale={0.5} position={[1.5, 0, 0]} />
    </group>
  );
}

useGLTF.preload('/doctor.glb');
useGLTF.preload('/types_of_human_teeth.glb');

export default function Doctor3DView() {
  return (
    <div style={{ height: '500px' }}>
      <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 10, 5]} />
        <Suspense fallback={<span>Loading...</span>}>
          <DoctorModel />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

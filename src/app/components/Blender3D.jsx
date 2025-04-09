'use client'

import { Canvas, useLoader } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls } from '@react-three/drei'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js'

// Vinyl disc model component
function VinylModel() {
  const materials = useLoader(MTLLoader, '/models/Vinyl_disc.mtl')
  const obj = useLoader(OBJLoader, '/models/Vinyl_disc.obj', (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })

  return (
    <primitive 
      object={obj} 
      scale={1} 
      position={[0, 0, 0]} 
      rotation={[Math.PI / 2, 0, 0]}
    />
  )
}

// Loading fallback
function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial color="gray" wireframe />
    </mesh>
  )
}

export default function Scene3D() {
  return (
    <div className="h-[400px] w-full">
      <Canvas camera={{ position: [0, 5, 0], fov: 50 }}>
        <color attach="background" args={['#ffffff']} />
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <Suspense fallback={<Loader />}>
          <VinylModel />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  )
}
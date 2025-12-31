'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Suspense } from 'react'

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={300} depth={50} count={5000} factor={4} fade speed={1} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

export default function Home() {
  return (
    <div className="relative h-screen w-full">
      {/* Three.js Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* Welcome Overlay */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center px-6">
          <h1 className="text-6xl font-bold mb-4 text-white drop-shadow-lg">
            Welcome
          </h1>
          <p className="text-xl text-white/90 drop-shadow-md max-w-2xl">
            Explore my journey, work, and thoughts through this interactive experience
          </p>
        </div>
      </div>
    </div>
  )
}


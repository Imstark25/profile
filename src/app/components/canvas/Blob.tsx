'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'

export default function Blob({ route = '/', ...props }) {
  const mesh = useRef()
  const material = useRef()

  useFrame((state, delta) => {
    material.current.distort = THREE.MathUtils.lerp(material.current.distort, 0.4, 0.05)
  })
  return (
    <Sphere ref={mesh} args={[1, 128, 128]} {...props}>
      <MeshDistortMaterial ref={material} speed={5} distort={1} color={'#8352FD'} />
    </Sphere>
  )
}


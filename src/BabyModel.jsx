import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function BabyModel({
  gender = 'boy',
  skinColor = '#ffd7b5',
  clothesColor = '#b3e5fc',
  position = [0, 0, 0],
  rotation = 0,
  isWalking = false,
  preview = false
}) {
  const groupRef = useRef()
  const leftLegRef = useRef()
  const rightLegRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()
  const walkTime = useRef(0)

  // Animation for preview mode (rotate and bounce)
  useFrame((state, delta) => {
    if (preview && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }

    // Walking animation
    if (isWalking && !preview) {
      walkTime.current += delta * 8

      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = Math.sin(walkTime.current) * 0.3
        rightLegRef.current.rotation.x = -Math.sin(walkTime.current) * 0.3
      }

      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = -Math.sin(walkTime.current) * 0.2
        rightArmRef.current.rotation.x = Math.sin(walkTime.current) * 0.2
      }

      // Slight bounce
      if (groupRef.current) {
        groupRef.current.position.y = position[1] + Math.abs(Math.sin(walkTime.current)) * 0.05
      }
    } else if (groupRef.current && !preview) {
      groupRef.current.position.y = position[1]

      // Reset limbs to neutral position
      if (leftLegRef.current) leftLegRef.current.rotation.x = 0
      if (rightLegRef.current) rightLegRef.current.rotation.x = 0
      if (leftArmRef.current) leftArmRef.current.rotation.x = 0
      if (rightArmRef.current) rightArmRef.current.rotation.x = 0
    }

    // Update rotation
    if (groupRef.current && !preview) {
      groupRef.current.rotation.y = rotation
    }
  })

  const materials = useMemo(() => ({
    skin: new THREE.MeshStandardMaterial({
      color: skinColor,
      roughness: 0.8,
      metalness: 0.1
    }),
    clothes: new THREE.MeshStandardMaterial({
      color: clothesColor,
      roughness: 0.7,
      metalness: 0.0
    }),
    eye: new THREE.MeshStandardMaterial({
      color: '#000000',
      roughness: 0.3,
      metalness: 0.0
    }),
    hair: new THREE.MeshStandardMaterial({
      color: '#4a3728',
      roughness: 0.9,
      metalness: 0.0
    }),
    bow: new THREE.MeshStandardMaterial({
      color: '#ffb6c1',
      roughness: 0.5,
      metalness: 0.1
    })
  }), [skinColor, clothesColor])

  return (
    <group ref={groupRef} position={preview ? [0, 0, 0] : position}>
      {/* Head */}
      <mesh position={[0, 2.3, 0]} castShadow material={materials.skin}>
        <sphereGeometry args={[0.6, 32, 32]} />
      </mesh>

      {/* Hair */}
      {gender === 'boy' ? (
        // Short hair covering top
        <mesh position={[0, 2.6, 0]} castShadow material={materials.hair}>
          <sphereGeometry args={[0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        </mesh>
      ) : (
        // Pigtails with bows
        <>
          {/* Left pigtail */}
          <group position={[-0.5, 2.5, 0]}>
            <mesh castShadow material={materials.hair}>
              <sphereGeometry args={[0.2, 16, 16]} />
            </mesh>
            <mesh position={[0, 0.15, 0]} castShadow material={materials.bow}>
              <boxGeometry args={[0.15, 0.1, 0.3]} />
            </mesh>
            <mesh position={[0, 0.15, 0]} rotation={[0, Math.PI / 2, 0]} castShadow material={materials.bow}>
              <boxGeometry args={[0.15, 0.1, 0.3]} />
            </mesh>
          </group>

          {/* Right pigtail */}
          <group position={[0.5, 2.5, 0]}>
            <mesh castShadow material={materials.hair}>
              <sphereGeometry args={[0.2, 16, 16]} />
            </mesh>
            <mesh position={[0, 0.15, 0]} castShadow material={materials.bow}>
              <boxGeometry args={[0.15, 0.1, 0.3]} />
            </mesh>
            <mesh position={[0, 0.15, 0]} rotation={[0, Math.PI / 2, 0]} castShadow material={materials.bow}>
              <boxGeometry args={[0.15, 0.1, 0.3]} />
            </mesh>
          </group>
        </>
      )}

      {/* Eyes */}
      <mesh position={[-0.2, 2.4, 0.5]} castShadow material={materials.eye}>
        <sphereGeometry args={[0.08, 16, 16]} />
      </mesh>
      <mesh position={[0.2, 2.4, 0.5]} castShadow material={materials.eye}>
        <sphereGeometry args={[0.08, 16, 16]} />
      </mesh>

      {/* Smile */}
      <mesh position={[0, 2.15, 0.55]}>
        <torusGeometry args={[0.15, 0.02, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Body (clothes) */}
      <mesh position={[0, 1.2, 0]} castShadow material={materials.clothes}>
        <cylinderGeometry args={[0.5, 0.6, 1.4, 32]} />
      </mesh>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.6, 1.5, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow material={materials.skin}>
          <cylinderGeometry args={[0.12, 0.12, 0.6, 16]} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.6, 1.5, 0]}>
        <mesh position={[0, -0.3, 0]} castShadow material={materials.skin}>
          <cylinderGeometry args={[0.12, 0.12, 0.6, 16]} />
        </mesh>
      </group>

      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.25, 0.5, 0]}>
        <mesh position={[0, -0.25, 0]} castShadow material={materials.skin}>
          <cylinderGeometry args={[0.15, 0.15, 0.5, 16]} />
        </mesh>
        {/* Left Foot */}
        <mesh position={[0, -0.55, 0.1]} castShadow material={materials.skin}>
          <boxGeometry args={[0.2, 0.1, 0.3]} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.25, 0.5, 0]}>
        <mesh position={[0, -0.25, 0]} castShadow material={materials.skin}>
          <cylinderGeometry args={[0.15, 0.15, 0.5, 16]} />
        </mesh>
        {/* Right Foot */}
        <mesh position={[0, -0.55, 0.1]} castShadow material={materials.skin}>
          <boxGeometry args={[0.2, 0.1, 0.3]} />
        </mesh>
      </group>
    </group>
  )
}

export default BabyModel

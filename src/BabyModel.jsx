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
  isCrying = false,
  preview = false
}) {
  const groupRef = useRef()
  const leftLegRef = useRef()
  const rightLegRef = useRef()
  const leftArmRef = useRef()
  const rightArmRef = useRef()
  const headRef = useRef()
  const mouthRef = useRef()
  const leftEyeRef = useRef()
  const rightEyeRef = useRef()
  const leftTearRef = useRef()
  const rightTearRef = useRef()
  const walkTime = useRef(0)
  const cryTime = useRef(0)

  // Animation for preview mode (rotate and bounce)
  useFrame((state, delta) => {
    if (preview && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.1
    }

    // Crying animation
    if (isCrying && !preview) {
      cryTime.current += delta * 10

      // Head shake
      if (headRef.current) {
        headRef.current.rotation.z = Math.sin(cryTime.current) * 0.1
      }

      // Mouth open/close for crying
      if (mouthRef.current) {
        mouthRef.current.rotation.x = Math.PI + Math.sin(cryTime.current * 2) * 0.2
      }

      // Eyes squint
      if (leftEyeRef.current && rightEyeRef.current) {
        const squintScale = 1 + Math.sin(cryTime.current * 2) * 0.3
        leftEyeRef.current.scale.y = squintScale
        rightEyeRef.current.scale.y = squintScale
      }

      // Tears fall
      if (leftTearRef.current && rightTearRef.current) {
        leftTearRef.current.position.y = 0.5 - (cryTime.current % 2) * 0.5
        rightTearRef.current.position.y = 0.5 - ((cryTime.current + 1) % 2) * 0.5
        leftTearRef.current.visible = true
        rightTearRef.current.visible = true
      }

      // Arms up to face (crying gesture)
      if (leftArmRef.current && rightArmRef.current) {
        leftArmRef.current.rotation.x = -Math.PI / 3
        leftArmRef.current.rotation.z = -Math.PI / 6
        rightArmRef.current.rotation.x = -Math.PI / 3
        rightArmRef.current.rotation.z = Math.PI / 6
      }

      // Body shake
      if (groupRef.current) {
        groupRef.current.position.x = position[0] + Math.sin(cryTime.current * 3) * 0.03
        groupRef.current.position.y = position[1] + Math.abs(Math.sin(cryTime.current * 2)) * 0.05
      }
    } else {
      // Reset crying animation
      if (headRef.current) headRef.current.rotation.z = 0
      if (mouthRef.current) mouthRef.current.rotation.x = Math.PI
      if (leftEyeRef.current) leftEyeRef.current.scale.y = 1
      if (rightEyeRef.current) rightEyeRef.current.scale.y = 1
      if (leftTearRef.current) leftTearRef.current.visible = false
      if (rightTearRef.current) rightTearRef.current.visible = false
    }

    // Walking animation (only if not crying)
    if (isWalking && !preview && !isCrying) {
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
    } else if (groupRef.current && !preview && !isCrying) {
      groupRef.current.position.y = position[1]
      groupRef.current.position.x = position[0]

      // Reset limbs to neutral position
      if (leftLegRef.current) leftLegRef.current.rotation.x = 0
      if (rightLegRef.current) rightLegRef.current.rotation.x = 0
      if (leftArmRef.current) {
        leftArmRef.current.rotation.x = 0
        leftArmRef.current.rotation.z = 0
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.x = 0
        rightArmRef.current.rotation.z = 0
      }
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
      <group ref={headRef} position={[0, 2.3, 0]}>
        <mesh castShadow material={materials.skin}>
          <sphereGeometry args={[0.6, 32, 32]} />
        </mesh>
      </group>

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
      <mesh ref={leftEyeRef} position={[-0.2, 2.4, 0.5]} castShadow material={materials.eye}>
        <sphereGeometry args={[0.08, 16, 16]} />
      </mesh>
      <mesh ref={rightEyeRef} position={[0.2, 2.4, 0.5]} castShadow material={materials.eye}>
        <sphereGeometry args={[0.08, 16, 16]} />
      </mesh>

      {/* Tears */}
      <mesh ref={leftTearRef} position={[-0.2, 2.2, 0.55]} visible={false}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.7} />
      </mesh>
      <mesh ref={rightTearRef} position={[0.2, 2.2, 0.55]} visible={false}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#87ceeb" transparent opacity={0.7} />
      </mesh>

      {/* Mouth (crying when rotated) */}
      <mesh ref={mouthRef} position={[0, 2.15, 0.55]} rotation={[Math.PI, 0, 0]}>
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

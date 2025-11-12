import * as THREE from 'three'

function Bathroom() {
  const roomZ = 20

  return (
    <group position={[0, 0, roomZ]}>
      {/* Floor - Checkered Pattern */}
      {[...Array(10)].map((_, row) =>
        [...Array(10)].map((_, col) => (
          <mesh
            key={`tile-${row}-${col}`}
            position={[-9 + col * 2, 0, -9 + row * 2]}
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[2, 2]} />
            <meshStandardMaterial color={(row + col) % 2 === 0 ? '#e0f7fa' : '#b3e5fc'} />
          </mesh>
        ))
      )}

      {/* Back Wall - Added for consistency */}
      <mesh position={[0, 5, -10]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#fffacd" />
      </mesh>

      {/* Left Wall - Removed for better visibility */}
      {/* <mesh position={[-10, 5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#fffacd" />
      </mesh> */}

      {/* Right Wall - Removed for better visibility */}
      {/* <mesh position={[10, 5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#fffacd" />
      </mesh> */}

      {/* Bathtub */}
      <group position={[-6, 0, -7]}>
        {/* Tub Body */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[2, 1, 3]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Inner Tub (Water) */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[1.8, 0.3, 2.8]} />
          <meshStandardMaterial color="#5ab9ea" transparent opacity={0.7} />
        </mesh>
        {/* Rubber Ducky */}
        <group position={[0.3, 1, 0.5]}>
          <mesh castShadow>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#ffe66d" />
          </mesh>
          <mesh position={[0, 0.08, 0.1]} castShadow>
            <coneGeometry args={[0.06, 0.1, 16]} />
            <meshStandardMaterial color="#ff8800" />
          </mesh>
        </group>
      </group>

      {/* Sink with Counter */}
      <group position={[6, 0, -8]}>
        {/* Counter */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[2, 0.1, 1]} />
          <meshStandardMaterial color="#8b6f47" />
        </mesh>
        {/* Cabinet */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[1.9, 0.7, 0.9]} />
          <meshStandardMaterial color="#6b5437" />
        </mesh>
        {/* Sink Basin */}
        <mesh position={[0, 0.75, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.25, 0.2, 32]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Faucet */}
        <mesh position={[0, 1, -0.3]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.3, 16]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} />
        </mesh>
        <mesh position={[0, 1.15, -0.15]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <torusGeometry args={[0.15, 0.03, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} />
        </mesh>
      </group>

      {/* Mirror */}
      <mesh position={[6, 3, -9.9]} castShadow>
        <boxGeometry args={[1.5, 2, 0.05]} />
        <meshStandardMaterial color="#8b6f47" />
      </mesh>
      <mesh position={[6, 3, -9.85]}>
        <planeGeometry args={[1.3, 1.8]} />
        <meshStandardMaterial color="#b3e5fc" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Toilet */}
      <group position={[2, 0, -8]}>
        {/* Bowl */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.35, 0.3, 0.8, 32]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Seat */}
        <mesh position={[0, 0.85, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
          <torusGeometry args={[0.3, 0.05, 16, 32]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Tank */}
        <mesh position={[0, 1.2, -0.35]} castShadow>
          <boxGeometry args={[0.6, 0.8, 0.3]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Shower Enclosure */}
      <group position={[-2, 0, -8]}>
        {/* Glass Walls */}
        <mesh position={[-0.5, 1, 0]} castShadow>
          <boxGeometry args={[0.05, 2, 1.5]} />
          <meshStandardMaterial color="#b3e5fc" transparent opacity={0.3} />
        </mesh>
        <mesh position={[0.5, 1, 0]} castShadow>
          <boxGeometry args={[0.05, 2, 1.5]} />
          <meshStandardMaterial color="#b3e5fc" transparent opacity={0.3} />
        </mesh>
        <mesh position={[0, 1, 0.7]} castShadow>
          <boxGeometry args={[1, 2, 0.05]} />
          <meshStandardMaterial color="#b3e5fc" transparent opacity={0.3} />
        </mesh>
        {/* Shower Head */}
        <mesh position={[0, 2.2, -0.6]} rotation={[Math.PI / 4, 0, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} />
        </mesh>
        {/* Shower Pipe */}
        <mesh position={[0, 1.5, -0.7]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 1.5, 16]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} />
        </mesh>
      </group>

      {/* Towel Rack with Towels */}
      <group position={[-8, 2, -6]}>
        {/* Rack */}
        <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 1.2, 16]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} />
        </mesh>
        {/* Towel 1 - Red */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0.3]} castShadow>
          <boxGeometry args={[0.05, 0.8, 0.5]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
        {/* Towel 2 - Blue */}
        <mesh position={[0.1, 0, 0.1]} rotation={[0, 0, -0.2]} castShadow>
          <boxGeometry args={[0.05, 0.8, 0.5]} />
          <meshStandardMaterial color="#4ecdc4" />
        </mesh>
        {/* Towel 3 - Yellow */}
        <mesh position={[-0.1, 0, -0.1]} rotation={[0, 0, 0.1]} castShadow>
          <boxGeometry args={[0.05, 0.8, 0.5]} />
          <meshStandardMaterial color="#ffe66d" />
        </mesh>
      </group>

      {/* Bath Mat */}
      <mesh position={[-4, 0.05, -4]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2, 1.5]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>

      {/* Laundry Basket */}
      <group position={[8, 0, -3]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.35, 0.8, 32]} />
          <meshStandardMaterial color="#8b6f47" />
        </mesh>
      </group>

      {/* Bathroom Scale */}
      <group position={[3, 0, -3]}>
        <mesh position={[0, 0.05, 0]} castShadow>
          <boxGeometry args={[0.6, 0.1, 0.6]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
        <mesh position={[0, 0.12, 0]} castShadow>
          <boxGeometry args={[0.5, 0.02, 0.5]} />
          <meshStandardMaterial color="#666666" />
        </mesh>
      </group>

      {/* Soap Dispenser on Sink Counter */}
      <mesh position={[5.5, 0.95, -8]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.25, 16]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>

      {/* Toothbrush Holder */}
      <group position={[6.5, 0.9, -8]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
          <meshStandardMaterial color="#ffb6c1" />
        </mesh>
        {/* Toothbrush 1 */}
        <mesh position={[-0.03, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
          <meshStandardMaterial color="#4ecdc4" />
        </mesh>
        {/* Toothbrush 2 */}
        <mesh position={[0.03, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.3, 8]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
      </group>
    </group>
  )
}

export default Bathroom

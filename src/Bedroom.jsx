import * as THREE from 'three'

function Bedroom({ toys, onToyCollect }) {
  const roomZ = 0

  return (
    <group position={[0, 0, roomZ]} rotation={[0, Math.PI, 0]} scale={[1.5, 1.5, 1.5]}>
      {/* Floor */}
      <mesh position={[0, 0, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f4d4a8" />
      </mesh>

      {/* Back Wall - Removed for open layout */}
      {/* <mesh position={[0, 5, -10]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#fff4e0" />
      </mesh> */}

      {/* Left Wall - Removed for better visibility */}
      {/* <mesh position={[-10, 5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#fff4e0" />
      </mesh> */}

      {/* Right Wall - Removed for better visibility */}
      {/* <mesh position={[10, 5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#fff4e0" />
      </mesh> */}

      {/* Large Bed */}
      <group position={[-5, 0, -7]}>
        {/* Bed Frame */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[3.5, 0.6, 4]} />
          <meshStandardMaterial color="#8b6f47" />
        </mesh>
        {/* Mattress */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[3.2, 0.4, 3.8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Pink Blanket */}
        <mesh position={[0, 1.05, 0.3]} castShadow>
          <boxGeometry args={[3.2, 0.1, 3]} />
          <meshStandardMaterial color="#ffb6c1" />
        </mesh>
        {/* Pillow 1 */}
        <mesh position={[-0.7, 1.2, -1.5]} castShadow>
          <boxGeometry args={[0.8, 0.2, 0.6]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        {/* Pillow 2 */}
        <mesh position={[0.7, 1.2, -1.5]} castShadow>
          <boxGeometry args={[0.8, 0.2, 0.6]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Nightstand with Lamp */}
      <group position={[-1.5, 0, -8.5]}>
        {/* Nightstand */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.8, 1, 0.8]} />
          <meshStandardMaterial color="#a67c52" />
        </mesh>
        {/* Lamp Base */}
        <mesh position={[0, 1.1, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.2, 0.3, 16]} />
          <meshStandardMaterial color="#4a3728" />
        </mesh>
        {/* Lamp Shade - Glowing */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.15, 0.4, 16]} />
          <meshStandardMaterial color="#ffe66d" emissive="#ffe66d" emissiveIntensity={0.5} />
        </mesh>
        <pointLight position={[0, 1.5, 0]} intensity={0.5} color="#ffe66d" distance={5} />
      </group>

      {/* Dresser */}
      <group position={[5.5, 0, -8.5]}>
        {/* Main Body */}
        <mesh position={[0, 1, 0]} castShadow>
          <boxGeometry args={[2.5, 2, 1]} />
          <meshStandardMaterial color="#8b6f47" />
        </mesh>
        {/* Drawer 1 */}
        <mesh position={[0, 1.6, 0.52]} castShadow>
          <boxGeometry args={[2.2, 0.5, 0.05]} />
          <meshStandardMaterial color="#a67c52" />
        </mesh>
        {/* Drawer 2 */}
        <mesh position={[0, 1, 0.52]} castShadow>
          <boxGeometry args={[2.2, 0.5, 0.05]} />
          <meshStandardMaterial color="#a67c52" />
        </mesh>
        {/* Drawer 3 */}
        <mesh position={[0, 0.4, 0.52]} castShadow>
          <boxGeometry args={[2.2, 0.5, 0.05]} />
          <meshStandardMaterial color="#a67c52" />
        </mesh>
        {/* Knob 1 */}
        <mesh position={[0, 1.6, 0.58]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ffd700" metalness={0.8} />
        </mesh>
        {/* Knob 2 */}
        <mesh position={[0, 1, 0.58]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ffd700" metalness={0.8} />
        </mesh>
        {/* Knob 3 */}
        <mesh position={[0, 0.4, 0.58]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ffd700" metalness={0.8} />
        </mesh>
      </group>

      {/* Pink Toy Chest - Target for storing toys */}
      <group position={[6, 0, -3]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[1.5, 1, 1]} />
          <meshStandardMaterial color="#ffb6c1" />
        </mesh>
        {/* Lid */}
        <mesh position={[0, 1.05, 0]} rotation={[-0.3, 0, 0]} castShadow>
          <boxGeometry args={[1.5, 0.1, 1.05]} />
          <meshStandardMaterial color="#ff9db3" />
        </mesh>
      </group>

      {/* Rocking Chair */}
      <group position={[7.5, 0, -6.5]}>
        {/* Seat */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.8, 0.1, 0.8]} />
          <meshStandardMaterial color="#8b6f47" />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 1.2, -0.35]} castShadow>
          <boxGeometry args={[0.8, 1.5, 0.1]} />
          <meshStandardMaterial color="#8b6f47" />
        </mesh>
        {/* Rocker 1 */}
        <mesh position={[0, 0.1, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <torusGeometry args={[0.5, 0.05, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#6b5437" />
        </mesh>
      </group>

      {/* Wall Shelf with Books and Teddy */}
      <group position={[0, 4, -9.8]}>
        {/* Shelf */}
        <mesh castShadow>
          <boxGeometry args={[3, 0.1, 0.4]} />
          <meshStandardMaterial color="#a67c52" />
        </mesh>
        {/* Books */}
        <mesh position={[-1, 0.25, 0]} castShadow>
          <boxGeometry args={[0.15, 0.4, 0.3]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
        <mesh position={[-0.7, 0.25, 0]} castShadow>
          <boxGeometry args={[0.15, 0.4, 0.3]} />
          <meshStandardMaterial color="#4ecdc4" />
        </mesh>
        <mesh position={[-0.4, 0.25, 0]} castShadow>
          <boxGeometry args={[0.15, 0.4, 0.3]} />
          <meshStandardMaterial color="#ffe66d" />
        </mesh>
        <mesh position={[-0.1, 0.25, 0]} castShadow>
          <boxGeometry args={[0.15, 0.4, 0.3]} />
          <meshStandardMaterial color="#95e1d3" />
        </mesh>
        <mesh position={[0.2, 0.25, 0]} castShadow>
          <boxGeometry args={[0.15, 0.4, 0.3]} />
          <meshStandardMaterial color="#d4a5d4" />
        </mesh>
        {/* Teddy Bear */}
        <group position={[1, 0.3, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#8b6f47" />
          </mesh>
          <mesh position={[0, -0.2, 0]} castShadow>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#8b6f47" />
          </mesh>
        </group>
      </group>

      {/* Picture Frames on Wall - Symmetrical */}
      <mesh position={[-5, 4.5, -9.9]} castShadow>
        <boxGeometry args={[1, 1.2, 0.05]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>
      <mesh position={[5, 4.5, -9.9]} castShadow>
        <boxGeometry args={[1, 1.2, 0.05]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>
      <mesh position={[-7.5, 3.5, -9.9]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.05]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>
      <mesh position={[7.5, 3.5, -9.9]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.05]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>

      {/* Large Pink Rug - Centered */}
      <mesh position={[0, 0.05, -3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[7, 6]} />
        <meshStandardMaterial color="#ffb6c1" />
      </mesh>

      {/* 8 Scattered Toys */}
      {toys.map((toy) => (
        <mesh
          key={toy.id}
          position={toy.position}
          castShadow
          userData={{ toyId: toy.id }}
        >
          {toy.shape === 'box' && <boxGeometry args={[0.3, 0.3, 0.3]} />}
          {toy.shape === 'sphere' && <sphereGeometry args={[0.2, 16, 16]} />}
          {toy.shape === 'pyramid' && <coneGeometry args={[0.2, 0.4, 4]} />}
          {toy.shape === 'cylinder' && <cylinderGeometry args={[0.15, 0.15, 0.3, 16]} />}
          <meshStandardMaterial color={toy.color} />
        </mesh>
      ))}
    </group>
  )
}

export default Bedroom

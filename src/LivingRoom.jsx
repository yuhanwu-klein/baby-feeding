import * as THREE from 'three'

function LivingRoom() {
  const roomZ = 10

  return (
    <group position={[0, 0, roomZ]}>
      {/* Floor */}
      <mesh position={[0, 0, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#e8c89c" />
      </mesh>

      {/* Back Wall - Added for consistency */}
      <mesh position={[0, 5, -10]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#fff9ed" />
      </mesh>

      {/* Left Wall - Removed for better visibility */}
      {/* <mesh position={[-10, 5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#fff9ed" />
      </mesh> */}

      {/* Right Wall - Removed for better visibility */}
      {/* <mesh position={[10, 5, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#fff9ed" />
      </mesh> */}

      {/* Large Blue Sofa */}
      <group position={[0, 0, -7]}>
        {/* Base */}
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[4, 0.8, 1.5]} />
          <meshStandardMaterial color="#5a9fd4" />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 1.2, -0.6]} castShadow>
          <boxGeometry args={[4, 1.6, 0.3]} />
          <meshStandardMaterial color="#5a9fd4" />
        </mesh>
        {/* Left Armrest */}
        <mesh position={[-1.85, 0.8, 0]} castShadow>
          <boxGeometry args={[0.3, 1.2, 1.5]} />
          <meshStandardMaterial color="#5a9fd4" />
        </mesh>
        {/* Right Armrest */}
        <mesh position={[1.85, 0.8, 0]} castShadow>
          <boxGeometry args={[0.3, 1.2, 1.5]} />
          <meshStandardMaterial color="#5a9fd4" />
        </mesh>

        {/* 5 Colorful Cushions */}
        <mesh position={[-1.2, 0.85, 0]} rotation={[0, 0, -0.2]} castShadow>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
        <mesh position={[-0.6, 0.85, 0]} rotation={[0, 0, 0.1]} castShadow>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#ffe66d" />
        </mesh>
        <mesh position={[0, 0.85, 0]} rotation={[0, 0, -0.15]} castShadow>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#4ecdc4" />
        </mesh>
        <mesh position={[0.6, 0.85, 0]} rotation={[0, 0, 0.1]} castShadow>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#95e1d3" />
        </mesh>
        <mesh position={[1.2, 0.85, 0]} rotation={[0, 0, -0.2]} castShadow>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#d4a5d4" />
        </mesh>
      </group>

      {/* Coffee Table */}
      <group position={[0, 0, -4]}>
        {/* Tabletop */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[2, 0.1, 1.2]} />
          <meshStandardMaterial color="#8b6f47" />
        </mesh>
        {/* Leg 1 */}
        <mesh position={[-0.8, 0.25, -0.4]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
          <meshStandardMaterial color="#6b5437" />
        </mesh>
        {/* Leg 2 */}
        <mesh position={[0.8, 0.25, -0.4]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
          <meshStandardMaterial color="#6b5437" />
        </mesh>
        {/* Leg 3 */}
        <mesh position={[-0.8, 0.25, 0.4]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
          <meshStandardMaterial color="#6b5437" />
        </mesh>
        {/* Leg 4 */}
        <mesh position={[0.8, 0.25, 0.4]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
          <meshStandardMaterial color="#6b5437" />
        </mesh>
        {/* Decorative Vase */}
        <mesh position={[0, 0.75, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.1, 0.4, 16]} />
          <meshStandardMaterial color="#4ecdc4" />
        </mesh>
      </group>

      {/* TV and TV Stand */}
      <group position={[0, 0, -9.7]}>
        {/* TV Stand */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[3, 1, 0.8]} />
          <meshStandardMaterial color="#4a3728" />
        </mesh>
        {/* TV Screen - Glowing */}
        <mesh position={[0, 1.8, 0.3]} castShadow>
          <boxGeometry args={[2.5, 1.5, 0.1]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        {/* TV Glow */}
        <mesh position={[0, 1.8, 0.35]} castShadow>
          <planeGeometry args={[2.3, 1.3]} />
          <meshStandardMaterial color="#4a9fd8" emissive="#4a9fd8" emissiveIntensity={0.6} />
        </mesh>
        <pointLight position={[0, 1.8, 0.5]} intensity={0.8} color="#4a9fd8" distance={6} />
      </group>

      {/* Tall Bookshelf */}
      <group position={[-8, 0, -8]}>
        {/* Main Structure */}
        <mesh position={[0, 2, 0]} castShadow>
          <boxGeometry args={[1.2, 4, 0.4]} />
          <meshStandardMaterial color="#8b6f47" />
        </mesh>

        {/* Books on Shelf 1 */}
        {[...Array(5)].map((_, i) => (
          <mesh key={`s1-${i}`} position={[-0.4 + i * 0.2, 1, 0]} castShadow>
            <boxGeometry args={[0.12, 0.35, 0.25]} />
            <meshStandardMaterial color={['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#d4a5d4'][i]} />
          </mesh>
        ))}

        {/* Books on Shelf 2 */}
        {[...Array(6)].map((_, i) => (
          <mesh key={`s2-${i}`} position={[-0.5 + i * 0.18, 2, 0]} castShadow>
            <boxGeometry args={[0.12, 0.35, 0.25]} />
            <meshStandardMaterial color={['#ffb88c', '#b3e5fc', '#a5d4a5', '#ffb6c1', '#ffe66d', '#d4a5d4'][i]} />
          </mesh>
        ))}

        {/* Books on Shelf 3 */}
        {[...Array(5)].map((_, i) => (
          <mesh key={`s3-${i}`} position={[-0.4 + i * 0.2, 3, 0]} castShadow>
            <boxGeometry args={[0.12, 0.35, 0.25]} />
            <meshStandardMaterial color={['#4ecdc4', '#ff6b6b', '#95e1d3', '#ffe66d', '#ffb88c'][i]} />
          </mesh>
        ))}

        {/* Books on Shelf 4 */}
        {[...Array(6)].map((_, i) => (
          <mesh key={`s4-${i}`} position={[-0.5 + i * 0.18, 4, 0]} castShadow>
            <boxGeometry args={[0.12, 0.35, 0.25]} />
            <meshStandardMaterial color={['#d4a5d4', '#ffb6c1', '#b3e5fc', '#ffe66d', '#95e1d3', '#ff6b6b'][i]} />
          </mesh>
        ))}
      </group>

      {/* Orange Armchair */}
      <group position={[6, 0, -6]}>
        {/* Seat */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[1.2, 0.6, 1.2]} />
          <meshStandardMaterial color="#ffb88c" />
        </mesh>
        {/* Backrest */}
        <mesh position={[0, 1.2, -0.5]} castShadow>
          <boxGeometry args={[1.2, 1.4, 0.2]} />
          <meshStandardMaterial color="#ffb88c" />
        </mesh>
        {/* Left Armrest */}
        <mesh position={[-0.5, 0.8, 0]} castShadow>
          <boxGeometry args={[0.2, 0.8, 1.2]} />
          <meshStandardMaterial color="#ffb88c" />
        </mesh>
        {/* Right Armrest */}
        <mesh position={[0.5, 0.8, 0]} castShadow>
          <boxGeometry args={[0.2, 0.8, 1.2]} />
          <meshStandardMaterial color="#ffb88c" />
        </mesh>
      </group>

      {/* Floor Lamp */}
      <group position={[7, 0, -8]}>
        {/* Stand */}
        <mesh position={[0, 1, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 2, 16]} />
          <meshStandardMaterial color="#4a3728" />
        </mesh>
        {/* Base */}
        <mesh position={[0, 0.1, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.3, 0.2, 16]} />
          <meshStandardMaterial color="#4a3728" />
        </mesh>
        {/* Lampshade - Glowing */}
        <mesh position={[0, 2.3, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.3, 0.5, 16]} />
          <meshStandardMaterial color="#ffe66d" emissive="#ffe66d" emissiveIntensity={0.4} />
        </mesh>
        <pointLight position={[0, 2.3, 0]} intensity={0.6} color="#ffe66d" distance={6} />
      </group>

      {/* Side Table with Plant */}
      <group position={[8, 0, -3]}>
        {/* Table */}
        <mesh position={[0, 0.6, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 1.2, 16]} />
          <meshStandardMaterial color="#8b6f47" />
        </mesh>
        {/* Plant Pot */}
        <mesh position={[0, 1.3, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.15, 0.3, 16]} />
          <meshStandardMaterial color="#ff6b6b" />
        </mesh>
        {/* Plant Leaves */}
        <mesh position={[0, 1.6, 0]} castShadow>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial color="#4d9c4d" />
        </mesh>
      </group>

      {/* Large Wall Art Frame */}
      <mesh position={[0, 4, -9.9]} castShadow>
        <boxGeometry args={[2, 1.5, 0.05]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>
      <mesh position={[0, 4, -9.85]} castShadow>
        <planeGeometry args={[1.8, 1.3]} />
        <meshStandardMaterial color="#4ecdc4" />
      </mesh>

      {/* Pink Rug */}
      <mesh position={[0, 0.05, -3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[5, 6]} />
        <meshStandardMaterial color="#ffb6c1" />
      </mesh>
    </group>
  )
}

export default LivingRoom

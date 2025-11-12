import * as THREE from 'three'

function CombinedRoom({ toys }) {
  return (
    <group rotation={[0, Math.PI, 0]} scale={[1.5, 1.5, 1.5]}>
      {/* Large Combined Floor - covers all three rooms */}
      <mesh position={[0, 0, 10]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 60]} />
        <meshStandardMaterial color="#e8c89c" />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 5, -20]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#fff4e0" />
      </mesh>

      {/* Front Wall */}
      <mesh position={[0, 5, 40]} rotation={[0, Math.PI, 0]} receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#fff9ed" />
      </mesh>

      {/* Left Wall */}
      <mesh position={[-10, 5, 10]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[60, 10]} />
        <meshStandardMaterial color="#fff4e0" />
      </mesh>

      {/* Right Wall */}
      <mesh position={[10, 5, 10]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <planeGeometry args={[60, 10]} />
        <meshStandardMaterial color="#fff4e0" />
      </mesh>

      {/* ========== BEDROOM AREA (Z: -10 to 10) ========== */}

      {/* Large Bed */}
      <group position={[-5, 0, -7]}>
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[3.5, 0.6, 4]} />
          <meshStandardMaterial color="#8b6f47" />
        </mesh>
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[3.2, 0.4, 3.8]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 1.05, 0.3]} castShadow>
          <boxGeometry args={[3.2, 0.1, 3]} />
          <meshStandardMaterial color="#ffb6c1" />
        </mesh>
        <mesh position={[-0.7, 1.2, -1.5]} castShadow>
          <boxGeometry args={[0.8, 0.2, 0.6]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0.7, 1.2, -1.5]} castShadow>
          <boxGeometry args={[0.8, 0.2, 0.6]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Nightstand with Lamp */}
      <group position={[-1.5, 0, -8.5]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.8, 1, 0.8]} />
          <meshStandardMaterial color="#a67c52" />
        </mesh>
        <mesh position={[0, 1.1, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.2, 0.3, 16]} />
          <meshStandardMaterial color="#4a3728" />
        </mesh>
        <mesh position={[0, 1.5, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.15, 0.4, 16]} />
          <meshStandardMaterial color="#ffe66d" emissive="#ffe66d" emissiveIntensity={0.5} />
        </mesh>
        <pointLight position={[0, 1.5, 0]} intensity={0.5} color="#ffe66d" distance={5} />
      </group>

      {/* Dresser */}
      <group position={[5.5, 0, -8.5]}>
        <mesh position={[0, 1, 0]} castShadow>
          <boxGeometry args={[2.5, 2, 1]} />
          <meshStandardMaterial color="#8b6f47" />
        </mesh>
        <mesh position={[0, 1.6, 0.52]} castShadow>
          <boxGeometry args={[2.2, 0.5, 0.05]} />
          <meshStandardMaterial color="#a67c52" />
        </mesh>
        <mesh position={[0, 1, 0.52]} castShadow>
          <boxGeometry args={[2.2, 0.5, 0.05]} />
          <meshStandardMaterial color="#a67c52" />
        </mesh>
        <mesh position={[0, 0.4, 0.52]} castShadow>
          <boxGeometry args={[2.2, 0.5, 0.05]} />
          <meshStandardMaterial color="#a67c52" />
        </mesh>
      </group>

      {/* Pink Toy Chest */}
      <group position={[6, 0, -3]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[1.5, 1, 1]} />
          <meshStandardMaterial color="#ffb6c1" />
        </mesh>
        <mesh position={[0, 1.05, 0]} rotation={[-0.3, 0, 0]} castShadow>
          <boxGeometry args={[1.5, 0.1, 1.05]} />
          <meshStandardMaterial color="#ff9db3" />
        </mesh>
      </group>

      {/* Wall Shelf */}
      <group position={[0, 4, -9.95]}>
        <mesh castShadow>
          <boxGeometry args={[3, 0.1, 0.4]} />
          <meshStandardMaterial color="#a67c52" />
        </mesh>
        {[-1, -0.7, -0.4, -0.1, 0.2].map((x, i) => (
          <mesh key={i} position={[x, 0.25, 0]} castShadow>
            <boxGeometry args={[0.15, 0.4, 0.3]} />
            <meshStandardMaterial color={['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#d4a5d4'][i]} />
          </mesh>
        ))}
      </group>

      {/* Picture Frames */}
      <mesh position={[-5, 4.5, -9.95]} castShadow>
        <boxGeometry args={[1, 1.2, 0.05]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>
      <mesh position={[5, 4.5, -9.95]} castShadow>
        <boxGeometry args={[1, 1.2, 0.05]} />
        <meshStandardMaterial color="#4a3728" />
      </mesh>

      {/* Pink Rug */}
      <mesh position={[0, 0.05, -3]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[7, 6]} />
        <meshStandardMaterial color="#ffb6c1" />
      </mesh>

      {/* ========== LIVING ROOM AREA (Z: 10 to 30) ========== */}

      {/* Blue Sofa */}
      <group position={[0, 0, 3]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <boxGeometry args={[4, 0.8, 1.5]} />
          <meshStandardMaterial color="#5a9fd4" />
        </mesh>
        <mesh position={[0, 1.2, -0.6]} castShadow>
          <boxGeometry args={[4, 1.6, 0.3]} />
          <meshStandardMaterial color="#5a9fd4" />
        </mesh>
        {[-1.2, -0.6, 0, 0.6, 1.2].map((x, i) => (
          <mesh key={i} position={[x, 0.85, 0]} rotation={[0, 0, (i % 2 ? 0.1 : -0.15)]} castShadow>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial color={['#ff6b6b', '#ffe66d', '#4ecdc4', '#95e1d3', '#d4a5d4'][i]} />
          </mesh>
        ))}
      </group>

      {/* Coffee Table */}
      <group position={[0, 0, 6]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[2, 0.1, 1.2]} />
          <meshStandardMaterial color="#8b6f47" />
        </mesh>
        <mesh position={[0, 0.75, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.1, 0.4, 16]} />
          <meshStandardMaterial color="#4ecdc4" />
        </mesh>
      </group>

      {/* TV Stand */}
      <group position={[0, 0, 0.5]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[3, 1, 0.8]} />
          <meshStandardMaterial color="#4a3728" />
        </mesh>
        <mesh position={[0, 1.8, 0.3]} castShadow>
          <boxGeometry args={[2.5, 1.5, 0.1]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0, 1.8, 0.35]} castShadow>
          <planeGeometry args={[2.3, 1.3]} />
          <meshStandardMaterial color="#4a9fd8" emissive="#4a9fd8" emissiveIntensity={0.6} />
        </mesh>
        <pointLight position={[0, 1.8, 0.5]} intensity={0.8} color="#4a9fd8" distance={6} />
      </group>

      {/* Bookshelf */}
      <group position={[-8, 0, 2]}>
        <mesh position={[0, 2, 0]} castShadow>
          <boxGeometry args={[1.2, 4, 0.4]} />
          <meshStandardMaterial color="#8b6f47" />
        </mesh>
      </group>

      {/* Orange Armchair */}
      <group position={[6, 0, 4]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[1.2, 0.6, 1.2]} />
          <meshStandardMaterial color="#ffb88c" />
        </mesh>
        <mesh position={[0, 1.2, -0.5]} castShadow>
          <boxGeometry args={[1.2, 1.4, 0.2]} />
          <meshStandardMaterial color="#ffb88c" />
        </mesh>
      </group>

      {/* ========== BATHROOM AREA (Z: 30 to 50) ========== */}

      {/* Checkered Floor */}
      {[...Array(10)].map((_, row) =>
        [...Array(10)].map((_, col) => (
          <mesh
            key={`tile-${row}-${col}`}
            position={[-9 + col * 2, 0.01, 31 + row * 2]}
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[2, 2]} />
            <meshStandardMaterial color={(row + col) % 2 === 0 ? '#e0f7fa' : '#b3e5fc'} />
          </mesh>
        ))
      )}

      {/* Bathtub */}
      <group position={[-6, 0, 33]}>
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[2, 1, 3]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[1.8, 0.3, 2.8]} />
          <meshStandardMaterial color="#5ab9ea" transparent opacity={0.7} />
        </mesh>
      </group>

      {/* Sink */}
      <group position={[6, 0, 32]}>
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[2, 0.1, 1]} />
          <meshStandardMaterial color="#8b6f47" />
        </mesh>
        <mesh position={[0, 0.75, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.25, 0.2, 32]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Toilet */}
      <group position={[2, 0, 32]}>
        <mesh position={[0, 0.4, 0]} castShadow>
          <cylinderGeometry args={[0.35, 0.3, 0.8, 32]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[0, 1.2, -0.35]} castShadow>
          <boxGeometry args={[0.6, 0.8, 0.3]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>

      {/* Shower */}
      <group position={[-2, 0, 32]}>
        <mesh position={[-0.5, 1, 0]} castShadow>
          <boxGeometry args={[0.05, 2, 1.5]} />
          <meshStandardMaterial color="#b3e5fc" transparent opacity={0.3} />
        </mesh>
        <mesh position={[0.5, 1, 0]} castShadow>
          <boxGeometry args={[0.05, 2, 1.5]} />
          <meshStandardMaterial color="#b3e5fc" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* 8 Scattered Toys */}
      {toys.map((toy) => (
        <mesh
          key={toy.id}
          position={toy.position}
          castShadow
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

export default CombinedRoom

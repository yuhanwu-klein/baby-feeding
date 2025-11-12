import { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import BabyModel from './BabyModel'
import CombinedRoom from './CombinedRoom'

// Initial toys setup
const initialToys = [
  { id: 1, position: [-2, 0.15, -3], shape: 'box', color: '#ff6b6b', collected: false },
  { id: 2, position: [3, 0.1, -2], shape: 'sphere', color: '#4ecdc4', collected: false },
  { id: 3, position: [-4, 0.2, -5], shape: 'pyramid', color: '#ffe66d', collected: false },
  { id: 4, position: [2, 0.15, -6], shape: 'cylinder', color: '#95e1d3', collected: false },
  { id: 5, position: [-6, 0.15, -2], shape: 'box', color: '#d4a5d4', collected: false },
  { id: 6, position: [4, 0.1, -8], shape: 'sphere', color: '#ffb88c', collected: false },
  { id: 7, position: [1, 0.2, -1], shape: 'pyramid', color: '#b3e5fc', collected: false },
  { id: 8, position: [-3, 0.15, -7], shape: 'cylinder', color: '#ffb6c1', collected: false }
]

function CameraController({ babyPosition }) {
  const { camera } = useThree()

  useFrame(() => {
    // Fixed third-person camera with stable position
    const cameraOffset = new THREE.Vector3(0, 12, 18)
    const targetPosition = new THREE.Vector3(
      babyPosition[0] + cameraOffset.x,
      babyPosition[1] + cameraOffset.y,
      babyPosition[2] + cameraOffset.z
    )

    camera.position.lerp(targetPosition, 0.05)
    camera.lookAt(babyPosition[0], babyPosition[1] + 1, babyPosition[2])
  })

  return null
}

function GameScene({ babyConfig, toys, babyPosition, babyRotation, isWalking, isCrying }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[10, 15, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />

      {/* Point Lights for warmth and brightness - adjusted for larger room */}
      {/* Bedroom lights */}
      <pointLight position={[-8, 8, -8]} intensity={1.0} color="#fff5e6" distance={30} />
      <pointLight position={[8, 8, -8]} intensity={1.0} color="#fff5e6" distance={30} />

      {/* Living Room lights */}
      <pointLight position={[-8, 8, 10]} intensity={1.0} color="#fff5e6" distance={30} />
      <pointLight position={[8, 8, 10]} intensity={1.0} color="#fff5e6" distance={30} />

      {/* Bathroom lights */}
      <pointLight position={[-8, 8, 20]} intensity={1.0} color="#fff5e6" distance={30} />
      <pointLight position={[8, 8, 20]} intensity={1.0} color="#fff5e6" distance={30} />

      {/* Ceiling lights for overall brightness */}
      <pointLight position={[0, 12, -8]} intensity={1.2} color="#ffffff" distance={35} />
      <pointLight position={[0, 12, 10]} intensity={1.2} color="#ffffff" distance={35} />
      <pointLight position={[0, 12, 20]} intensity={1.2} color="#ffffff" distance={35} />

      {/* Baby Character */}
      <BabyModel
        gender={babyConfig.gender}
        skinColor={babyConfig.skinColor}
        clothesColor={babyConfig.clothesColor}
        hairStyle={babyConfig.hairStyle}
        position={babyPosition}
        rotation={babyRotation}
        isWalking={isWalking}
        isCrying={isCrying}
      />

      {/* Combined Room */}
      <CombinedRoom toys={toys.filter(t => !t.collected)} />

      {/* Camera Controller */}
      <CameraController babyPosition={babyPosition} />
    </>
  )
}

function GameplayScreen({ babyConfig, onBackHome }) {
  const [babyPosition, setBabyPosition] = useState([0, 0, 5])
  const [babyRotation, setBabyRotation] = useState(Math.PI)
  const [isWalking, setIsWalking] = useState(false)
  const [isCrying, setIsCrying] = useState(false)
  const [toys, setToys] = useState(initialToys)
  const [toysInHand, setToysInHand] = useState(0)
  const [toysCollected, setToysCollected] = useState(0)
  const [currentRoom, setCurrentRoom] = useState('Bedroom')
  const [toast, setToast] = useState(null)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const [micEnabled, setMicEnabled] = useState(false)
  const audioRef = useRef(null)
  const micRef = useRef(null)
  const cryingSoundRef = useRef(null)

  const keysPressed = useRef({})

  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.key] = true

      // A key - Pick up toy
      if (e.key === 'a' || e.key === 'A') {
        handlePickupToy()
      }

      // B key - Store toys
      if (e.key === 'b' || e.key === 'B') {
        handleStoreToys()
      }
    }

    const handleKeyUp = (e) => {
      keysPressed.current[e.key] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [babyPosition, toys, toysInHand])

  // Movement update loop
  useEffect(() => {
    const moveSpeed = 0.1
    let animationId

    const updateMovement = () => {
      let moving = false
      let newX = babyPosition[0]
      let newZ = babyPosition[2]
      let newRotation = babyRotation

      if (keysPressed.current['ArrowUp']) {
        newZ -= moveSpeed
        newRotation = 0
        moving = true
      }
      if (keysPressed.current['ArrowDown']) {
        newZ += moveSpeed
        newRotation = Math.PI
        moving = true
      }
      if (keysPressed.current['ArrowLeft']) {
        newX -= moveSpeed
        newRotation = Math.PI / 2
        moving = true
      }
      if (keysPressed.current['ArrowRight']) {
        newX += moveSpeed
        newRotation = -Math.PI / 2
        moving = true
      }

      // Bounds checking (adjusted for combined room)
      newX = Math.max(-13, Math.min(13, newX))
      newZ = Math.max(-25, Math.min(55, newZ))

      if (moving) {
        setBabyPosition([newX, babyPosition[1], newZ])
        setBabyRotation(newRotation)
        setIsWalking(true)
      } else {
        setIsWalking(false)
      }

      // Update current room based on Z position
      if (newZ < 5) {
        setCurrentRoom('Bedroom')
      } else if (newZ < 15) {
        setCurrentRoom('Living Room')
      } else {
        setCurrentRoom('Bathroom')
      }

      animationId = requestAnimationFrame(updateMovement)
    }

    animationId = requestAnimationFrame(updateMovement)

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [babyPosition, babyRotation])

  const handlePickupToy = () => {
    // Transform toy position from room's local space to world space
    // Room has: scale [1.5, 1.5, 1.5] and rotation [0, Math.PI, 0]
    const transformToWorld = (localPos) => {
      // First apply scale
      const scaled = [localPos[0] * 1.5, localPos[1] * 1.5, localPos[2] * 1.5]
      // Then apply 180° rotation around Y axis: [x, y, z] -> [-x, y, -z]
      return [-scaled[0], scaled[1], -scaled[2]]
    }

    // Check if baby is near any toy (within 2 units)
    const nearbyToy = toys.find(toy => {
      if (toy.collected) return false
      const worldPos = transformToWorld(toy.position)
      const distance = Math.sqrt(
        Math.pow(worldPos[0] - babyPosition[0], 2) +
        Math.pow(worldPos[2] - babyPosition[2], 2)
      )
      return distance < 2
    })

    if (nearbyToy) {
      setToys(toys.map(t =>
        t.id === nearbyToy.id ? { ...t, collected: true } : t
      ))
      setToysInHand(toysInHand + 1)
      showToast('Toy picked up! 🎉')
    }
  }

  const handleStoreToys = () => {
    // Transform toy chest position from room's local space to world space
    // Local position: [6, 0, -3]
    // After scale 1.5x: [9, 0, -4.5]
    // After 180° rotation: [-9, 0, 4.5]
    const chestWorldPos = [-9, 0, 4.5]

    const chestDistance = Math.sqrt(
      Math.pow(chestWorldPos[0] - babyPosition[0], 2) +
      Math.pow(chestWorldPos[2] - babyPosition[2], 2)
    )

    if (chestDistance < 2 && toysInHand > 0) {
      const newCollected = toysCollected + toysInHand
      setToysCollected(newCollected)
      setToysInHand(0)
      showToast(`Stored ${toysInHand} toy(s)! 📦`)

      if (newCollected >= 8) {
        setTimeout(() => {
          showToast('🎊 Victory! All toys collected! 🎊', true)
        }, 500)
      }
    }
  }

  const showToast = (message, isVictory = false) => {
    setToast({ message, isVictory })
    setTimeout(() => setToast(null), 2000)
  }

  const toggleAudio = () => {
    if (!audioRef.current) {
      // Create white noise audio
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const bufferSize = 2 * audioContext.sampleRate
      const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
      const output = noiseBuffer.getChannelData(0)

      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1
      }

      const whiteNoise = audioContext.createBufferSource()
      whiteNoise.buffer = noiseBuffer
      whiteNoise.loop = true

      const filter = audioContext.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.value = 300

      const gainNode = audioContext.createGain()
      gainNode.gain.value = 0.1

      whiteNoise.connect(filter)
      filter.connect(gainNode)
      gainNode.connect(audioContext.destination)

      audioRef.current = { whiteNoise, audioContext }
    }

    if (audioEnabled) {
      audioRef.current.audioContext.suspend()
    } else {
      audioRef.current.whiteNoise.start(0)
      audioRef.current.audioContext.resume()
    }

    setAudioEnabled(!audioEnabled)
  }

  const toggleMicrophone = async () => {
    if (micEnabled) {
      // Stop microphone
      if (micRef.current) {
        micRef.current.stream.getTracks().forEach(track => track.stop())
        micRef.current.analyser.disconnect()
        micRef.current = null
      }
      setMicEnabled(false)
      setIsCrying(false)
    } else {
      // Start microphone
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const analyser = audioContext.createAnalyser()
        const microphone = audioContext.createMediaStreamSource(stream)

        analyser.smoothingTimeConstant = 0.8
        analyser.fftSize = 256

        microphone.connect(analyser)

        micRef.current = { stream, audioContext, analyser }
        setMicEnabled(true)
        showToast('🎤 Microphone activated! Make noise to make baby cry!')
      } catch (error) {
        console.error('Microphone access denied:', error)
        showToast('❌ Microphone access denied')
      }
    }
  }

  // Microphone audio detection
  useEffect(() => {
    if (!micEnabled || !micRef.current) return

    let animationId
    const dataArray = new Uint8Array(micRef.current.analyser.frequencyBinCount)

    const detectSound = () => {
      micRef.current.analyser.getByteFrequencyData(dataArray)

      // Calculate average volume
      const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length

      // Threshold for crying (adjustable)
      const cryThreshold = 30

      if (average > cryThreshold) {
        setIsCrying(true)

        // Play crying sound if not already playing
        if (!cryingSoundRef.current || cryingSoundRef.current.paused) {
          playCryingSound()
        }
      } else {
        setIsCrying(false)

        // Stop crying sound
        if (cryingSoundRef.current) {
          cryingSoundRef.current.pause()
          cryingSoundRef.current.currentTime = 0
        }
      }

      animationId = requestAnimationFrame(detectSound)
    }

    detectSound()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [micEnabled])

  const playCryingSound = () => {
    if (!cryingSoundRef.current) {
      // Create crying sound using Web Audio API
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.5)

      gainNode.gain.setValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1)
      gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.5)

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.5)
    }
  }

  return (
    <div className="gameplay-screen">
      {/* 3D Canvas */}
      <div className="game-canvas">
        <Canvas
          shadows
          camera={{ position: [0, 12, 23], fov: 60 }}
          gl={{ shadowMap: { enabled: true, type: THREE.PCFSoftShadowMap } }}
        >
          <GameScene
            babyConfig={babyConfig}
            toys={toys}
            babyPosition={babyPosition}
            babyRotation={babyRotation}
            isWalking={isWalking}
            isCrying={isCrying}
          />
        </Canvas>
      </div>

      {/* HUD */}
      <div className="hud">
        <div className="hud-room">{currentRoom}</div>
        <div className="hud-counter">🎮 Toys in hand: {toysInHand}</div>
        <div className="hud-counter">📦 Toys collected: {toysCollected}/8</div>
      </div>

      {/* Instructions */}
      <div className="instructions">
        ⬆️⬇️⬅️➡️ Move | A: Pick up toy | B: Store in chest
      </div>

      {/* Back Home Button */}
      <button className="back-button" onClick={onBackHome}>
        🏠 Back Home
      </button>

      {/* Audio Toggle Button */}
      <button className="audio-button" onClick={toggleAudio}>
        {audioEnabled ? '🔊 Audio On' : '🔇 Audio Off'}
      </button>

      {/* Microphone Toggle Button */}
      <button className="mic-button" onClick={toggleMicrophone}>
        {micEnabled ? '🎤 Mic On' : '🎤 Mic Off'}
      </button>

      {/* Toast Messages */}
      {toast && (
        <div className={`toast ${toast.isVictory ? 'victory' : ''}`}>
          {toast.message}
        </div>
      )}
    </div>
  )
}

export default GameplayScreen

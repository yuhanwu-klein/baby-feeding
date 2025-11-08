import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import BabyModel from './BabyModel'

const skinColors = [
  { name: 'Light', color: '#ffd7b5' },
  { name: 'Medium', color: '#e8b896' },
  { name: 'Tan', color: '#d4a574' },
  { name: 'Brown', color: '#a67c52' },
  { name: 'Dark', color: '#8b6f47' }
]

const clothesColors = [
  { name: 'Blue', color: '#b3e5fc' },
  { name: 'Pink', color: '#ffb6c1' },
  { name: 'Yellow', color: '#ffe66d' },
  { name: 'Green', color: '#95e1d3' },
  { name: 'Purple', color: '#d4a5d4' },
  { name: 'Orange', color: '#ffb88c' }
]

const floatingEmojis = [
  { emoji: '⭐', top: '10%', left: '10%', delay: 0 },
  { emoji: '🎈', top: '20%', left: '80%', delay: 1 },
  { emoji: '🌈', top: '70%', left: '15%', delay: 2 },
  { emoji: '⭐', top: '60%', left: '85%', delay: 0.5 },
  { emoji: '🎈', top: '80%', left: '50%', delay: 1.5 },
  { emoji: '⭐', top: '15%', left: '50%', delay: 2.5 }
]

function CharacterCreation({ onStart, initialConfig }) {
  const [gender, setGender] = useState(initialConfig.gender)
  const [skinColor, setSkinColor] = useState(initialConfig.skinColor)
  const [clothesColor, setClothesColor] = useState(initialConfig.clothesColor)

  const handleStart = () => {
    onStart({ gender, skinColor, clothesColor })
  }

  return (
    <div className="character-creation">
      {floatingEmojis.map((item, index) => (
        <div
          key={index}
          className="floating-emoji"
          style={{
            top: item.top,
            left: item.left,
            animationDelay: `${item.delay}s`
          }}
        >
          {item.emoji}
        </div>
      ))}

      <div className="creation-card">
        <h1>🍼 Baby Home Adventure 🏠</h1>

        {/* Live Preview */}
        <div className="preview-window">
          <Canvas shadows camera={{ position: [0, 2, 5], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={0.8} />
            <pointLight position={[-5, 3, -5]} intensity={0.5} color="#ffeecc" />
            <BabyModel
              gender={gender}
              skinColor={skinColor}
              clothesColor={clothesColor}
              preview={true}
            />
          </Canvas>
        </div>

        {/* Gender Selection */}
        <div className="customization-section">
          <h3>👶 Choose Gender</h3>
          <div className="gender-buttons">
            <button
              className={`gender-button ${gender === 'boy' ? 'selected' : ''}`}
              onClick={() => setGender('boy')}
            >
              👦 Boy
            </button>
            <button
              className={`gender-button ${gender === 'girl' ? 'selected' : ''}`}
              onClick={() => setGender('girl')}
            >
              👧 Girl
            </button>
          </div>
        </div>

        {/* Skin Color Selection */}
        <div className="customization-section">
          <h3>✨ Skin Color</h3>
          <div className="color-options">
            {skinColors.map((option) => (
              <div
                key={option.color}
                className={`color-swatch ${skinColor === option.color ? 'selected' : ''}`}
                style={{ backgroundColor: option.color }}
                onClick={() => setSkinColor(option.color)}
                title={option.name}
              />
            ))}
          </div>
        </div>

        {/* Clothes Color Selection */}
        <div className="customization-section">
          <h3>👕 Clothes Color</h3>
          <div className="color-options">
            {clothesColors.map((option) => (
              <div
                key={option.color}
                className={`color-swatch ${clothesColor === option.color ? 'selected' : ''}`}
                style={{ backgroundColor: option.color }}
                onClick={() => setClothesColor(option.color)}
                title={option.name}
              />
            ))}
          </div>
        </div>

        {/* Start Button */}
        <button className="start-button" onClick={handleStart}>
          🚀 Start Adventure!
        </button>
      </div>
    </div>
  )
}

export default CharacterCreation

import { useState } from 'react'
import CharacterCreation from './CharacterCreation'
import GameplayScreen from './GameplayScreen'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [babyConfig, setBabyConfig] = useState({
    gender: 'boy',
    skinColor: '#ffd7b5',
    clothesColor: '#b3e5fc'
  })

  const handleStartGame = (config) => {
    setBabyConfig(config)
    setGameStarted(true)
  }

  const handleBackHome = () => {
    setGameStarted(false)
  }

  return (
    <>
      {!gameStarted ? (
        <CharacterCreation onStart={handleStartGame} initialConfig={babyConfig} />
      ) : (
        <GameplayScreen babyConfig={babyConfig} onBackHome={handleBackHome} />
      )}
    </>
  )
}

export default App

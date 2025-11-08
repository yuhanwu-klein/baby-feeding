# 🍼 Baby Home Adventure 🏠

An interactive 3D baby home exploration game built with React and Three.js. Customize your baby character and explore three beautifully detailed rooms while collecting toys!

## ✨ Features

### 🎨 Character Creation
- **Gender Selection**: Choose between boy (with short hair) or girl (with pigtails and pink bows)
- **Skin Color Options**: 5 different skin tones to choose from
- **Clothes Color Options**: 6 vibrant colors for your baby's outfit
- **Live 3D Preview**: See your baby character rotate and bounce in real-time as you customize

### 🏡 Three Connected Rooms

#### 🛏️ Bedroom (Starting Room)
- Large bed with pink blanket and pillows
- Nightstand with glowing lamp
- Dresser with drawers and gold knobs
- Pink toy chest (for storing collected toys)
- Rocking chair
- Wall shelf with colorful books and teddy bear
- Picture frames on walls
- Large pink rug
- **8 collectible toys** scattered around the room

#### 🛋️ Living Room
- Large blue sofa with colorful cushions
- Coffee table with decorative vase
- TV and TV stand with glowing screen
- Tall bookshelf with 20+ colorful books
- Orange armchair
- Floor lamp with glowing shade
- Side table with potted plant
- Large wall art frame
- Pink rug

#### 🚿 Bathroom
- Bathtub with blue water and rubber ducky
- Sink with counter, mirror, and faucet
- Toilet
- Glass shower enclosure with shower head
- Towel rack with 3 colored towels
- Bath mat
- Laundry basket
- Bathroom scale
- Soap dispenser and toothbrush holder
- Checkered tile floor pattern

### 🎮 Gameplay

#### Controls
- **Arrow Up**: Walk forward (toward bathroom)
- **Arrow Down**: Walk backward (toward bedroom)
- **Arrow Left/Right**: Strafe left/right
- **A Key**: Pick up toy (when near one)
- **B Key**: Store toys in chest (when near toy chest)
- **Audio Button**: Toggle white noise sound

#### Objective
Collect all 8 toys scattered in the bedroom and store them in the pink toy chest to win!

### 🎯 Game Features
- **Third-person camera** that smoothly follows the baby
- **Walking animations** with swinging arms and legs
- **Real-time toy collection** with feedback messages
- **HUD display** showing current room, toys in hand, and toys collected
- **Victory message** when all toys are collected
- **Optional white noise audio** for ambiance
- **Beautiful lighting** with warm ambient tones and shadows
- **Seamless room transitions** - walk freely between all rooms

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The game will be available at `http://localhost:5173/`

## 🎨 Technology Stack

- **React** - UI framework
- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **Vite** - Build tool and dev server

## 🎪 Game Flow

1. **Character Creation Screen**
   - Customize your baby's appearance
   - See live 3D preview
   - Click "Start Adventure" to begin

2. **Gameplay Screen**
   - Start in the bedroom
   - Use arrow keys to move around
   - Press 'A' near toys to pick them up
   - Navigate to the pink toy chest
   - Press 'B' to store collected toys
   - Collect all 8 toys to win!

3. **Explore**
   - Walk through all three rooms
   - Admire the detailed furniture
   - Toggle audio for ambiance
   - Return home to customize your character again

## 🎨 Visual Features

- Colorful gradient backgrounds
- Floating animated emoji decorations
- Smooth 3D character animations
- Realistic shadows and lighting
- Glowing lamps and TV screens
- PBR materials for realistic appearance
- Warm color palette throughout

## 🎵 Audio

Optional white noise background sound with lowpass filter for a calming effect. Toggle on/off with the audio button in the top-right corner.

## 🏆 Tips

- All 8 toys are in the bedroom only
- You can carry multiple toys at once
- The toy chest is located in the bedroom at coordinates you can find by exploring
- Use the HUD to track your progress
- The camera automatically follows your baby character

## 📝 License

This project is open source and available for educational purposes.

## 🎉 Enjoy Your Baby Home Adventure!

Have fun exploring and collecting toys! 🎈

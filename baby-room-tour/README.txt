# 🎮 Baby Room Tour - Standalone Version

## 🚀 3种启动方法：

### 方法 1: 使用启动脚本 (最简单!)

**Windows 用户:**
- 双击 `START_GAME.bat` 文件

**Mac/Linux 用户:**
- 双击 `START_GAME.sh` 文件
- 或在终端运行: `./START_GAME.sh`

游戏会自动在浏览器中打开！

### 方法 2: 使用 Python (推荐)

打开终端/命令提示符，进入此文件夹，然后运行：

```bash
# Python 3
python3 -m http.server 8080

# 或 Python 2
python -m SimpleHTTPServer 8080
```

然后在浏览器打开: http://localhost:8080/

### 方法 3: 使用 Node.js

如果安装了 Node.js，运行：

```bash
npx http-server -p 8080
```

然后在浏览器打开: http://localhost:8080/

## 📂 Files in This Folder

- `index.html` - Main game file (open this!)
- `assets/` - Game resources folder (keep this with index.html)

## ⚠️ Important Notes

- Keep the `assets` folder in the same directory as `index.html`
- The game works completely offline - no internet needed!
- For best performance, use Chrome or Firefox
- **Microphone permission required** for crying feature (optional)

## 🎮 Game Controls

**Character Creation:**
- Click to customize your baby's gender, skin color, and clothes color
- Click "🚀 Start Tour!" to begin

**Gameplay:**
- **Arrow Keys** (⬆️⬇️⬅️➡️) - Move around
- **A Key** - Pick up toy (when near one)
- **B Key** - Store toys in chest (when near toy chest)
- **Audio Button** - Toggle background sound
- **🎤 Microphone Button** - Enable microphone to make baby cry when you make noise!

**Objective:** Collect all 8 toys in the bedroom and store them in the pink toy chest!

## 🎤 NEW: Microphone Feature!

Click the **🎤 Mic** button to activate your microphone. When the game detects sound (like clapping, talking, or music), the baby will start crying with:
- Tears falling down
- Head shaking
- Arms up to face
- Crying sound effects
- Body trembling

Make noise to trigger the crying! Stay quiet and the baby will calm down.

## 🏠 Rooms to Explore

- **Bedroom** (starting room) - Contains 8 collectible toys
- **Living Room** - Beautiful lounge area
- **Bathroom** - Complete with bathtub and rubber ducky

## 🎉 Have Fun!

Enjoy exploring the Baby Room Tour! 🍼

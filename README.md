# 3D Cozy Baby Room - Blender Project

A warm and childlike 3D room scene created in Blender, featuring furniture, a baby, dynamic lighting, and interactive camera controls.

## Features

### Room Elements
- **Warm, textured walls** with procedural noise for realism
- **Wooden floor** with natural wood tones
- **Complete furniture set:**
  - Small child's bed with mattress, pillow, and headboard
  - Wooden desk with four legs
  - Simple chair
  - Cozy sofa with armrests
  - Wooden rocking horse with curved rockers
- **Baby character** lying on the bed with anatomical parts (head, body, arms, legs)

### Lighting System
- **Dynamic lighting** with animated intensity
- **Multiple light sources:**
  - Main overhead area light (warm color)
  - Window light simulation
  - Soft fill light
  - Rim light for depth
- **Warm color temperature** throughout for cozy atmosphere

### Materials & Textures
- **Procedural noise textures** on walls, floor, and furniture for realism
- **Physically-based materials** using Principled BSDF
- **Color palette:**
  - Warm beige/cream walls
  - Natural wood tones
  - Soft pastel colors for furniture
  - Warm skin tones for baby

### Camera System
- **Automated camera animation** - 240 frames orbiting the room
- **Manual control** via "CameraTarget" empty object
- **Cinematic settings** - depth of field, 35mm lens
- **Smooth interpolation** for professional movement

## Usage

### Running the Script

1. **Open Blender** (tested with Blender 2.8+)

2. **Open the Scripting workspace:**
   - Click on "Scripting" tab at the top of Blender

3. **Load the script:**
   - Click "Open" in the text editor
   - Navigate to `cozy_baby_room.py`
   - Click "Open Text Block"

4. **Run the script:**
   - Click the "Run Script" button (▶ play icon)
   - Or press `Alt + P`

5. **Wait for completion:**
   - The script will create all objects automatically
   - Success message will appear in the console

### Viewing the Scene

**Camera View:**
- Press `Numpad 0` to switch to camera view
- Press `F12` to render a single frame
- Press `Ctrl + F12` to render the full animation

**Navigation:**
- **Rotate view:** Middle mouse button + drag
- **Pan view:** Shift + middle mouse button + drag
- **Zoom:** Scroll wheel
- **Orbit:** Click and drag with middle mouse

### Camera Controls

**Automatic Animation:**
- Press `Spacebar` to play/pause the camera animation
- The camera will orbit around the room over 240 frames (10 seconds at 24fps)
- Smooth vertical movement adds dynamic interest

**Manual Control:**
- Select the "CameraTarget" empty object (small sphere at room center)
- Press `G` to move it (changes camera focus point)
- Move in viewport to reposition camera aim

**Camera Settings:**
- Press `N` to open properties panel
- Navigate to camera settings to adjust:
  - Focal length (default: 35mm)
  - Depth of field
  - F-stop

## Rendering

### Quick Render
```
F12 - Render current frame
```

### Animation Render
```
Ctrl + F12 - Render full animation (240 frames)
```

### Render Settings
- **Engine:** Cycles (photorealistic)
- **Samples:** 128 (good quality/speed balance)
- **Denoising:** Enabled
- **Resolution:** 1920x1080 (Full HD)
- **Color:** Filmic with medium high contrast

### Optimizing Render Time
To speed up renders:
1. Open "Render Properties" panel
2. Reduce "Max Samples" to 64-96
3. Enable "Denoising" if not already on
4. Use GPU if available (Preferences > System > Cycles Render Devices)

## Customization

### Changing Colors
Edit the material creation section (lines 40-60):
```python
mat_wall = create_material("Wall", (R, G, B, 1.0), roughness=0.7, use_noise=True)
```
Replace (R, G, B) with values between 0.0 and 1.0

### Adjusting Room Size
Modify the `create_room()` function:
```python
room_width = 8   # Change these values
room_depth = 8
room_height = 5
```

### Moving Furniture
Edit furniture creation calls (near line 400):
```python
create_bed((-2, -2, 0))      # (X, Y, Z) position
create_desk((2.5, -2, 0))
create_sofa((-1, 3, 0))
```

### Lighting Intensity
Adjust light energy values in `create_lighting()`:
```python
main_light.data.energy = 150  # Increase for brighter
```

## Technical Details

### Scene Composition
- **Coordinate System:** Z-up (Blender default)
- **Units:** Blender units (approximate meters)
- **Materials:** Node-based Principled BSDF
- **Textures:** Procedural noise for performance

### Performance Notes
- All geometry is procedural (no external assets)
- Lightweight models for fast rendering
- Noise textures are procedural (no image files needed)
- Optimized for Cycles renderer

### File Structure
```
baby-feeding/
├── cozy_baby_room.py    # Main Blender Python script
├── README.md            # This file
├── baby.jpg             # Reference image
└── room.jpg             # Reference image
```

## Troubleshooting

### Script Won't Run
- Ensure you're using Blender 2.8 or newer
- Check Python console for error messages (Window > Toggle System Console on Windows)

### Objects Not Visible
- Press `Home` key to frame all objects
- Check outliner panel for created objects
- Ensure you're in the correct viewport shading mode

### Rendering is Slow
- Reduce samples in render settings
- Use GPU rendering if available
- Render at lower resolution for tests
- Disable depth of field temporarily

### Camera Not Moving
- Ensure animation is playing (Spacebar)
- Check timeline at bottom of screen
- Verify frame range is 1-240

## Tips & Tricks

1. **Quick Preview:** Use Viewport Shading > Rendered mode (Z > Rendered) for real-time preview
2. **Fine-tune Lighting:** Select lights and adjust energy/color in properties panel
3. **Add More Objects:** Copy furniture creation functions and call with new positions
4. **Export Scene:** File > Export > FBX/glTF for use in other applications
5. **Save Your Work:** File > Save As before making major changes

## Credits

Created using Blender Python API (bpy) with procedural modeling techniques.
Reference images used for inspiration during development.

## License

This script is provided as-is for educational and creative purposes.

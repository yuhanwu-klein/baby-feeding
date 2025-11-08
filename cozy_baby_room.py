"""
3D Cozy Baby Room in Blender
Creates a warm, childlike room with furniture, a baby, dynamic lighting, and camera controls.
"""

import bpy
import math
from mathutils import Vector, Euler

# Clear existing scene
def clear_scene():
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete(use_global=False)

    # Clear materials
    for material in bpy.data.materials:
        bpy.data.materials.remove(material)

    # Clear textures
    for texture in bpy.data.textures:
        bpy.data.textures.remove(texture)

clear_scene()

# ========================================
# MATERIALS AND COLORS
# ========================================

def create_material(name, base_color, roughness=0.5, metallic=0.0, use_noise=False):
    """Create a material with optional noise texture for realism"""
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links

    # Clear default nodes
    nodes.clear()

    # Create nodes
    output_node = nodes.new(type='ShaderNodeOutputMaterial')
    bsdf_node = nodes.new(type='ShaderNodeBsdfPrincipled')

    bsdf_node.inputs['Base Color'].default_value = base_color
    bsdf_node.inputs['Roughness'].default_value = roughness
    bsdf_node.inputs['Metallic'].default_value = metallic

    if use_noise:
        # Add noise texture for realism
        noise_node = nodes.new(type='ShaderNodeTexNoise')
        noise_node.inputs['Scale'].default_value = 5.0
        noise_node.inputs['Detail'].default_value = 2.0
        noise_node.inputs['Roughness'].default_value = 0.5

        color_ramp = nodes.new(type='ShaderNodeValToRGB')
        color_ramp.color_ramp.elements[0].position = 0.4
        color_ramp.color_ramp.elements[1].position = 0.6

        mix_node = nodes.new(type='ShaderNodeMixRGB')
        mix_node.inputs['Fac'].default_value = 0.2
        mix_node.inputs['Color1'].default_value = base_color

        links.new(noise_node.outputs['Fac'], color_ramp.inputs['Fac'])
        links.new(color_ramp.outputs['Color'], mix_node.inputs['Color2'])
        links.new(mix_node.outputs['Color'], bsdf_node.inputs['Base Color'])

    links.new(bsdf_node.outputs['BSDF'], output_node.inputs['Surface'])

    return mat

# Create materials with warm, cozy colors
mat_wall = create_material("Wall", (0.95, 0.85, 0.75, 1.0), roughness=0.7, use_noise=True)
mat_floor = create_material("Floor", (0.85, 0.65, 0.45, 1.0), roughness=0.6, use_noise=True)
mat_ceiling = create_material("Ceiling", (0.98, 0.98, 0.95, 1.0), roughness=0.8)
mat_bed_frame = create_material("BedFrame", (0.55, 0.35, 0.2, 1.0), roughness=0.5, use_noise=True)
mat_bed_sheet = create_material("BedSheet", (0.6, 0.8, 0.95, 1.0), roughness=0.4)
mat_pillow = create_material("Pillow", (0.95, 0.9, 0.85, 1.0), roughness=0.3)
mat_desk = create_material("Desk", (0.5, 0.3, 0.15, 1.0), roughness=0.4, use_noise=True)
mat_chair = create_material("Chair", (0.8, 0.5, 0.3, 1.0), roughness=0.5)
mat_sofa = create_material("Sofa", (0.95, 0.6, 0.55, 1.0), roughness=0.4)
mat_horse = create_material("Horse", (0.9, 0.7, 0.4, 1.0), roughness=0.6, use_noise=True)
mat_baby_skin = create_material("BabySkin", (1.0, 0.85, 0.75, 1.0), roughness=0.2)
mat_baby_clothes = create_material("BabyClothes", (1.0, 0.95, 0.95, 1.0), roughness=0.5)

# ========================================
# ROOM GEOMETRY
# ========================================

def create_room():
    """Create the room (walls, floor, ceiling)"""
    room_width = 8
    room_depth = 8
    room_height = 5
    wall_thickness = 0.2

    # Floor
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0))
    floor = bpy.context.active_object
    floor.name = "Floor"
    floor.scale = (room_width/2, room_depth/2, 0.1)
    floor.data.materials.append(mat_floor)

    # Ceiling
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, room_height))
    ceiling = bpy.context.active_object
    ceiling.name = "Ceiling"
    ceiling.scale = (room_width/2, room_depth/2, 0.1)
    ceiling.data.materials.append(mat_ceiling)

    # Back wall
    bpy.ops.mesh.primitive_cube_add(size=1, location=(0, -room_depth/2, room_height/2))
    wall_back = bpy.context.active_object
    wall_back.name = "WallBack"
    wall_back.scale = (room_width/2, wall_thickness/2, room_height/2)
    wall_back.data.materials.append(mat_wall)

    # Left wall
    bpy.ops.mesh.primitive_cube_add(size=1, location=(-room_width/2, 0, room_height/2))
    wall_left = bpy.context.active_object
    wall_left.name = "WallLeft"
    wall_left.scale = (wall_thickness/2, room_depth/2, room_height/2)
    wall_left.data.materials.append(mat_wall)

    # Right wall
    bpy.ops.mesh.primitive_cube_add(size=1, location=(room_width/2, 0, room_height/2))
    wall_right = bpy.context.active_object
    wall_right.name = "WallRight"
    wall_right.scale = (wall_thickness/2, room_depth/2, room_height/2)
    wall_right.data.materials.append(mat_wall)

create_room()

# ========================================
# FURNITURE
# ========================================

def create_bed(location):
    """Create a small child's bed"""
    bed_width = 2.0
    bed_length = 3.0
    bed_height = 0.8

    # Bed frame
    bpy.ops.mesh.primitive_cube_add(size=1, location=(location[0], location[1], bed_height/2))
    frame = bpy.context.active_object
    frame.name = "BedFrame"
    frame.scale = (bed_width/2, bed_length/2, bed_height/2)
    frame.data.materials.append(mat_bed_frame)

    # Mattress
    bpy.ops.mesh.primitive_cube_add(size=1, location=(location[0], location[1], bed_height + 0.15))
    mattress = bpy.context.active_object
    mattress.name = "Mattress"
    mattress.scale = (bed_width/2 - 0.1, bed_length/2 - 0.1, 0.15)
    mattress.data.materials.append(mat_bed_sheet)

    # Pillow
    bpy.ops.mesh.primitive_cube_add(size=1, location=(location[0], location[1] + bed_length/2 - 0.4, bed_height + 0.4))
    pillow = bpy.context.active_object
    pillow.name = "Pillow"
    pillow.scale = (0.6, 0.3, 0.15)
    pillow.data.materials.append(mat_pillow)

    # Headboard
    bpy.ops.mesh.primitive_cube_add(size=1, location=(location[0], location[1] + bed_length/2, bed_height + 0.7))
    headboard = bpy.context.active_object
    headboard.name = "Headboard"
    headboard.scale = (bed_width/2, 0.1, 0.8)
    headboard.data.materials.append(mat_bed_frame)

    return (location[0], location[1], bed_height + 0.3)  # Return position for baby

def create_desk(location):
    """Create a small desk"""
    # Desktop
    bpy.ops.mesh.primitive_cube_add(size=1, location=(location[0], location[1], 1.2))
    desktop = bpy.context.active_object
    desktop.name = "Desktop"
    desktop.scale = (1.2, 0.7, 0.05)
    desktop.data.materials.append(mat_desk)

    # Legs
    leg_positions = [
        (location[0] - 1.0, location[1] - 0.6, 0.6),
        (location[0] + 1.0, location[1] - 0.6, 0.6),
        (location[0] - 1.0, location[1] + 0.6, 0.6),
        (location[0] + 1.0, location[1] + 0.6, 0.6)
    ]

    for i, pos in enumerate(leg_positions):
        bpy.ops.mesh.primitive_cylinder_add(radius=0.05, depth=1.2, location=pos)
        leg = bpy.context.active_object
        leg.name = f"DeskLeg{i}"
        leg.data.materials.append(mat_desk)

def create_chair(location):
    """Create a simple chair"""
    # Seat
    bpy.ops.mesh.primitive_cube_add(size=1, location=(location[0], location[1], 0.8))
    seat = bpy.context.active_object
    seat.name = "ChairSeat"
    seat.scale = (0.6, 0.6, 0.05)
    seat.data.materials.append(mat_chair)

    # Legs
    leg_positions = [
        (location[0] - 0.5, location[1] - 0.5, 0.4),
        (location[0] + 0.5, location[1] - 0.5, 0.4),
        (location[0] - 0.5, location[1] + 0.5, 0.4),
        (location[0] + 0.5, location[1] + 0.5, 0.4)
    ]

    for i, pos in enumerate(leg_positions):
        bpy.ops.mesh.primitive_cylinder_add(radius=0.04, depth=0.8, location=pos)
        leg = bpy.context.active_object
        leg.name = f"ChairLeg{i}"
        leg.data.materials.append(mat_chair)

    # Backrest
    bpy.ops.mesh.primitive_cube_add(size=1, location=(location[0], location[1] + 0.6, 1.3))
    backrest = bpy.context.active_object
    backrest.name = "ChairBack"
    backrest.scale = (0.6, 0.05, 0.5)
    backrest.data.materials.append(mat_chair)

def create_sofa(location):
    """Create a cozy sofa"""
    # Seat
    bpy.ops.mesh.primitive_cube_add(size=1, location=(location[0], location[1], 0.7))
    seat = bpy.context.active_object
    seat.name = "SofaSeat"
    seat.scale = (2.0, 0.8, 0.4)
    seat.data.materials.append(mat_sofa)

    # Backrest
    bpy.ops.mesh.primitive_cube_add(size=1, location=(location[0], location[1] + 0.7, 1.2))
    backrest = bpy.context.active_object
    backrest.name = "SofaBack"
    backrest.scale = (2.0, 0.15, 0.8)
    backrest.data.materials.append(mat_sofa)

    # Armrests
    bpy.ops.mesh.primitive_cube_add(size=1, location=(location[0] - 1.85, location[1], 1.0))
    armrest_l = bpy.context.active_object
    armrest_l.name = "SofaArmL"
    armrest_l.scale = (0.15, 0.8, 0.6)
    armrest_l.data.materials.append(mat_sofa)

    bpy.ops.mesh.primitive_cube_add(size=1, location=(location[0] + 1.85, location[1], 1.0))
    armrest_r = bpy.context.active_object
    armrest_r.name = "SofaArmR"
    armrest_r.scale = (0.15, 0.8, 0.6)
    armrest_r.data.materials.append(mat_sofa)

def create_wooden_horse(location):
    """Create a wooden rocking horse"""
    # Body
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.4, location=(location[0], location[1], 0.8))
    body = bpy.context.active_object
    body.name = "HorseBody"
    body.scale = (0.7, 1.2, 0.8)
    body.data.materials.append(mat_horse)

    # Head
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.25, location=(location[0], location[1] + 0.6, 1.1))
    head = bpy.context.active_object
    head.name = "HorseHead"
    head.scale = (0.6, 0.8, 0.9)
    head.data.materials.append(mat_horse)

    # Legs
    leg_positions = [
        (location[0] - 0.3, location[1] + 0.4, 0.3),
        (location[0] + 0.3, location[1] + 0.4, 0.3),
        (location[0] - 0.3, location[1] - 0.4, 0.3),
        (location[0] + 0.3, location[1] - 0.4, 0.3)
    ]

    for i, pos in enumerate(leg_positions):
        bpy.ops.mesh.primitive_cylinder_add(radius=0.08, depth=0.6, location=pos)
        leg = bpy.context.active_object
        leg.name = f"HorseLeg{i}"
        leg.data.materials.append(mat_horse)

    # Rockers (curved base)
    bpy.ops.mesh.primitive_torus_add(
        major_radius=0.8,
        minor_radius=0.06,
        location=(location[0], location[1], 0.1)
    )
    rocker = bpy.context.active_object
    rocker.name = "HorseRocker"
    rocker.rotation_euler = (0, math.radians(90), 0)
    rocker.scale = (0.8, 1.0, 1.0)
    rocker.data.materials.append(mat_horse)

# ========================================
# BABY MODEL
# ========================================

def create_baby(location):
    """Create a simple baby lying on the bed"""
    # Head
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.25, location=(location[0], location[1] + 0.3, location[2] + 0.2))
    head = bpy.context.active_object
    head.name = "BabyHead"
    head.data.materials.append(mat_baby_skin)

    # Body
    bpy.ops.mesh.primitive_cube_add(size=1, location=(location[0], location[1], location[2]))
    body = bpy.context.active_object
    body.name = "BabyBody"
    body.scale = (0.25, 0.35, 0.15)
    body.data.materials.append(mat_baby_clothes)

    # Arms
    bpy.ops.mesh.primitive_cylinder_add(radius=0.06, depth=0.4, location=(location[0] - 0.3, location[1], location[2]))
    arm_l = bpy.context.active_object
    arm_l.name = "BabyArmL"
    arm_l.rotation_euler = (0, math.radians(90), 0)
    arm_l.data.materials.append(mat_baby_skin)

    bpy.ops.mesh.primitive_cylinder_add(radius=0.06, depth=0.4, location=(location[0] + 0.3, location[1], location[2]))
    arm_r = bpy.context.active_object
    arm_r.name = "BabyArmR"
    arm_r.rotation_euler = (0, math.radians(90), 0)
    arm_r.data.materials.append(mat_baby_skin)

    # Legs
    bpy.ops.mesh.primitive_cylinder_add(radius=0.07, depth=0.4, location=(location[0] - 0.15, location[1] - 0.3, location[2] - 0.05))
    leg_l = bpy.context.active_object
    leg_l.name = "BabyLegL"
    leg_l.rotation_euler = (math.radians(90), 0, 0)
    leg_l.data.materials.append(mat_baby_skin)

    bpy.ops.mesh.primitive_cylinder_add(radius=0.07, depth=0.4, location=(location[0] + 0.15, location[1] - 0.3, location[2] - 0.05))
    leg_r = bpy.context.active_object
    leg_r.name = "BabyLegR"
    leg_r.rotation_euler = (math.radians(90), 0, 0)
    leg_r.data.materials.append(mat_baby_skin)

# ========================================
# CREATE ALL FURNITURE AND BABY
# ========================================

# Create bed and get position for baby
baby_position = create_bed((-2, -2, 0))

# Create other furniture
create_desk((2.5, -2, 0))
create_chair((2.5, -0.5, 0))
create_sofa((-1, 3, 0))
create_wooden_horse((2, 2, 0))

# Create baby on the bed
create_baby(baby_position)

# ========================================
# DYNAMIC LIGHTING
# ========================================

def create_lighting():
    """Create dynamic, warm lighting"""

    # Main warm overhead light
    bpy.ops.object.light_add(type='AREA', location=(0, 0, 4.5))
    main_light = bpy.context.active_object
    main_light.name = "MainLight"
    main_light.data.energy = 150
    main_light.data.color = (1.0, 0.95, 0.85)  # Warm color
    main_light.data.size = 2.0

    # Accent light (window light simulation)
    bpy.ops.object.light_add(type='AREA', location=(3.5, -3, 3))
    window_light = bpy.context.active_object
    window_light.name = "WindowLight"
    window_light.data.energy = 80
    window_light.data.color = (0.95, 0.9, 0.8)
    window_light.data.size = 1.5
    window_light.rotation_euler = (math.radians(45), 0, math.radians(45))

    # Soft fill light
    bpy.ops.object.light_add(type='POINT', location=(-3, 2, 2.5))
    fill_light = bpy.context.active_object
    fill_light.name = "FillLight"
    fill_light.data.energy = 50
    fill_light.data.color = (1.0, 0.85, 0.7)

    # Rim light for depth
    bpy.ops.object.light_add(type='SPOT', location=(3, 3, 3.5))
    rim_light = bpy.context.active_object
    rim_light.name = "RimLight"
    rim_light.data.energy = 100
    rim_light.data.color = (1.0, 0.9, 0.75)
    rim_light.data.spot_size = math.radians(60)
    rim_light.rotation_euler = (math.radians(135), 0, math.radians(225))

    # Add animation to main light for dynamic effect
    main_light.data.energy = 150
    main_light.data.keyframe_insert(data_path="energy", frame=1)
    main_light.data.energy = 180
    main_light.data.keyframe_insert(data_path="energy", frame=60)
    main_light.data.energy = 150
    main_light.data.keyframe_insert(data_path="energy", frame=120)

    # Make animation loop
    for fcurve in main_light.data.animation_data.action.fcurves:
        for keyframe in fcurve.keyframe_points:
            keyframe.interpolation = 'BEZIER'

create_lighting()

# ========================================
# CAMERA WITH CONTROLS
# ========================================

def setup_camera():
    """Setup camera with orbital controls"""

    # Create camera
    bpy.ops.object.camera_add(location=(8, -8, 6))
    camera = bpy.context.active_object
    camera.name = "MainCamera"

    # Point camera at room center
    direction = Vector((0, 0, 2)) - camera.location
    rot_quat = direction.to_track_quat('-Z', 'Y')
    camera.rotation_euler = rot_quat.to_euler()

    # Set as active camera
    bpy.context.scene.camera = camera

    # Add camera animation for automatic exploration
    # Circular movement around the room
    radius = 10
    height = 6

    for frame in range(0, 241, 20):
        angle = (frame / 240.0) * 2 * math.pi
        x = radius * math.cos(angle)
        y = radius * math.sin(angle)
        z = height + math.sin(angle * 2) * 1  # Slight vertical movement

        camera.location = (x, y, z)
        camera.keyframe_insert(data_path="location", frame=frame)

        # Always look at center
        direction = Vector((0, 0, 2)) - camera.location
        rot_quat = direction.to_track_quat('-Z', 'Y')
        camera.rotation_euler = rot_quat.to_euler()
        camera.keyframe_insert(data_path="rotation_euler", frame=frame)

    # Smooth animation
    if camera.animation_data:
        for fcurve in camera.animation_data.action.fcurves:
            for keyframe in fcurve.keyframe_points:
                keyframe.interpolation = 'BEZIER'

    # Camera settings for better rendering
    camera.data.lens = 35  # Wider angle for room view
    camera.data.dof.use_dof = True
    camera.data.dof.aperture_fstop = 2.8
    camera.data.dof.focus_distance = 10

setup_camera()

# ========================================
# RENDER SETTINGS
# ========================================

def setup_render():
    """Configure render settings for realistic output"""
    scene = bpy.context.scene

    # Use Cycles for realistic rendering
    scene.render.engine = 'CYCLES'
    scene.cycles.samples = 128
    scene.cycles.use_denoising = True

    # Resolution
    scene.render.resolution_x = 1920
    scene.render.resolution_y = 1080
    scene.render.resolution_percentage = 100

    # Frame range for animation
    scene.frame_start = 1
    scene.frame_end = 240
    scene.frame_current = 1

    # Color management for warm tones
    scene.view_settings.view_transform = 'Filmic'
    scene.view_settings.look = 'Medium High Contrast'

    # Enable ambient occlusion
    scene.world.light_settings.use_ambient_occlusion = True

    # Add world background with subtle noise
    world = bpy.data.worlds.new("CozyWorld")
    scene.world = world
    world.use_nodes = True

    nodes = world.node_tree.nodes
    links = world.node_tree.links
    nodes.clear()

    output = nodes.new(type='ShaderNodeOutputWorld')
    background = nodes.new(type='ShaderNodeBackground')
    background.inputs['Color'].default_value = (0.95, 0.92, 0.88, 1.0)
    background.inputs['Strength'].default_value = 0.5

    links.new(background.outputs['Background'], output.inputs['Surface'])

setup_render()

# ========================================
# MANUAL CAMERA CONTROL SETUP
# ========================================

def add_camera_control_empty():
    """Add an empty object for manual camera control"""
    bpy.ops.object.empty_add(type='SPHERE', location=(0, 0, 2))
    empty = bpy.context.active_object
    empty.name = "CameraTarget"
    empty.empty_display_size = 0.5

    # Add constraint to camera to track the empty
    camera = bpy.data.objects.get("MainCamera")
    if camera:
        track_constraint = camera.constraints.new(type='TRACK_TO')
        track_constraint.target = empty
        track_constraint.track_axis = 'TRACK_NEGATIVE_Z'
        track_constraint.up_axis = 'UP_Y'

add_camera_control_empty()

print("\n" + "="*60)
print("COZY BABY ROOM CREATED SUCCESSFULLY!")
print("="*60)
print("\nFeatures:")
print("  ✓ Warm, childlike room with textured walls")
print("  ✓ Small bed with baby lying on it")
print("  ✓ Desk, chair, sofa, and wooden rocking horse")
print("  ✓ Dynamic lighting with warm colors")
print("  ✓ Noise textures for realism")
print("  ✓ Animated camera for automatic exploration")
print("\nControls:")
print("  • Press SPACEBAR to play/pause camera animation")
print("  • Use NUMPAD 0 to view through camera")
print("  • Scroll to zoom in/out")
print("  • Middle mouse drag to rotate view")
print("  • Move 'CameraTarget' empty to change camera focus")
print("\nRendering:")
print("  • Press F12 to render current frame")
print("  • Press Ctrl+F12 to render animation")
print("  • Animation: 240 frames (10 seconds at 24fps)")
print("="*60)

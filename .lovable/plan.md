
# Resume Planet: 3D Battle Royale Resume Game

## Overview
Transform your resume site into a fully interactive 3D game world. A small round planet floats in space, with buildings on its surface containing your resume content. A third-person character walks around the planet's surface (gravity pulls toward the center), and players can approach buildings to read your projects, open source contributions, interests, and contact info.

## Architecture

### Game World Structure
- A spherical planet (~radius 5) textured with a dark, bioluminescent surface
- 6-8 small buildings placed on the planet surface, each representing a resume section:
  - **HQ Tower** - Hero/name/title
  - **App Store** - Your projects (NxtLap, Briefly, nxtlap.com)
  - **Open Source Lab** - Your merged PRs
  - **Connect Hub** - Social links
  - **Interest Dome** - Interests list
  - **Collab Center** - "Let's Collaborate" section
- A simple capsule/cube character that walks on the planet surface
- Stars and floating particles in the background

### Controls
- WASD or arrow keys to move the character around the planet
- Character automatically stays on the planet surface (gravity toward center)
- Camera follows character in third-person view
- When character approaches a building, an HTML overlay panel slides in showing that section's content

### Technical Approach
Given the R3F version incompatibility issues, the entire 3D scene will be built **imperatively** inside a single full-screen Canvas component using `useEffect` + direct Three.js APIs. This avoids the `applyProps` crash entirely.

## File Changes

### 1. New file: `src/components/PlanetGame.tsx`
The main game component containing:
- **Planet**: A `SphereGeometry` with custom dark material and subtle grid/glow lines
- **Buildings**: Simple `BoxGeometry` meshes placed on the planet surface using spherical coordinates, each with a glowing label sprite
- **Character**: A small capsule mesh that moves along the planet surface
- **Movement system**: Keyboard input handler that moves the character tangentially on the sphere, with the character's "up" always pointing away from planet center
- **Camera rig**: Third-person camera that orbits behind the character
- **Proximity detection**: Raycasting or distance checks to detect when the character is near a building
- **Background**: Particle starfield

### 2. New file: `src/components/GameHUD.tsx`
An HTML overlay layer on top of the Canvas:
- Shows the currently active building's content panel (slide-in from side)
- Minimap in corner showing planet top-down view with character dot
- Control hints ("WASD to move, approach buildings to explore")
- Character name "VAIDIK" floating above

### 3. Modified: `src/pages/Index.tsx`
- Replace the entire scrollable layout with a full-screen game view
- Render `PlanetGame` as the main component
- Pass all resume data (links, apps, opensource, interests) as props to the game
- The `GameHUD` overlay displays content when player approaches buildings

### 4. Modified: `src/index.css`
- Add full-screen game container styles
- Add HUD panel slide-in animations
- Keep the bioluminescent color palette for UI panels
- Add building label and proximity indicator styles

### 5. Modified: `src/components/HeroScene3D.tsx`
- Remove this file (replaced by PlanetGame)

## Technical Details

### Planet Surface Movement
```text
Character Position Loop:
1. Read WASD input -> compute tangent direction on sphere
2. Move character along sphere surface (great circle movement)
3. Reproject position onto sphere surface (normalize * radius)
4. Orient character "up" = normalize(position)
5. Update camera to follow behind character
```

### Building Placement
Buildings are placed at fixed spherical coordinates on the planet. Each building is a group containing:
- A box mesh (the building body) oriented radially outward
- A point light for bioluminescent glow (red/cyan themed)
- A text sprite showing the building name

### Proximity System
Each frame, check distance between character and each building. When distance is below threshold (~1.5 units), emit the building ID to the React state, which triggers the HUD panel to show that section's content.

### Performance
- All geometries created once in `useMemo`/`useEffect` and disposed on cleanup
- Particle count kept under 2000
- Simple box buildings (no complex models)
- Single `useFrame` loop for all animations

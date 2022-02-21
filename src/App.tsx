import React from 'react';
import { Joystick } from './controls/joystick';
import { Ship } from './three/components/Ship';
import { Universe } from './three/Universe';
import { Player } from './three/components/Player';
// import { Bloom, DepthOfField, EffectComposer, Noise, Outline, Vignette } from '@react-three/postprocessing';
// import { Reflector } from '@react-three/drei';
import { UniverseContextWrapper } from './Context';
// import { EdgesHelper } from 'react-three-fiber'


function App() {

  return <UniverseContextWrapper>
    <Joystick />
    <Universe>
      {/* <EffectComposer> */}
      {/* <Outline blur visibleEdgeColor={0xfefefe} edgeStrength={100} width={500} /> */}
      {/* <DepthOfField focusDistance={0} focalLength={0.04} bokehScale={3} height={400} /> */}
      {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={500} /> */}
      <Player />
      <Ship />

      {/* </EffectComposer> */}
    </Universe>
  </UniverseContextWrapper>;
}

export default App;

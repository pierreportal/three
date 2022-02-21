import { useBox } from '@react-three/cannon';
import React from 'react';
import { useFrame } from 'react-three-fiber';
import { useKeyControlls } from '../../hooks/useKeyControls';
import { Camera } from "../../Camera";
import { Vector3, WebGLCubeRenderTarget } from 'three';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Box } from "../baseMaterial/Box";


export const Player: React.FunctionComponent = () => {
    const { moveForward, moveBackward, moveLeft, moveRight } = useKeyControlls();
    const [ref, api] = useBox(() => ({ type: "Dynamic", mass: 1, position: [0, 2, 0] as any }));
    useFrame(() => {
        const [x, y, z] = ref.current?.position as any;
        // const direction = new Vector3()
    });

    const handleClick = () => {
        api.velocity.set(0, 5, 0)
    };

    return <>
        <Camera />
        {/* <EffectComposer> */}
        {/* <Bloom luminanceThreshold={0} luminanceSmoothing={1} height={300} /> */}

        <mesh castShadow receiveShadow onClick={handleClick} ref={ref} position={[0, 10, 0]}>
            <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
            <meshStandardMaterial
                attach="material"
                color="hotpink"
            // metalness={0.7}
            />
        </mesh>
        {/* <Box position={[0, 0, 0] as any} dimensions={[1, 1, 1]} texture={null} mass={1} /> */}
        {/* </EffectComposer> */}
    </>
}
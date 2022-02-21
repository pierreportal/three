import { useBox } from '@react-three/cannon';
import React from 'react';
import { useFrame } from 'react-three-fiber';
import { useKeyControlls } from '../../hooks/useKeyControls';
import { Camera } from "../../Camera";
import { Vector3 } from 'three';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useStore } from '../../store';
import { MapControls } from '@react-three/drei'


export const Player: React.FunctionComponent = () => {
    const speed = 2;

    const { moveForward, moveBackward, moveLeft, moveRight } = useKeyControlls();

    const { playerPosition, changePlayerRotation } = useStore();

    const [camTarget, setCamTarget] = React.useState([0, 0, 0])

    const [ref, api] = useBox(() => (
        {
            type: "Dynamic",
            mass: 1,
            position: playerPosition.pos as any,
        }));

    const velocity = React.useRef([0, 0, 0]);

    api.position.subscribe((p) => setCamTarget(p))

    React.useEffect(() => {
        api.velocity.subscribe((v) => (velocity.current = v));
    }, [api.velocity]);


    useFrame(() => {
        const direction = new Vector3();
        const frontVector = new Vector3(
            0,
            0,
            (moveBackward ? 1 : 0) - (moveForward ? 1 : 0),
        );
        const sideVector = new Vector3(
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
            0,
            0,
        );

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(speed)

        api.velocity.set(direction.x, velocity.current[1], direction.z);
    });

    return <>
        <Camera playerApi={api} />
        <EffectComposer>
            <Bloom luminanceThreshold={0} luminanceSmoothing={1} height={300} />
            <mesh castShadow receiveShadow ref={ref} position={[0, 10, 0]}>
                <boxBufferGeometry
                    attach="geometry"
                    args={[1, 1, 1]}
                />
                <meshStandardMaterial
                    attach="material"
                    color="hotpink"
                />
            </mesh>
        </EffectComposer>
        <MapControls target={camTarget as any} />
    </>
}
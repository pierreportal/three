import { useBox } from '@react-three/cannon';
import React from 'react';
import { Vector3 } from 'three';
import { Textures } from '../../../types';
import { textures } from "../../textures";
import { GhostElement } from '../GhostElement';
import { useAddElement } from '../../hooks/useAddElement';
import { useStore } from '../../store';
import { Edges } from '@react-three/drei';



interface IBoxProps {
    position: Vector3,
    dimensions: any,
    texture: Textures | null,
    mass: number,
    rotation: any
}


export const Box: React.FunctionComponent<IBoxProps> = ({ position, dimensions, texture, mass, rotation }) => {

    const [ref] = useBox(() => ({ type: 'Dynamic', mass: 0, position: position as any, rotation: [0, 0 + rotation * (Math.PI / 2), 0] }));
    const [hoverFace, setHoverFace] = React.useState<number | null>(null);

    const { selectedElement } = useStore();
    const { createElement, showGhostElement, hideGhostElement, displayGhost } = useAddElement();

    const handleMouseOver = (event: any) => {
        event.stopPropagation();
        const { faceIndex } = event;
        const face = ~~(faceIndex / 2);
        if (!event.altKey) {
            setHoverFace(face);
            showGhostElement(position, selectedElement.dimensions, hoverFace, rotation)
        }
    };

    const handleMouseLeave = () => {
        setHoverFace(null);
        hideGhostElement()
    };

    const geometryRef = React.useRef(null)



    return <>
        {displayGhost && (
            <GhostElement mockElement={{ ...displayGhost }} />
        )}

        <mesh
            ref={ref}
            receiveShadow
            castShadow
            onPointerOut={handleMouseLeave}
            onPointerMove={handleMouseOver}
            onClick={(event: any) => createElement(event, position, dimensions, hoverFace, rotation)}
        >
            {[...Array(6)].map((_, i) => {
                return <meshStandardMaterial
                    attachArray="material"
                    map={texture ? textures[texture] : null}
                    key={i}
                    color={i === hoverFace ? 'lightblue' : 'white'}
                />
            })}

            <boxBufferGeometry
                ref={geometryRef}
                attach="geometry"
                args={dimensions}
            />

            {/* <Edges
                scale={1}
                threshold={15} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
                color="white"
            /> */}

        </mesh>
    </>

}
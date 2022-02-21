import React from 'react';
import { Position } from '../../../types';
import { textures } from '../../textures';
import { useStore } from '../../store';

interface IGhostElementProps {
    mockElement: any
}
export const GhostElement: React.FunctionComponent<IGhostElementProps> = ({ mockElement }) => {

    const { position, texture, dimensions } = mockElement;

    const { createModeGostRotationIndex, changeCreateModeGostRotationIndex } = useStore();

    const [rotationIndex, setRotationIndex] = React.useState<number>(createModeGostRotationIndex);

    const rotateGhost = (e: KeyboardEvent) => {
        if (e.code === 'KeyR') {
            setRotationIndex(rotationIndex + 1);
            changeCreateModeGostRotationIndex();
        }
    }

    React.useEffect(() => {
        document.addEventListener('keydown', rotateGhost);
        return () => {
            document.removeEventListener('keydown', rotateGhost)
        }
    });

    return <mesh
        receiveShadow
        castShadow
        position={position}
        rotation={[0, 0 + rotationIndex * (Math.PI / 2), 0]}
    >
        {[...Array(6)].map((_, i) => {
            return <meshStandardMaterial
                attachArray="material"
                map={textures.test}
                key={i}
                color={'white'}
                opacity={0.4}
                transparent
            />
        })}

        <boxBufferGeometry
            attach="geometry"
            args={dimensions}
        />

    </mesh>
}
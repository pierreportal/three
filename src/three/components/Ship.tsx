import React from 'react';
import { useStore } from '../store';
import { CubeElement } from '../../types';
import { Box } from './baseMaterial/Box';


export const Ship: React.FunctionComponent = () => {
    const { plateforms } = useStore();

    return <group>
        {plateforms.map((p: CubeElement, i: number) => {
            return <Box key={JSON.stringify(p.pos)} position={p.pos as any} dimensions={p.dim} mass={0} texture={p.texture} rotation={p.rotation as any} />
        })}
    </group>
}
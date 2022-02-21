import React from 'react';
import { Euler } from 'three';
import { Position, Textures } from '../../../types';
import { Box } from './Box';

interface IPlateformProps {
    position: Position;
    texture: Textures;
    dimensions: any;
    rotation: Euler;
}

export const Platform: React.FunctionComponent<IPlateformProps> = ({ position, texture, dimensions, rotation }) => {
    return <Box position={position as any} dimensions={dimensions} mass={0} texture={texture} rotation={rotation} />
}
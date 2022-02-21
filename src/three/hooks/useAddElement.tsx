import React from 'react';
import { Dimensions, Position, TopBarTool } from '../../types';
import { useStore } from '../store';


export const useAddElement = () => {

    const { addPlateform, saveUniverse, removePlateform, selectedTool, texture } = useStore();
    const [displayGhost, setDisplayGhost] = React.useState<any | null>(null);

    const getPosNewElement = (position: Position, dimensions: Dimensions, hoverFace: number | null) => {
        const [x, y, z]: any = position;
        const [w, h, d]: any = dimensions;
        let pos: Position;
        switch (hoverFace) {
            case 0:
                pos = [x + w, y, z];
                break;
            case 1:
                pos = [x - w, y, z];
                break;
            case 2:
                pos = [x, y + h, z];
                break;
            case 3:
                pos = [x, y - h, z];
                break;
            case 4:
                pos = [x, y, z + d];
                break;
            default:
                pos = [x, y, z - d];
        }
        return pos;
    }

    const addElement = (position: Position, dimensions: Dimensions, hoverFace: number | null) => {
        const pos = getPosNewElement(position, dimensions, hoverFace);
        addPlateform(pos);
        saveUniverse()
    }

    const showGhostElement = (position: Position, dimensions: Dimensions, hoverFace: number | null) => {
        setDisplayGhost({
            position: getPosNewElement(position, dimensions, hoverFace),
            texture,
            dimensions
        });
    };

    const hideGhostElement = () => {
        setDisplayGhost(null);
    };

    const createElement = (event: any, position: Position, dimensions: Dimensions, hoverFace: number | null) => {
        event.stopPropagation();
        const { altKey } = event;
        if (selectedTool === TopBarTool.create) {
            if (altKey) {
                removePlateform(position);
                saveUniverse()
                return
            } else {
                addElement(position, dimensions, hoverFace);
            }
        } else if (selectedTool === TopBarTool.select) {
        }
    }

    return { createElement, showGhostElement, hideGhostElement, displayGhost }
}
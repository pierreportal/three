import React from 'react';
import { Dimensions, Position, TopBarTool } from '../../types';
import { useStore } from '../store';


export const useAddElement = () => {

    const {
        addPlateform,
        saveUniverse,
        removePlateform,
        selectedTool,
        texture,
        selectedElement,
    } = useStore();

    const [displayGhost, setDisplayGhost] = React.useState<any | null>(null);

    const getPosNewElement = (position: Position, dimensions: Dimensions, hoverFace: number | null, rotation: number) => {

        const [x, y, z]: any = position;
        const [w, h, d]: any = dimensions;

        const [newW, newH, newD] = selectedElement.dimensions;

        const [computedW, computedH, computedD] = [
            (newW / 2 + w / 2),
            (newH / 2 + h / 2),
            (newD / 2 + d / 2)
        ]

        let pos: Position = [x, y, z];

        if (rotation === 0) {
            switch (hoverFace) {
                case 0:
                    pos[0] += computedW
                    break;
                case 1:
                    pos[0] -= computedW
                    break;
                case 2:
                    pos[1] += computedH;
                    break;
                case 3:
                    pos[1] -= computedH;
                    break;
                case 4:
                    pos[2] += computedD;
                    break;
                default:
                    pos[2] -= computedD;
            }
            // rotaion 1
        } else if (rotation === 1) {
            switch (hoverFace) {
                case 0:
                    pos[2] -= computedW
                    break;
                case 1:
                    pos[2] += computedW
                    break;
                case 2:
                    pos[1] += computedH;
                    break;
                case 3:
                    pos[1] -= computedH;
                    break;
                case 4:
                    pos[0] += computedD;
                    break;
                default:
                    pos[0] -= computedD;
            }
        } else if (rotation === 2) {
            switch (hoverFace) {
                case 0:
                    pos[0] -= computedW
                    break;
                case 1:
                    pos[0] += computedW
                    break;
                case 2:
                    pos[1] += computedH;
                    break;
                case 3:
                    pos[1] -= computedH;
                    break;
                case 4:
                    pos[2] -= computedD;
                    break;
                default:
                    pos[2] += computedD;
            }
        } else if (rotation === 3) {
            switch (hoverFace) {
                case 0:
                    pos[2] += computedW
                    break;
                case 1:
                    pos[2] -= computedW
                    break;
                case 2:
                    pos[1] += computedH;
                    break;
                case 3:
                    pos[1] -= computedH;
                    break;
                case 4:
                    pos[0] -= computedD;
                    break;
                default:
                    pos[0] += computedD;
            }
        }


        return pos;
    }

    const addElement = (position: Position, dimensions: Dimensions, hoverFace: number | null, rotation: number) => {
        const pos = getPosNewElement(position, dimensions, hoverFace, rotation);
        addPlateform(pos);
        // saveUniverse()
    }

    const showGhostElement = (position: Position | any, dimensions: Dimensions | any, hoverFace: number | null, rotation: number) => {
        setDisplayGhost({
            position: getPosNewElement(position, dimensions, hoverFace, rotation),
            texture,
            dimensions
        });
    };

    const hideGhostElement = () => {
        setDisplayGhost(null);
    };

    const createElement = (event: any, position: Position, dimensions: Dimensions, hoverFace: number | null, rotation: number) => {
        event.stopPropagation();
        const { altKey } = event;
        if (selectedTool === TopBarTool.create) {
            if (altKey) {
                removePlateform(position);
                saveUniverse()
                return
            } else {
                addElement(position, dimensions, hoverFace, rotation);
            }
        } else if (selectedTool === TopBarTool.select) {
        }
    }

    return { createElement, showGhostElement, hideGhostElement, displayGhost }
}
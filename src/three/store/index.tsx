import create from 'zustand'
import { CubeElement, Dimensions, Position, Textures, TopBarTool } from '../../types';
import { textures } from '../textures';

const getLocalStorage = (key: string) => JSON.parse(window.localStorage.getItem(key) as string);
const setLocalStorage = (key: string, value: any) => window.localStorage.setItem(key, JSON.stringify(value));

const plateformElement = {
    label: 'plateform',
    dimensions: [1, 1, 1],
    defaultTexture: Textures.metal,
    textureChoice: [Textures.metal, Textures.pinkMetal]
};

const cubeElement = {
    label: 'cube',
    dimensions: [1, 1, 1],
    defaultTexture: Textures.pinkMetal,
    textureChoice: [Textures.greenMetal, Textures.pinkMetal]
};

export const availableElements = {
    plateformElement,
    cubeElement
}

export const useStore = create((set: any) => ({

    createModeGostRotationIndex: 0,

    selectedTool: TopBarTool.create,

    plateforms: getLocalStorage('universe') || [{ pos: [0, 0, 0], dim: [1, 1, 1], texture: Textures.test, rotation: 0 }],

    texture: Textures.test,

    selectedElement: cubeElement,

    addPlateform: (pos: Position) => (
        set((state: any) => {
            if (state.plateforms.find((p: CubeElement) => JSON.stringify(p.pos) === JSON.stringify(pos))) {
                return
            }
            return {
                plateforms: [
                    ...state.plateforms,
                    {
                        pos,
                        dim: state.selectedElement.dimensions,
                        texture: state.texture,
                        rotation: state.createModeGostRotationIndex
                    }
                ]
            }
        })
    ),

    changeCreateModeGostRotationIndex: () => set((state: any) => ({ ...state, createModeGostRotationIndex: (state.createModeGostRotationIndex + 1) % 4 })),

    removePlateform: (pos: any) => {
        set((state: any) => {
            return {
                plateforms: [...state.plateforms].filter((p: CubeElement) => JSON.stringify(p.pos) !== JSON.stringify(pos))
            }
        })
    },

    setCurrentTool: (selectedTool: TopBarTool) => set((state: any) => ({ ...state, selectedTool })),

    setTexture: (texture: Textures) => set((state: any) => ({ ...state, texture })),

    setBaseElement: (selectedElement: any) => set((state: any) => ({ ...state, selectedElement })),


    saveUniverse: () => set(((state: any) => {
        setLocalStorage("universe", state.plateforms)
    })),
}));
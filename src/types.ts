
import { Euler } from "react-three-fiber";
import { Vector3 } from "three";

export enum TopBarTool {
    create = 'create',
    select = 'select'
}




export enum Textures {
    metal = "metal",
    wood = "wood",
    pinkMetal = "pinkMetal",
    greenMetal = "greenMetal",
    test = "test"
}

export type Position = Vector3 | [number, number, number];
export type Dimensions = Vector3 | [number, number, number];


export type CubeElement = {
    pos: Position
    texture: Textures
    dim: Dimensions
    rotation: Euler
}
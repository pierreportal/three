import { Texture, TextureLoader } from "three";
import metalImg from "./images/metal.png";
import pinkMetalImg from "./images/pinkMetal.png";
import greenMetalImg from "./images/greenMetal.png";

import testImg from "./images/test.png";




const metalTexture: Texture = new TextureLoader().load(metalImg);
const pinkMetalTexture: Texture = new TextureLoader().load(pinkMetalImg);
const greenMetalTexture: Texture = new TextureLoader().load(greenMetalImg);

const testingTexture: Texture = new TextureLoader().load(testImg);




export const textures: any = {
    metal: metalTexture,
    pinkMetal: pinkMetalTexture,
    greenMetal: greenMetalTexture,
    test: testingTexture,
};
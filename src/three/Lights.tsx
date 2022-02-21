import React from 'react';

interface IOwnProps {
    pointLightSettings: any
}

export const Lights: React.FunctionComponent<IOwnProps> = ({ pointLightSettings }) => {

    const { on, intensity, position, shadowMapSizeHeight, shadowMapSizeWidth } = pointLightSettings

    return <>
        <ambientLight intensity={0.25} />
        <spotLight
            castShadow={on}
            intensity={intensity}
            position={position}
            shadow-mapSize-height={shadowMapSizeHeight}
            shadow-mapSize-width={shadowMapSizeWidth}
        />
    </>
}
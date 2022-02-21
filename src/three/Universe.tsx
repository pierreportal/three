import React from 'react';
import { MapControls, OrbitControls, Stars } from '@react-three/drei';
import { Physics } from '@react-three/cannon'
import { Lights } from './Lights';
import { FullCanvas } from './styles';
import { UniverseContext } from '../Context';

interface IUniverseProps {
    children: React.ReactNode
}
export const Universe: React.FunctionComponent<IUniverseProps> = ({ children }) => {

    const { pointLightSettings } = React.useContext(UniverseContext);

    return <FullCanvas shadows >
        {/* <OrbitControls
            maxZoom={100}
            minZoom={5}
            enableDamping={true}
        /> */}
        {/* <MapControls target={[10, 10, 10]} /> */}

        <Stars />
        <Lights pointLightSettings={pointLightSettings} />
        <Physics

            gravity={[0, -9.81, 0]}
            broadphase='SAP'

        >
            {children}
        </Physics>
    </FullCanvas >
}
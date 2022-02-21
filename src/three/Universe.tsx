import React from 'react';
import { OrbitControls, Stars } from '@react-three/drei';
import { Physics } from '@react-three/cannon'
import { Lights } from './Lights';
import { FullCanvas } from './styles';
import { UniverseContext } from '../Context';

interface IUniverseProps {
    children: React.ReactNode
}
export const Universe: React.FunctionComponent<IUniverseProps> = ({ children }) => {

    const { pointLightSettings } = React.useContext(UniverseContext);

    return <FullCanvas shadows>
        <OrbitControls
            maxZoom={100}
            minZoom={5}
            enableDamping={true}
        />
        <Stars />
        <Lights pointLightSettings={pointLightSettings} />
        <Physics gravity={[0, -30, 0]}>
            {children}
        </Physics>
    </FullCanvas>
}
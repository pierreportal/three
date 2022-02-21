import React from 'react';

interface IUniverseContext {
    pointLightSettings: any,
    setPointLightSettings: (settings: any) => void
}

export const UniverseContext = React.createContext<IUniverseContext>({
    pointLightSettings: {},
    setPointLightSettings: () => { }
});

interface IOwnProps {
    children: React.ReactNode
}

export const UniverseContextWrapper: React.FunctionComponent<IOwnProps> = ({ children }) => {

    const [pointLightSettings, setPointLightSettings] = React.useState({
        on: true,
        intensity: 0.7,
        position: [50, 50, 50],
        penumbra: 0,
        shadowMapSizeHeight: 144 * 40,
        shadowMapSizeWidth: 144 * 40
    });

    const contextValues = {
        pointLightSettings,
        setPointLightSettings
    }

    return <UniverseContext.Provider value={contextValues}>
        {children}
    </UniverseContext.Provider>;
}
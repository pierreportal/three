import React from 'react';
import { availableElements } from '../../three/store';
import { FloatPanel, PanelItem } from './style';

export const SidePanel: React.FunctionComponent = () => {

    enum PanelModes {
        base,
        texture
    }

    const { plateformElement, cubeElement } = availableElements;

    const baseElements = Object.values(availableElements).map((object: any) => object.label);

    const [panelMode, setPanelMode] = React.useState<PanelModes>(PanelModes.base);
    const [selectedBase, setSelectedBase] = React.useState(null);

    const handleBaseClick = (x: any) => {
        setSelectedBase(x)
        setPanelMode(PanelModes.texture)
    }

    const listOfBaseItems = baseElements.map(x => <PanelItem key={x} onClick={() => handleBaseClick(x)}>{x}</PanelItem>)


    return <FloatPanel>{listOfBaseItems}</FloatPanel>
}
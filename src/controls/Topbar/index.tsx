import React from 'react';
import { TopBarTool } from '../../types';
import { FloatTopBar, ToolItem } from './styles';
import { useStore } from '../../three/store';

export const Topbar: React.FunctionComponent = () => {

    const [selectedTool, setSelectedTool] = React.useState<TopBarTool>(TopBarTool.create);
    const { setCurrentTool } = useStore();

    const items = [TopBarTool.create, TopBarTool.select].map(x => (
        <ToolItem
            key={x}
            onClick={() => {
                setSelectedTool(x);
                setCurrentTool(x)
            }}
        >
            {x}
        </ToolItem>
    ));

    return <FloatTopBar>
        {items}
    </FloatTopBar>
}
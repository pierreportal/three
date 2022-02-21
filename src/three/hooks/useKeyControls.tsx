import React, { useEffect } from 'react';

const keyActions = (key: string) => {
    const keys: any = {
        KeyW: 'moveForward',
        KeyS: 'moveBackward',
        KeyA: 'moveLeft',
        KeyD: 'moveRight',
    };
    return keys[key];
};

export const useKeyControlls = () => {
    const [movement, setMovement] = React.useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false
    });

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        }
    });

    const handleKeyDown = (event: any) => {
        if (keyActions(event.code)) {
            setMovement((state: any) => ({ ...state, [keyActions(event.code)]: true }));
        };
    }
    const handleKeyUp = (event: any) => {
        if (keyActions(event.code)) {
            setMovement((state: any) => ({ ...state, [keyActions(event.code)]: false }));
        };
    }

    return movement;
};
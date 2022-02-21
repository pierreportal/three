import { OrthographicCamera } from '@react-three/drei';
import React from 'react';
import { useThree } from 'react-three-fiber';


export const Camera = (props: any) => {
    const GRID_SIZE = 40
    const set = useThree(({ set }) => set)
    const { size: { width, height } } = useThree()
    const camera = React.useRef()

    const aspect = width > height ? height / width : width / height
    const [zoom, setZoom] = React.useState(aspect * 50)

    React.useEffect(() => {
        set({ camera: camera!.current! })
        if (camera.current) {
            (camera.current as any).rotation.order = 'YXZ';
            (camera.current as any).translateZ(GRID_SIZE);
            window.addEventListener('wheel', (e) => {
                if (e.deltaY < 0 && (camera.current as any)?.zoom <= aspect * 300) setZoom((camera.current as any)?.zoom - (e.deltaY / 120) * 10)
                if (e.deltaY > 0 && (camera.current as any)?.zoom >= aspect * 50) setZoom((camera.current as any)?.zoom - (e.deltaY / 120) * 10)
            })
        }
    }, [aspect, set])

    return (
        <OrthographicCamera
            ref={camera}
            zoom={zoom}
            near={0}
            far={500}
            rotation={[Math.atan(-1 / Math.sqrt(2)), -Math.PI / 4, 0]}
            onUpdate={(self) => self.updateProjectionMatrix()}
            {...props}
        />
    )
}
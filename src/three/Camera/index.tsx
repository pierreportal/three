import { OrthographicCamera } from '@react-three/drei';
import React from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { useKeyControlls } from '../hooks/useKeyControls';


export const Camera = (props: any) => {
    const GRID_SIZE = 40
    const set = useThree(({ set }) => set)
    const { size: { width, height } } = useThree()
    const camera = React.useRef();

    const aspect = width > height ? height / width : width / height
    const [zoom, setZoom] = React.useState(aspect * 50)




    React.useEffect(() => {
        // const { playerApi } = props;

        set({ camera: camera!.current! })

        if (camera.current) {

            // console.log((camera.current as any).left)

            // let cameraPos = (camera.current as any).position;

            // const [cx, cy, cz] = Object.values(cameraPos);

            // playerApi.position.subscribe((playerPos: any) => {

            //     const [px, py, pz] = playerPos;
            //     const { left, top } = (camera.current as any);
            //     (camera.current as any).left = left + 0.01;

            // });
            (camera.current as any).translateZ(GRID_SIZE);
            (camera.current as any).translateX(10);

            // (camera.current as any).lookAt(10, 10, 10)

            window.addEventListener('wheel', (e) => {
                if (e.deltaY < 0 && (camera.current as any)?.zoom <= aspect * 300) setZoom((camera.current as any)?.zoom - (e.deltaY / 120) * 10)
                if (e.deltaY > 0 && (camera.current as any)?.zoom >= aspect * 50) setZoom((camera.current as any)?.zoom - (e.deltaY / 120) * 10)
            })
        }
    }, [aspect, set])

    return (
        <OrthographicCamera
            // translateX={10000}
            ref={camera}
            zoom={zoom}
            near={0}
            // lookAt={[10, 10, 10]}
            far={500}
            rotation={[Math.atan(-1 / Math.sqrt(2)), -Math.PI / 4, 0]}
            onUpdate={(self) => self.updateProjectionMatrix()}
            {...props}
        />
    )
}
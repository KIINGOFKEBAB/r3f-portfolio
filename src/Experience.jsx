import { Text, Html, ContactShadows, PresentationControls, Float, Environment, useGLTF, useProgress} from '@react-three/drei'
import { Suspense } from 'react'
import { useFrame, useStore, useThree} from '@react-three/fiber'
import { Vector3 } from 'three'

function Loader() {
    const { progress } = useProgress()
    return <Html center>{progress} % loaded</Html>
}

export default function Experience()
{
    const computer = useGLTF('https://threejs-journey.com/resources/models/macbook_model.gltf')

    const computerPosition = computer.scene.position

    console.log(computerPosition);

    const { camera } = useThree()


    const eventEnter = () => {
        /*camera.position.x += 1
        camera.position.z += -1
        camera.lookAt(new Vector3(0, 1.56, -1.4))*/
    }

    const eventLeave = (object) => {
        /*camera.position.x += -1*/
    }

    return <>

        <Suspense fallback={<Loader/>}>
        <Environment preset="city"></Environment>

        <color args={['#241a1a']} attach="background"/>

        <PresentationControls 
        global
        rotation={[0.13,0.1,0]}$
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{mass: 2, tension: 400}}
        snap={{mass: 2, tension: 400}}
        >

        <Float rotationIntensity={0.4}>

            <rectAreaLight 
            width={2.5}
            height={1.65}
            intensity={65}
            color={ '#ff6900'}
            rotation={[0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
            />

            <primitive 
            object={ computer.scene}
            position-y={-1.2}>
            <Html transform wrapperClass='htmlScreen' distanceFactor={1.17}
            position={[ 0 , 1.56, -1.4]}
            rotation-x={ - 0.256}
            >
                <div onMouseEnter={eventEnter} onMouseLeave={eventLeave} >
                    <iframe src='./portfolio/index.html'></iframe>
                </div>
            </Html>
            </primitive>
            
            <Text
            font='./bangers-v20-latin-regular.woff'
            fontSize={1}
            position={[2,0.75,0.75]}
            rotation-y={-1.25}
            maxWidth={2}
            textAlign='center'
            >Karim Charpié</Text>

        </Float>

        </PresentationControls>

        <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4}/>

        </Suspense>
        
    </>
}
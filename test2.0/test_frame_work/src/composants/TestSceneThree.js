import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Plane, Sphere } from '@react-three/drei';
import { Text } from '@react-three/drei';

const TestSceneThree = () => {
    const [currentScene, setCurrentScene] = useState('Scene1'); // Gestion des scènes

    return (
        <Canvas
            camera={{ position: [0, 5, 10], fov: 60 }}
            style={{ width: '100%', height: '400px' }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />

            {currentScene === 'Scene1' && (
                <Scene1 onSwitchScene={() => setCurrentScene('Scene2')} />
            )}
            {currentScene === 'Scene2' && (
                <Scene2 onSwitchScene={() => setCurrentScene('Scene1')} />
            )}

            <OrbitControls />
        </Canvas>
    );
};

export default TestSceneThree;

// --- Scène 1 ---
const Scene1 = ({ onSwitchScene }) => {
    const sphereRef = useRef();
    const { viewport } = useThree();

    useFrame(() => {
        if (sphereRef.current.position.x > viewport.width / 2) {
            onSwitchScene();
        }
    });

    return (
        <>
            <Environment />
            <MovingSphere ref={sphereRef} direction="right" />
            <Text
                position={[0, 2, 0]}
                fontSize={1}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                Scene 1
            </Text>
        </>
    );
};

// --- Scène 2 ---
const Scene2 = ({ onSwitchScene }) => {
    const sphereRef = useRef();
    const { viewport } = useThree();

    useFrame(() => {
        if (sphereRef.current.position.x < -viewport.width / 2) {
            onSwitchScene();
        }
    });

    return (
        <>
            <Environment bgColor="#003366" />
            <MovingSphere ref={sphereRef} direction="left" />
            <Text
                position={[0, 2, 0]}
                fontSize={1}
                color="yellow"
                anchorX="center"
                anchorY="middle"
            >
                Scene 2
            </Text>
        </>
    );
};

// --- Environnement 3D ---
const Environment = ({ bgColor = '#0077cc' }) => {
    return (
        <>
            <mesh>
                <Plane args={[50, 50]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                    <meshStandardMaterial color="lightgrey" />
                </Plane>
            </mesh>
            <color attach="background" args={[bgColor]} />
        </>
    );
};

// --- Sphère mobile ---
const MovingSphere = React.forwardRef(({ direction }, ref) => {
    const velocity = direction === 'right' ? 0.05 : -0.05;

    useFrame(() => {
        if (ref.current) {
            ref.current.position.x += velocity;
        }
    });

    return (
        <Sphere ref={ref} args={[0.5, 32, 32]} position={[0, 0.5, 0]} castShadow>
            <meshStandardMaterial color="red" />
        </Sphere>
    );
});

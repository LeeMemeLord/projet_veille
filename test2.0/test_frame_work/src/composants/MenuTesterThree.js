import React, { useState, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';

const Icon = () => {
    const [hovered, setHovered] = useState(false);
    const meshRef = useRef();

    useFrame(() => {
        if (meshRef.current) {
            if (hovered) {
                meshRef.current.position.y = Math.sin(Date.now() * 0.005) * 0.2;
            } else {
                meshRef.current.position.y = 0;
            }
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={[-3, 2, 0]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
        >
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="blue" />
            <Text
                position={[0, 0.6, 0]}
                fontSize={0.2}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                Hover Me
            </Text>
        </mesh>
    );
};

const Title = () => {
    return (
        <Text
            position={[0, 3, 0]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
        >
            Menu Test Three.js
        </Text>
    );
};

const Button = ({ position, onClick }) => {
    return (
        <mesh position={position} onClick={onClick}>
            <boxGeometry args={[1, 0.5, 0.2]} />
            <meshStandardMaterial color="blue" />
            <Text
                position={[0, 0, 0.15]}
                fontSize={0.2}
                color="white"
                anchorX="center"
                anchorY="middle"
            >
                Click Me
            </Text>
        </mesh>
    );
};

const MenuTesterThree = () => {
    const [position, setPosition] = useState([0, 0, 0]);
    const [rotateCamera, setRotateCamera] = useState(false); // Track if the camera should rotate
    const [rotationProgress, setRotationProgress] = useState(0); // Track rotation progress

    const randomizePosition = () => {
        const maxDistance = 2; // Maximum distance from the origin (center)
        const newPosition = [
            Math.random() * (maxDistance * 1.5) - maxDistance,
            Math.random() * (maxDistance * 1.5) - maxDistance,
            Math.random() * (maxDistance * 1.5) - maxDistance,
        ];

        setPosition(newPosition);
    };

    // Handle camera rotation inside Canvas component
    return (
        <div style={{ width: '100vw', height: '100vh', background: 'grey' }}>
            <Canvas>
                <ambientLight intensity={0.5} />
                <pointLight position={[5, 5, 5]} />

                {/* Camera rotation logic */}
                <CameraRotation
                    rotate={rotateCamera}
                    rotationProgress={rotationProgress}
                />

                <Title />
                <Icon />
                <Button position={position} onClick={() => {
                    setRotateCamera(true);
                    setRotationProgress(0); // Reset rotation progress
                    // Rotate camera for 360 degrees (2 seconds)
                    const rotationInterval = setInterval(() => {
                        setRotationProgress(prev => {
                            if (prev >= 1) {
                                clearInterval(rotationInterval);
                                setRotateCamera(false); // Stop rotating after 360° complete
                                return 1;
                            }
                            return prev + 0.01; // Increment rotation progress
                        });
                    }, 20); // Increase the value for faster rotation
                    randomizePosition();
                }} />
            </Canvas>
        </div>
    );
};

// Component to handle camera rotation
const CameraRotation = ({ rotate, rotationProgress }) => {
    const { camera } = useThree(); // Access the camera

    useFrame(() => {
        if (rotate) {
            const rotationAmount = rotationProgress * Math.PI * 2; // 360 degrees in radians
            camera.rotation.y = rotationAmount; // Rotate the camera on the Y-axis
        }
    });

    return null; // No need to render anything
};

export default MenuTesterThree;

import React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Sphere, Box, OrbitControls } from "@react-three/drei";

const SpinningCube = () => {
    const cubeRef = useRef();
    const [direction, setDirection] = useState(1);

    useFrame(() => {
        cubeRef.current.rotation.x += 0.01;
        cubeRef.current.rotation.y += 0.01;

        if (cubeRef.current.position.x >= 3) {
            setDirection(-1);
        }
        if (cubeRef.current.position.x <= -3) {
            setDirection(1);
        }
        cubeRef.current.position.x += 0.05 * direction;
    });

    return (
        <mesh ref={cubeRef} position={[-2, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="green" />
        </mesh>
    );
};

const BouncingSphere = () => {
    const sphereRef = useRef();
    const [direction, setDirection] = useState(1);
    const [size, setSize] = useState(1);
    const [scaleDirection, setScaleDirection] = useState(-0.01);

    useFrame(() => {
        if (sphereRef.current.position.y >= 2) setDirection(-1);
        if (sphereRef.current.position.y <= -2) setDirection(1);
        sphereRef.current.position.y += 0.05 * direction;

        if (size <= 0.2) {
            setScaleDirection(0.01);
        }
        if (size >= 1) {
            setScaleDirection(-0.01);
        }

        setSize(size + scaleDirection);
        sphereRef.current.scale.set(size, size, size);
    });

    return (
        <Sphere args={[size, 32, 32]} ref={sphereRef} position={[2, 0, 0]}>
            <meshStandardMaterial color="blue" metalness={0.5} />
        </Sphere>
    );
};

const ThreeCanvas = () => {
    return (
        <Canvas
            style={{
                width: '100vw',
                height: '100vh',
            }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} />

            <SpinningCube />
            <BouncingSphere />

            <OrbitControls />
        </Canvas>
    );
};

export default ThreeCanvas;

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const TestSpriteThreeJS = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        // Créer une scène
        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 3;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth,window.innerHeight);
        renderer.setClearColor(0xff0000);
        canvas.appendChild(renderer.domElement);

        const frameTextures = [];
        const textureLoader = new THREE.TextureLoader();


        for (let i = 0; i <= 9; i++) {
            frameTextures.push(
                textureLoader.load(require(`../assets/sprite/_PNG/3_KNIGHT/Knight_03__IDLE_00${i}.png`))
            );
        }

        const geometry = new THREE.PlaneGeometry(1.5, 1.5);
        const material = new THREE.MeshBasicMaterial({
            map: frameTextures[0], // Frame initiale
            transparent: true,
        });
        const knight = new THREE.Mesh(geometry, material);
        knight.scale.set(5 , 5);
        scene.add(knight);

        let frame = 0;
        const totalFrames = frameTextures.length;
        const frameDelay = 45;
        let lastUpdateTime = Date.now();

        const animate = () => {
            requestAnimationFrame(animate);

            const currentTime = Date.now();

            if (currentTime - lastUpdateTime >= frameDelay) {
                frame = (frame + 1) % totalFrames;
                knight.material.map = frameTextures[frame];
                knight.material.needsUpdate = true;
                lastUpdateTime = currentTime;
            }

            knight.position.x += 0.001;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            while (canvas.firstChild) {
                canvas.removeChild(canvas.firstChild);
            }
        };
    }, []);

    return (
        <div>
            <h1>Animation Sprite(image) Three.js</h1>
            <div style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }} ref={canvasRef}></div>
        </div>
    );
};

export default TestSpriteThreeJS;

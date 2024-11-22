import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import bgMusic from '../assets/music/game_music.mp3';
import bgMusic2 from '../assets/music/medival_music.mp3';

const TestAudioThree = () => {
    const [music1Playing, setMusic1Playing] = useState(false);
    const [music2Playing, setMusic2Playing] = useState(false);
    const [music1Volume, setMusic1Volume] = useState(1); // volume initial à 100%
    const [music2Volume, setMusic2Volume] = useState(1); // volume initial à 100%

    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);

    const music1Ref = useRef(null);
    const music2Ref = useRef(null);

    useEffect(() => {
        // Setup de la scène Three.js
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        sceneRef.current = scene;
        cameraRef.current = camera;
        rendererRef.current = renderer;

        // AudioListener
        const listener = new THREE.AudioListener();
        camera.add(listener);

        const audioLoader = new THREE.AudioLoader();
        audioLoader.load(bgMusic, (buffer) => {
            music1Ref.current = new THREE.Audio(listener);
            music1Ref.current.setBuffer(buffer);
            music1Ref.current.setLoop(true);
            music1Ref.current.setVolume(music1Volume);
        });

        audioLoader.load(bgMusic2, (buffer) => {
            music2Ref.current = new THREE.Audio(listener);
            music2Ref.current.setBuffer(buffer);
            music2Ref.current.setLoop(true);
            music2Ref.current.setVolume(music2Volume);
        });

        const animate = function () {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

        return () => {
            renderer.dispose();
        };
    }, []);

    useEffect(() => {
        if (music1Ref.current) {
            music1Ref.current.setVolume(music1Volume);
        }
    }, [music1Volume]);

    useEffect(() => {
        if (music2Ref.current) {
            music2Ref.current.setVolume(music2Volume);
        }
    }, [music2Volume]);

    const playMusic1 = () => {
        if (music2Playing) stopMusic2();
        setMusic1Playing(true);
        if (music1Ref.current && !music1Ref.current.isPlaying) {
            music1Ref.current.play();
        }
    };

    const playMusic2 = () => {
        if (music1Playing) stopMusic1();
        setMusic2Playing(true);
        if (music2Ref.current && !music2Ref.current.isPlaying) {
            music2Ref.current.play();
        }
    };

    const stopMusic1 = () => {
        setMusic1Playing(false);
        if (music1Ref.current && music1Ref.current.isPlaying) {
            music1Ref.current.stop();
        }
    };

    const stopMusic2 = () => {
        setMusic2Playing(false);
        if (music2Ref.current && music2Ref.current.isPlaying) {
            music2Ref.current.stop();
        }
    };

    return (
        <div>
            <div ref={sceneRef} style={{width: '100%', height: '100vh'}}>
                <div style={{textAlign: 'center'}}>
                    <div>
                        <button onClick={playMusic1}>Play Music 1</button>
                        <button onClick={stopMusic1}>Stop Music 1</button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={music1Volume}
                            onChange={(e) => setMusic1Volume(parseFloat(e.target.value))}
                        />
                    </div>
                    <div style={{marginTop: '20px'}}>
                        <button onClick={playMusic2}>Play Music 2</button>
                        <button onClick={stopMusic2}>Stop Music 2</button>
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={music2Volume}
                            onChange={(e) => setMusic2Volume(parseFloat(e.target.value))}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestAudioThree;

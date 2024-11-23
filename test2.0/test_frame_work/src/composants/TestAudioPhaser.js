import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import bgMusic from '../assets/music/game_music.mp3';
import bgMusic2 from '../assets/music/medival_music.mp3';

const TestAudioPhaser = () => {
    const [music1Playing, setMusic1Playing] = useState(false);
    const [music2Playing, setMusic2Playing] = useState(false);
    const [music1Volume, setMusic1Volume] = useState(1); // volume initial à 100%
    const [music2Volume, setMusic2Volume] = useState(1); // volume initial à 100%

    const phaserGameRef = useRef(null);
    const music1Ref = useRef(null);
    const music2Ref = useRef(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: phaserGameRef.current,
            backgroundColor: '#ffffff',
            scene: {
                preload: function () {
                    this.load.audio('music1', bgMusic);
                    this.load.audio('music2', bgMusic2);
                },
                create: function () {
                    music1Ref.current = this.sound.add('music1', { loop: true, volume: music1Volume });
                    music2Ref.current = this.sound.add('music2', { loop: true, volume: music2Volume });
                },
            }
        };

        const game = new Phaser.Game(config);

        return () => {
            game.destroy(true);
        };
    }, []);

    // Met à jour les volumes lorsque les sliders changent
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
        setMusic1Playing(true);
        if (music1Ref.current) {
            music1Ref.current.play();
        }
    };

    const stopMusic1 = () => {
        setMusic1Playing(false);
        if (music1Ref.current) {
            music1Ref.current.stop();
        }
    };

    const playMusic2 = () => {
        setMusic2Playing(true);
        if (music2Ref.current) {
            music2Ref.current.play();
        }
    };

    const stopMusic2 = () => {
        setMusic2Playing(false);
        if (music2Ref.current) {
            music2Ref.current.stop();
        }
    };

    return (
        <div style={{ position: 'relative', width: '800px', height: '600px' }}>
            <div ref={phaserGameRef} style={{ position: 'absolute', top: 0, left: 0 }}></div>

            <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>
                <h3>Music 1 Controls</h3>
                <button onClick={playMusic1}>Play Music 1</button>
                <button onClick={stopMusic1} style={{ marginLeft: '10px' }}>Stop Music 1</button>
                <br />
                <label htmlFor="music1-volume">Volume:</label>
                <input
                    id="music1-volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={music1Volume}
                    onChange={(e) => setMusic1Volume(parseFloat(e.target.value))}
                    style={{ marginLeft: '10px' }}
                />
            </div>

            <div style={{ position: 'absolute', top: '10px', left: '500px', zIndex: 1 }}>
                <h3>Music 2 Controls</h3>
                <button onClick={playMusic2}>Play Music 2</button>
                <button onClick={stopMusic2} style={{ marginLeft: '10px' }}>Stop Music 2</button>
                <br />
                <label htmlFor="music2-volume">Volume:</label>
                <input
                    id="music2-volume"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={music2Volume}
                    onChange={(e) => setMusic2Volume(parseFloat(e.target.value))}
                    style={{ marginLeft: '10px' }}
                />
            </div>
        </div>
    );
};

export default TestAudioPhaser;

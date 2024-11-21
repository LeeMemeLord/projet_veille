import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const TestSpritePh = () => {
    const gameContainerRef = useRef(null);

    useEffect(() => {
        if (gameContainerRef.current && !gameContainerRef.current.phaserGame) {
            const config = {
                type: Phaser.AUTO,
                width: 900,
                height: 600,
                parent: gameContainerRef.current,
                backgroundColor: '#FF0000',
                scene: {
                    preload,
                    create,
                    update,
                },
            };

            const game = new Phaser.Game(config);
            gameContainerRef.current.phaserGame = game;

            function preload() {
                for (let i = 0; i <= 9; i++) {
                    this.load.image(`attack_${i}`, require(`../assets/sprite/_PNG/3_KNIGHT/Knight_03__ATTACK_00${i}.png`));
                }
                for (let i = 0; i <= 9; i++) {
                    this.load.image(`idle_${i}`, require(`../assets/sprite/_PNG/3_KNIGHT/Knight_03__IDLE_00${i}.png`));
                }
            }

            function create() {
                const idleFrames = Array.from({ length: 10 }, (_, i) => ({ key: `idle_${i}` }));
                const attackFrames = Array.from({ length: 10 }, (_, i) => ({ key: `attack_${i}` }));

                this.anims.create({ key: 'idle', frames: idleFrames, frameRate: 20, repeat: -1 });
                this.anims.create({ key: 'attack', frames: attackFrames, frameRate: 20, repeat: 0 });

                this.player = this.add.sprite(400, 300, 'idle_0').play('idle');
            }

            function update() {
                this.player.x += 0.1; // Slow movement for testing
            }

        }

        return () => {
            if (gameContainerRef.current && gameContainerRef.current.phaserGame) {
                gameContainerRef.current.phaserGame.destroy(true);
                gameContainerRef.current.phaserGame = null;
            }
        };
    }, []);

    return (
        <div>
            <h1>Animation Sprite(image) Phaser.js</h1>
            <div ref={gameContainerRef}></div>
        </div>
    );
};

export default TestSpritePh;

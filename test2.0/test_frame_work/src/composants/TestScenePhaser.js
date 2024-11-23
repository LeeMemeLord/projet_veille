import React, { useEffect } from 'react';
import Phaser from 'phaser';
import Knight from '../assets/sprite/_PNG/3_KNIGHT/Knight_03__IDLE_000.png';
import bg from '../assets/sprite/bg.png';
import bg2 from '../assets/sprite/bg2.png';

const TestScenePhaser = () => {
    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 400,
            backgroundColor: '#2d2d2d',
            parent: 'phaser-container',
            scene: [LoadingScene, GameScene, NextScene],
            physics: {
                default: 'arcade',
                arcade: {
                    debug: false,
                },
            },
        };

        const game = new Phaser.Game(config);

        return () => {
            game.destroy(true);
        };
    }, []);

    return <div id="phaser-container" />;
};

export default TestScenePhaser;

class LoadingScene extends Phaser.Scene {
    constructor() {
        super({ key: 'LoadingScene' });
    }

    preload() {
        this.load.image('background', bg);
        this.load.image('bg2', bg2);
        this.load.image('player', Knight);
    }

    create() {
        this.registry.set('playerPosition', { x: 100, y: 300 });
        this.scene.start('GameScene');
    }
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        this.background = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'background');
        this.background.setOrigin(0, 0);
        this.background.setScale(2.5);

        let playerPosition = this.registry.get('playerPosition');

        if (playerPosition && playerPosition.scene === 'NextScene') {
            playerPosition = { x: 780, y: 300 };
        } else {
            playerPosition = playerPosition || { x: 100, y: 300 };
        }

        this.player = this.add.sprite(playerPosition.x, playerPosition.y, 'player');
        this.player.setScale(0.2);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.add.text(300, 150, 'Next Scene 1', {
            font: '40px Arial',
            fill: '#ffffff',
        });
    }

    update() {
        if (this.cursors.right.isDown) {
            this.player.x += 5;
        } else if (this.cursors.left.isDown) {
            this.player.x -= 5;
        }

        this.registry.set('playerPosition', { x: this.player.x, y: this.player.y, scene: 'GameScene' });

        if (this.player.x >= 800) {
            this.scene.start('NextScene');
        }
    }
}

class NextScene extends Phaser.Scene {
    constructor() {
        super({ key: 'NextScene' });
    }

    create() {
        this.background2 = this.add.tileSprite(0, 0, this.scale.width, this.scale.height, 'bg2');
        this.background2.setOrigin(0, 0);
        this.background2.setScale(2.5);

        let playerPosition = this.registry.get('playerPosition');

        if (playerPosition && playerPosition.scene === 'GameScene') {
            playerPosition = { x: 20, y: 300 };
        } else {
            playerPosition = playerPosition || { x: 100, y: 300 };
        }

        this.player = this.add.sprite(playerPosition.x, playerPosition.y, 'player');
        this.player.setScale(0.2);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.add.text(300, 150, 'Next Scene 2', {
            font: '40px Arial',
            fill: '#ffffff',
        });
    }

    update() {
        if (this.cursors.right.isDown) {
            this.player.x += 5;
        } else if (this.cursors.left.isDown) {
            this.player.x -= 5;
        }

        this.registry.set('playerPosition', { x: this.player.x, y: this.player.y, scene: 'NextScene' });

        if (this.player.x < 0) {
            this.player.x = 800;
            this.scene.start('GameScene');
        } else if (this.player.x < 0) {
            this.player.x = 0;
        }
    }
}
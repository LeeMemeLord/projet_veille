import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';

const MenuTesterPhaser = () => {
    const gameRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            parent: gameRef.current,
            width: 800,
            height: 600,
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            scene: {
                preload: preload,
                create: create,
                update: update,
            },
        };

        const game = new Phaser.Game(config);

        function preload() {}

        function create() {
            this.cameras.main.setBackgroundColor('violet');
            this.add.text(335, 50, 'Menu Test Phaser.js', {
                font: '32px Arial',
                fill: 'white',
            });

            let button1 = this.add.rectangle(400, 275, 120, 50, 0x007bff).setInteractive();
            let buttonText1 = this.add.text(370, 265, 'Click Me', {
                font: '20px Arial',
                fill: '#fff',
            });

            button1.on('pointerdown', () => {
                const explosion = this.add.container(button1.x, button1.y);

                for (let i = 0; i < 10; i++) {
                    const particle = this.add.circle(0, 0, 10, 0xffff00); // Particule jaune
                    explosion.add(particle);

                    this.tweens.add({
                        targets: particle,
                        x: Phaser.Math.Between(button1.x - 100, button1.x + 100),
                        y: Phaser.Math.Between(button1.y - 100, button1.y + 100),
                        alpha: 0,
                        scaleX: 0,
                        scaleY: 0,
                        duration: 20000,
                        ease: 'Power2',
                        onComplete: () => {
                            particle.destroy();
                        },
                    });
                }
                const newX = Phaser.Math.Between(100, 700);
                const newY = Phaser.Math.Between(100, 500);

                button1.setPosition(newX, newY);
                buttonText1.setPosition(newX - 30, newY - 10);
                button1.setFillStyle(0xff0000);

                this.tweens.add({
                    targets: this.cameras.main,
                    x: 1000,
                    duration: 2000,
                    ease: 'Power2',
                    onComplete: () => {
                        this.tweens.add({
                            targets: this.cameras.main,
                            x: 0,
                            duration: 2000,
                            ease: 'Power2',
                        });
                    },
                });
            });

            button1.on('pointerover', () => {
                button1.setFillStyle(0x0056b3);
            });

            button1.on('pointerout', () => {
                button1.setFillStyle(0x007bff);
            });

            let button2 = this.add.rectangle(400, 375, 120, 50, 0x28a745).setInteractive(); // Vert
            let buttonText2 = this.add.text(370, 365, 'Hover me', {
                font: '15px Arial',
                fill: '#fff',
            });

            let halo;

            button2.on('pointerover', () => {
                button2.setFillStyle(0x218838);

                halo = this.add.graphics({ x: button2.x, y: button2.y });
                halo.lineStyle(6, 0x218838, 1);
                halo.strokeCircle(0, 0, 70);

                this.tweens.add({
                    targets: halo,
                    scaleX: 1.5,
                    scaleY: 1.5,
                    duration: 500,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut',
                });
            });

            button2.on('pointerout', () => {
                button2.setFillStyle(0x28a745);

                if (halo) {
                    halo.destroy();
                }
            });
        }

        function update() {}

        const resize = () => {
            const canvas = game.canvas;
            const parent = gameRef.current;
            if (canvas && parent) {
                const parentWidth = parent.clientWidth;
                const parentHeight = parent.clientHeight;
                const width = game.config.width;
                const height = game.config.height;

                const scale = Math.min(parentWidth / width, parentHeight / height);

                canvas.style.width = `${width * scale}px`;
                canvas.style.height = `${height * scale}px`;
            }
        };

        window.addEventListener('resize', resize);
        resize();

        return () => {
            window.removeEventListener('resize', resize);
            game.destroy(true);
        };
    }, []);


    return (
        <div
            ref={gameRef}
            style={{
                width: '100%',
                height: '100vh',
                margin: '0 auto',

            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        />
    );
};

export default MenuTesterPhaser;

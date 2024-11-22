import React, { useEffect } from "react";
import Phaser from "phaser";

const PhaserGame = () => {
    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: "phaser-container",
            scene: {
                preload,
                create,
                update,
            },
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 0 },
                    debug: false,
                },
            },
        };

        const game = new Phaser.Game(config);

        let rectangle;
        let circle;
        let direction = 1;

        function preload() {
            this.load.image("spark", "https://labs.phaser.io/assets/particles/blue.png");
        }

        function create() {
            rectangle = this.add.rectangle(400, 300, 50, 50, 0x00ff00);
            this.physics.add.existing(rectangle);
            rectangle.body.setVelocity(100, 200).setBounce(1, 1).setCollideWorldBounds(true);

            circle = this.add.circle(200, 150, 30, 0xff0000);
            this.physics.add.existing(circle);
            circle.body.setVelocity(200, 150).setBounce(1, 1).setCollideWorldBounds(true);


            this.tweens.add({
                targets: rectangle,
                angle: 360,
                duration: 2000,
                repeat: -1,
            });

            this.tweens.add({
                targets: circle,
                y: 450,
                duration: 3000,
                yoyo: true,
                repeat: -1,
                ease: "Bounce.easeInOut",
                onUpdate: () => {
                    circle.fillColor = Phaser.Display.Color.RandomRGB().color;
                },
            });
        }

        function update() {
            rectangle.x += 2 * direction;
            if (rectangle.x <= 25 || rectangle.x >= 775) {
                direction *= -1;
            }
        }


        return () => {
            game.destroy(true);
        };
    }, []);

    return <div id="phaser-container" />;
};

export default PhaserGame;

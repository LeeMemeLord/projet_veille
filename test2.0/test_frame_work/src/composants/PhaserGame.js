import React, { useEffect } from "react";
import Phaser from "phaser";

const PhaserGame = () => {
    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            scene: {
                preload: preload,
                create: create,
                update: update,
            },
        };
        const game = new Phaser.Game(config);

        let rectangle;
        let velocity = 2;
        let direction = 1;

        function preload() {
        }

        function create() {
            rectangle = this.add.rectangle(400, 300, 50, 50, 0x00ff00);
        }

        function update() {
            rectangle.x += velocity * direction;

            if (rectangle.x <= 25 || rectangle.x >= 775) {
                direction *= -1;
            }
        }

        return () => {
            game.destroy(true);
        };
    }, []);

    return <div id="phaser-container"></div>;
};

export default PhaserGame;

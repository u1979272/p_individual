import { PlayScene } from "./scene.js";

var config = {
    type: Phaser.AUTO,
    domCreateContainer: true,
    width: 800,
    height: 600,
    parent: 'game',
    scene: [PlayScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 0},
            debug: false
        }
    }
}

var game = new Phaser.Game(config);



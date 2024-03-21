import Phaser from 'phaser';
import GameScene from './GameScene';

const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    parent: 'canvas-container',
    scene: [GameScene]
};

const game = new Phaser.Game(config);
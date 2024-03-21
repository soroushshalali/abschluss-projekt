import generateJoke from "./generateJoke";
import './styles/main.scss';
// import Phaser from "./../node_modules/phaser/dist/phaser.min.js";
import Phaser from 'phaser';

console.log(generateJoke());

var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    parent: 'canvas-container',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let score = 0;

function preload() {
    this.load.image('bg', 'src/img/bg-game.png');

	this.load.atlas('elements-atlas', 'src/spritesheets/game-elements.png', 'src/spritesheets/game-elements.json');
}

function create() {
    this.add.image(480, 540, 'bg').setOrigin(0.5, 1);
    const obstacle1 = this.add.image(780, 540, 'elements-atlas', 'obstacle1').setOrigin(0.5, 1);
    const obstacle2 = this.add.image(480, 540, 'elements-atlas', 'obstacle2').setOrigin(0.5, 1);
    const obstacle3 = this.add.image(120, 540, 'elements-atlas', 'obstacle3').setOrigin(0.5, 1);


    this.enemysOffset = 100;
    this.obstacle1EnemyY = (obstacle1.y - obstacle1.height) + this.enemysOffset;

    this['enemy1'] = this.add.image(180, this.obstacle1EnemyY, 'elements-atlas', 'enem1').setOrigin(0.5, 0);
    this['enemy2'] = this.add.image(80, this.obstacle1EnemyY, 'elements-atlas', 'enem2').setOrigin(0.5, 0);
    this['enemy3'] = this.add.image(80, this.obstacle1EnemyY, 'elements-atlas', 'enem3').setOrigin(0.5, 0);

    obstacle1.setDepth(1);
    obstacle2.setDepth(1);
    obstacle3.setDepth(1);

    this.enemy1.setInteractive();
    this.enemy2.setInteractive();
    this.enemy3.setInteractive();
    // this.input.enableDebug(this.enemy1);

    
    this.input.on('gameobjectdown', (pointer, gameObject, event)=> {
        updateScore();
        gameObject.disableInteractive();

        setTimeout(() => {
            gameObject.setInteractive();
        }, 1000);
    });

    document.getElementById('start').addEventListener('click', ()=>{
        this.isGameRunning = !this.isGameRunning;
        console.log(this.isGameRunning);
    })

    this.delay = 2000;
    this.time.addEvent({
        delay: this.delay,
        callback: startRandomMovement,
        callbackScope: this,
        loop: true
    });
}

function startRandomMovement() {

    if (!this.isGameRunning) {
        return;
    }

    const obstacleNumber =  Phaser.Math.Between(0, 2);

    let obstaclesX = [780, 480, 120];

    const positionX =  obstaclesX[obstacleNumber];
    const randomNum = Phaser.Math.Between(1, 3);

    this.tweens.add({
        targets: this['enemy' + randomNum],
        x: positionX,
        duration: 1,
        ease: 'Linear',
        onComplete: () => {
            this.tweens.add({
                targets: this['enemy' + randomNum],
                y: this['enemy' + randomNum].y - 200,
                duration: this.delay / 3,
                ease: 'Linear',
                onComplete: () => {
                    this.tweens.add({
                        targets: this['enemy' + randomNum],
                        y: this['enemy' + randomNum].y + 201,
                        duration: this.delay / 3,
                        ease: 'Linear',
                        delay: this.delay / 3,
                        onComplete: () => {
                            if (this.clickedObject != undefined) {
                                if (this.clickedObject.input) {
                                    this.clickedObject.setInteractive();
                                }
                            }
                        }
                    });
                }
            });
        }
    });
}

function updateScore() {
    score++;
    console.log('score:', score);
}

function update() {

}

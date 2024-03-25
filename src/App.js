import Phaser from 'phaser';
import GameScene from './GameScene';
import './styles/main.scss';

export default class App {

    constructor() {
        this.gameScene = new GameScene();

        const config = {
            type: Phaser.AUTO,
            width: 960,
            height: 540,
            parent: 'canvas-container',
            scene: [this.gameScene]
        };

        this.game = new Phaser.Game(config);

        this.listeners();
    }

    listeners() {
        const buttons = document.querySelectorAll('.btn-to');
        
        const self = this;
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                const dataToValue = this.getAttribute('data-to');

                self.changeView(dataToValue);

            });
        });

        document.getElementById('start').addEventListener('click', ()=>{
            this.gameScene.isGameRunning = !this.gameScene.isGameRunning;
            this.gameScene.emitter.emit('start-game');
        });

        const btnSettings = document.querySelectorAll('.btn-settings');

        btnSettings.forEach(btn => {
            btn.addEventListener('click', ()=>{
                this.gameScene.pauseResume();
            });
        });

    }

    changeView(nextViewId) {
        let appView= document.getElementById('app_view');
        appView.removeAttribute('class');
        appView.classList.add(nextViewId);
    }
}
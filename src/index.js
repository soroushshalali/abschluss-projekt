import Phaser from 'phaser';
import GameScene from './GameScene';
import './styles/main.scss';
const gameScene = new GameScene();

const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    parent: 'canvas-container',
    scene: [gameScene]
};

const game = new Phaser.Game(config);

const buttons = document.querySelectorAll('.btn-to');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const dataToValue = this.getAttribute('data-to');

        changeView(dataToValue);
    });
});

const btnSettings = document.querySelectorAll('.btn-settings');

btnSettings.forEach(btn => {
    btn.addEventListener('click', ()=>{
        gameScene.pauseResume();
    });
});

function changeView(nextViewId) {
    let appView= document.getElementById('app_view');
    appView.removeAttribute('class');
    appView.classList.add(nextViewId);
}


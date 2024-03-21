import Phaser from 'phaser';
import GameScene from './GameScene';
import './styles/main.scss';

const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    parent: 'canvas-container',
    scene: [GameScene]
};

const game = new Phaser.Game(config);

const buttons = document.querySelectorAll('.btn-to');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        const dataToValue = this.getAttribute('data-to');

        changeView(dataToValue);
    });
});

function changeView(nextViewId) {
    console.log('next View: ', nextViewId);
    let appView= document.getElementById('app_view');
    appView.removeAttribute('class');
    appView.classList.add(nextViewId);
}


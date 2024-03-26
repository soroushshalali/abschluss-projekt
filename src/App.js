import Phaser from 'phaser';
import GameScene from './GameScene';
import Backend from './Backend';
import './styles/main.scss';

export default class App {

    constructor() {

        this.backend = new Backend();

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

        document.getElementById('restart').addEventListener('click', ()=>{
            this.gameScene.restart();
        });

        const btnSettings = document.querySelectorAll('.btn-settings');
        btnSettings.forEach(btn => {
            btn.addEventListener('click', ()=>{
                this.gameScene.pauseResume();
            });
        });

        document.getElementById('form').addEventListener('submit', function(event) {
            event.preventDefault();
            self.insertInDatabase(this);

        });

        
        document.getElementById('highscore_btn').addEventListener('click', () => {
            this.addDataInTable();
        });
    }

    insertInDatabase(form) {
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });
        data['score'] = this.gameScene.score;


        this.backend.insert(data);
    }

    addDataInTable(){
        this.backend.read().then(highScores => {
            let rowsElements = `
            <tr>
                <th>Id</th>
                <th>Nickname</th>
                <th>Score</th>
            </tr>
            `;
            if (highScores) {        
                highScores.forEach((row)=>{
                    rowsElements += `
                    <tr>
                        <td>${row.id}</td>
                        <td>${row.name}</td>
                        <td>${row.score}</td>
                    </tr>
                    `;
                });
            }
    
            let table = document.getElementById('highscores_table');
            table.innerHTML = rowsElements;
        }).catch(error => {
            console.error('Error while fetching high scores:', error);
        });
    }

    changeView(nextViewId) {

        let appView= document.getElementById('app_view');
        appView.removeAttribute('class');
        appView.classList.add(nextViewId);
    }
}
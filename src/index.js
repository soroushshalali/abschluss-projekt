export default class Index{
    changeView(nextViewId) {
        app.changeView(nextViewId);
    }
}

import App from "./App";

let app = new App();


document.getElementById('form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    try {
        const response = await fetch('http://localhost:3001/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }

        const jsonResponse = await response.json();
        console.log('Server response:', jsonResponse);
    } catch (error) {
        console.error('Error:', error);
    }
});

let highScores;

document.getElementById('instructions_btn').addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3001/data');
        
        if (!response.ok) {
            throw new Error('Network response was not ok!');
        }
        
        highScores = await response.json();
    } catch (error) {
        console.error('Error:', error);
    }

    let rowsElements = `
    <tr>
        <th>Id</th>
        <th>Nickname</th>
        <th>Score</th>
    </tr>
    `;
    highScores.forEach((row)=>{
        rowsElements += `
        <tr>
            <td>${row.id}</td>
            <td>${row.name}</td>
            <td>${row.id}</td>
        </tr>
        `;
    });

    let table = document.getElementById('highscores_table');
    table.innerHTML += rowsElements;
});



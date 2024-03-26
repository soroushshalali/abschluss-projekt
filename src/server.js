const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

const db = new sqlite3.Database('database.db');

// db.run(`DROP TABLE IF EXISTS data`);

db.run(`CREATE TABLE IF NOT EXISTS data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    gender TEXT,
    email TEXT,
    score INTEGER
)`);

app.use(cors());

app.use(express.json());

app.get('/data', (req, res) => {
    db.all('SELECT * FROM data', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post('/data', (req, res) => {
    const { name, gender, email, score } = req.body;
    db.run('INSERT INTO data (name, gender, email, score) VALUES (?, ?, ?, ?)', [name, gender, email, score], function(err) {
        if (err) {
            console.log(err.message);
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

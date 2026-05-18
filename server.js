const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/actions', (req, res) => {
    db.all("SELECT * FROM actions", [], (err, rows) => {
        res.json(rows);
    });
});

app.post('/actions', (req, res) => {
    const { title, description, assigned_to, priority, due_date } = req.body;

    const query = `
        INSERT INTO actions (title, description, assigned_to, priority, status, due_date, created_at)
        VALUES (?, ?, ?, ?, 'Open', ?, datetime('now'))
    `;

    db.run(query, [title, description, assigned_to, priority, due_date], function(err) {
        res.json({ id: this.lastID });
    });
});

app.put('/actions/:id', (req, res) => {
    const { status } = req.body;

    db.run(
        "UPDATE actions SET status = ? WHERE id = ?",
        [status, req.params.id],
        () => res.json({ updated: true })
    );
});

app.delete('/actions/:id', (req, res) => {
    db.run("DELETE FROM actions WHERE id = ?", req.params.id, () => {
        res.json({ deleted: true });
    });
});

app.listen(5000, () => console.log("Backend running on port 5000"));

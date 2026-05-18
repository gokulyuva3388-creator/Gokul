const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./actions.db');

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS actions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            assigned_to TEXT,
            priority TEXT,
            status TEXT,
            due_date TEXT,
            created_at TEXT
        )
    `);
});

module.exports = db;
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to the existing SQLite database file
const dbPath = path.resolve(__dirname, 'text.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to connect to the database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});
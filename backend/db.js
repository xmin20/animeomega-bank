const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// إنشاء أو فتح ملف قاعدة البيانات محلياً
const dbPath = path.resolve(__dirname, 'omega_database.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('خطأ في الاتصال بقاعدة البيانات:', err.message);
    } else {
        console.log('تم الاتصال بقاعدة بيانات أوميغا بنجاح 🏦');
    }
});

// إنشاء الجداول الأساسية
db.serialize(() => {
    // 1. جدول اللاعبين
    db.run(`CREATE TABLE IF NOT EXISTS players (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        facebookId TEXT UNIQUE,
        username TEXT,
        balance INTEGER DEFAULT 1000,
        gems INTEGER DEFAULT 0,
        energy INTEGER DEFAULT 100,
        level INTEGER DEFAULT 1,
        xp INTEGER DEFAULT 0,
        vip TEXT DEFAULT 'None',
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);

    // 2. جدول المخزن
    db.run(`CREATE TABLE IF NOT EXISTS inventory (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        playerId INTEGER,
        itemName TEXT,
        itemCategory TEXT,
        quantity INTEGER DEFAULT 1,
        FOREIGN KEY(playerId) REFERENCES players(id)
    )`);
});

module.exports = db;

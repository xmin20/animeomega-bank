const express = require('express');
const cors = require('cors');
const db = require('./db'); // ربط السيرفر بقاعدة البيانات

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
const botRouter = require('./bot');
app.use('/api/bot', botRouter);
// 1. فحص حالة السيرفر
app.get('/api/status', (req, res) => {
    res.json({ status: "online", message: "سيرفر أوميغا بنك جاهز ومتصل بقاعدة البيانات! 🏦✨" });
});

// 2. إنشاء لاعب جديد أو تسجيل الدخول (خاص بالبوت والموقع)
app.post('/api/players/register', (req, res) => {
    const { facebookId, username } = req.body;
    
    if (!facebookId || !username) {
        return res.status(400).json({ error: "برجاء إرسال facebookId و username" });
    }

    const query = `INSERT INTO players (facebookId, username) VALUES (?, ?)`;
    db.run(query, [facebookId, username], function(err) {
        if (err) {
            // إذا كان اللاعب مسجلاً بالفعل، نقوم بجلب بياناته بدلاً من إظهار خطأ
            if (err.message.includes('UNIQUE constraint failed')) {
                db.get(`SELECT * FROM players WHERE facebookId = ?`, [facebookId], (err, player) => {
                    if (player) return res.json({ message: "تم تسجيل الدخول بنجاح", player });
                });
            } else {
                return res.status(500).json({ error: err.message });
            }
        } else {
            // إرجاع بيانات اللاعب الجديد بعد الإنشاء
            db.get(`SELECT * FROM players WHERE id = ?`, [this.lastID], (err, player) => {
                res.status(201).json({ message: "مرحباً بك في عالم أوميغا! 🎉", player });
            });
        }
    });
});

// 3. جلب بيانات لاعب معين عن طريق الـ Facebook ID
app.get('/api/players/:facebookId', (req, res) => {
    const { facebookId } = req.params;
    db.get(`SELECT * FROM players WHERE facebookId = ?`, [facebookId], (err, player) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!player) return res.status(404).json({ error: "اللاعب غير موجود!" });
        res.json(player);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

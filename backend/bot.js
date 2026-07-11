const express = require('express');
const db = require('./db'); // ربط البوت بنفس قاعدة البيانات المشتركة
const router = express.Router();

// رمز التحقق (تضعه في إعدادات Meta Developer للـ Webhook)
const VERIFY_TOKEN = "OMEGA_BANK_SECRET_TOKEN"; 

// 1. كود التحقق من الـ Webhook عند ربطه بـ Meta لأول مرة
router.get('/webhook', (req, res) => {
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('تم التحقق من الـ Webhook بنجاح! ✅');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

// 2. استقبال الرسائل والأوامر من اللاعبين على ماسنجر
router.post('/webhook', (req, res) => {
    let body = req.body;

    if (body.object === 'page') {
        body.entry.forEach(function(entry) {
            let webhook_event = entry.messaging[0];
            let sender_psid = webhook_event.sender.id; // معرف اللاعب على فيسبوك

            if (webhook_event.message && webhook_event.message.text) {
                let text = webhook_event.message.text.trim();
                handleBotCommand(sender_psid, text);
            }
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

// 3. معالجة أوامر الأنمي والبنك
function handleBotCommand(senderId, command) {
    // أمر الاستعلام عن الرصيد والمستوى
    if (command === '/رصيدي' || command === '/status') {
        db.get(`SELECT * FROM players WHERE facebookId = ?`, [senderId], (err, player) => {
            if (err) return sendTextMessage(senderId, "حدث خطأ أثناء فحص الحساب.");
            
            if (!player) {
                sendTextMessage(senderId, "❌ حسابك غير مسجل في البنك! أرسل كلمة '/تسجيل' لإنشاء حسابك في عالم أوميغا.");
            } else {
                let statusMessage = `🏦 تفاصيل حساب أوميغا بنك الخاص بك:\n\n` +
                                    `👤 الاسم: ${player.username}\n` +
                                    `⭐ المستوى: ${player.level}\n` +
                                    `￥ الين: ${player.balance.toLocaleString()}\n` +
                                    `💎 الجواهر: ${player.gems}\n` +
                                    `⚡ الطاقة: ${player.energy}/100`;
                sendTextMessage(senderId, statusMessage);
            }
        });
    }
    // أمر تسجيل حساب جديد
    else if (command === '/تسجيل') {
        let defaultUsername = `لاعب_أوميغا_${Math.floor(1000 + Math.random() * 9000)}`;
        db.run(`INSERT INTO players (facebookId, username) VALUES (?, ?)`, [senderId, defaultUsername], function(err) {
            if (err) {
                sendTextMessage(senderId, "⚠️ حسابك مسجل بالفعل في النظام!");
            } else {
                sendTextMessage(senderId, `🎉 تم إنشاء حسابك بنجاح في البنك!\n👤 الاسم: ${defaultUsername}\n🎁 حصلت على ￥1,000 كهدية ترحيبية!`);
            }
        });
    }
    // في حال أرسل اللاعب أمراً غير معروف
    else {
        sendTextMessage(senderId, "🤖 أهلاً بك في Anime Omega Bank!\n\nالأوامر المتاحة حالياً:\n🔹 /تسجيل - لإنشاء حساب\n🔹 /رصيدي - لعرض الأموال والمستوى");
    }
}

// دالة إرسال الرسالة النصية إلى فيسبوك ماسنجر (تستدعي الـ Graph API لاحقاً)
function sendTextMessage(sender_psid, response_text) {
    console.log(`إلى: ${sender_psid} -> الرسالة: ${response_text}`);
    // هنا يتم وضع كود Axios أو Fetch لإرسال الرسالة الحقيقية عبر Meta API
}

module.exports = router;

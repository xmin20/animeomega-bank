const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// نقطة فحص للتأكد من عمل السيرفر
app.get('/api/status', (req, res) => {
    res.json({ 
        status: "online", 
        message: "سيرفر أوميغا بنك يعمل بنجاح! 🚀" 
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

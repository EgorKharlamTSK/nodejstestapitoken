const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3333;
const SECRET_KEY = 'your-secret-key'; // Замените на ваш секретный ключ

app.use(bodyParser.json());

// Генерация нового JWT
function generateToken() {
    const payload = {
        userId: 1,
        username: 'testuser',
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // Токен действителен 1 час
    };
    return jwt.sign(payload, SECRET_KEY);
}

// Get-запрос для получения нового токена
app.get('/token', (req, res) => {
    const token = generateToken();
    res.json({ token });
});

// Post-запрос для получения нового токена на основе старого
app.post('/token', (req, res) => {
    const oldToken = req.body.token;

    if (!oldToken) {
        return res.status(400).json({ error: 'Token is required' });
    }

    try {
        // Проверяем старый токен
        const decoded = jwt.verify(oldToken, SECRET_KEY);
        // Генерируем новый токен
        const newToken = generateToken();
        res.json({ token: newToken });
    } catch (err) {
        res.status(401).json({ error: 'Invalid token' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

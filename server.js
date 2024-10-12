const express = require('express');
const https = require('https');
const fs = require('fs');

const app = express();

// Настройка статической папки
app.use(express.static('public'));

// Загружаем самоподписанный сертификат
const options = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
};

// Простой маршрут
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Мой HTTPS Сервер</title>
        <style>
            body {
                margin: 0;
                height: 100vh;
                background-image: url('HTTPS.png'); /* Путь к изображению */
                background-size: cover; /* Заполнение всего фона */
                background-position: center; /* Центрирование фона */
                display: flex;
                justify-content: center; /* Выравнивание по центру */
                align-items: center; /* Выравнивание по центру */
                color: white; /* Цвет текста, если нужно */
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); /* Тень для текста */
            }
        </style>
    </head>
    <body>
        <!-- Надпись можно убрать или добавить другую -->
        <p style="font-size: 24px;">HTTPS СЕРВЕР РУСЛАНА</p>
    </body>
    </html>
  `);
});

// Запускаем сервер на порту 3000
https.createServer(options, app).listen(3000, () => {
  console.log('Сервер запущен на https://localhost:3000');
});

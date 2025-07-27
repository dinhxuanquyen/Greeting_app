const express = require('express');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Email configuration
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Email template cho greeting card
const createGreetingEmailTemplate = (greeting) => {
    const templateIcons = {
        'birthday': '🎂',
        'anniversary': '💕',
        'congratulations': '🎉',
        'thank-you': '',
        'get-well': '🏥',
        'holiday': '',
        'love': '',
        'friendship': ''
    };

    const icon = templateIcons[greeting.template] || '💌';

    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 15px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h1 style="font-size: 48px; margin: 0;">${icon}</h1>
                <h2 style="margin: 10px 0; color: #fff;">Lời chúc từ ${greeting.sender}</h2>
            </div>
            
            <div style="background: rgba(255,255,255,0.1); padding: 30px; border-radius: 10px; margin-bottom: 20px;">
                <p style="font-size: 18px; line-height: 1.6; margin: 0; text-align: center;">
                    "${greeting.message}"
                </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
                <p style="margin: 5px 0; font-size: 14px;">
                    💰 Số lượng STX: ${greeting.stxAmount} STX
                </p>
                <p style="margin: 5px 0; font-size: 14px;">
                    📅 Thời gian: ${new Date(greeting.timestamp * 1000).toLocaleString('vi-VN')}
                </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.3);">
                <p style="font-size: 12px; opacity: 0.8;">
                    Được gửi từ Greeting Card App trên Stacks Blockchain
                </p>
            </div>
        </div>
    `;
};

// API endpoint để gửi email notification
app.post('/send-greeting-notification', async (req, res) => {
    try {
        const { receiverEmail, greeting } = req.body;

        if (!receiverEmail || !greeting) {
            return res.status(400).json({ error: 'Thiếu thông tin email hoặc greeting' });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: receiverEmail,
            subject: `💌 Lời chúc từ ${greeting.sender}`,
            html: createGreetingEmailTemplate(greeting)
        };

        await transporter.sendMail(mailOptions);

        console.log(`Email notification sent to ${receiverEmail}`);
        res.json({ success: true, message: 'Email đã được gửi thành công' });
    } catch (error) {
        console.error('Email notification error:', error);
        res.status(500).json({ error: 'Lỗi khi gửi email' });
    }
});

// Scheduled task để kiểm tra và gửi scheduled greetings
cron.schedule('*/5 * * * *', async () => { // Chạy mỗi 5 phút
    try {
        console.log('Checking for scheduled greetings...');

        // Ở đây bạn có thể thêm logic để:
        // 1. Đọc scheduled greetings từ blockchain
        // 2. Kiểm tra thời gian gửi
        // 3. Gửi email notification
        // 4. Cập nhật trạng thái trên blockchain

        // Ví dụ đơn giản:
        const currentTime = Math.floor(Date.now() / 1000);
        console.log(`Current time: ${currentTime}`);

    } catch (error) {
        console.error('Scheduled task error:', error);
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
});

module.exports = app; 
const express = require('express');
const app = express();

app.use(express.json()); 

// 1. 验证域名文件（使用最底层 API，绝对纯净）
app.get('/weidian_open.json', (req, res) => {
    // 强制声明这是纯 JSON，禁止框架添加 charset 等后缀
    res.writeHead(200, { 'Content-Type': 'application/json' });
    // 使用最原生的 end 方法发送纯字符串
    res.end('{"sign":"03569e0bc22383f525ff_1773063028822"}');
});

// 2. 应对微店的"订阅消息"和"授权回调"双重测试
app.all('/webhook/weidian', (req, res) => {
    // 同样扒掉所有框架伪装
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('{"errcode":0,"errmsg":"success"}');
});

const PORT = process.env.PORT || 8080; 
app.listen(PORT, () => {
    console.log(`Node.js 服务已启动，端口 ${PORT}`);
});

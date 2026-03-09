const express = require('express');
const app = express();

// 允许程序接收并解析 POST 过来的 JSON 数据
app.use(express.json()); 

// 1. 应付微店的第一路大军：GET 查岗验证
app.get('/weidian_open.json', (req, res) => {
    // 直接返回你之前下载的 sign 验证码
    res.json({ "sign": "791c4cd32082a6c144cc_1772978739877" });
});

// 2. 应付微店的第二路大军：POST 接口死活测试，以及未来的真实订单
app.post('/webhook/weidian', (req, res) => {
    console.log("收到微店发来的 POST 数据:", req.body);
    
    // 目前第一阶段，不管收到什么，都先给微店返回成功，把验证骗过去！
    // 等验证通过了，我们再在这里加上解密代码和推送到 n8n 的逻辑
    res.json({ "errcode": 0, "errmsg": "success" });
});

// 启动服务器
const PORT = process.env.PORT || 8080; // Zeabur 默认喜欢 8080 端口
app.listen(PORT, () => {
    console.log(`Node.js 服务已启动，正在监听端口 ${PORT}`);
});

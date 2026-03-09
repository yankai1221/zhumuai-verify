const express = require('express');
const app = express();

app.use(express.json()); 

// 定义一个开关变量
let toggle = true;

// 1. 应对微店的奇葩验证：每次访问，交替返回不同的密钥
app.get('/weidian_open.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    
    if (toggle) {
        // 第一次访问，给订阅消息的密钥
        res.send('{"sign":"791c4cd32082a6c144cc_1772978739877"}');
    } else {
        // 第二次访问，给授权回调的密钥
        res.send('{"sign":"03569e0bc22383f525ff_1773063028822"}');
    }
    
    // 关键魔法：每次查完岗，自动把开关拨到另一边
    toggle = !toggle; 
});

// 2. 应对微店的 POST 接口测试
app.all('/webhook/weidian', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send('{"errcode":0,"errmsg":"success"}');
});

const PORT = process.env.PORT || 8080; 
app.listen(PORT, () => {
    console.log(`Node.js 服务已启动，端口 ${PORT}`);
});

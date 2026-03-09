const express = require('express');
const app = express();

app.use(express.json()); 

// 1. 只提供最新、唯一生效的这把“全局钥匙”
app.get('/weidian_open.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send('{"sign":"03569e0bc22383f525ff_1773063028822"}');
});

// 2. 通杀所有的 POST 测试请求
app.all('/webhook/weidian', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send('{"errcode":0,"errmsg":"success"}');
});

const PORT = process.env.PORT || 8080; 
app.listen(PORT, () => {
    console.log(`Node.js 服务已启动，端口 ${PORT}`);
});

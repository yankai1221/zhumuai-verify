const express = require('express');
const app = express();

app.use(express.json()); 

// 1. 验证域名文件 (轮询机制：把两把钥匙都带上，无论是谁来查都能过)
let toggle = true;
app.get('/weidian_open.json', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if (toggle) {
        res.end('{"sign":"03569e0bc22383f525ff_1773063028822"}');
    } else {
        res.end('{"sign":"791c4cd32082a6c144cc_1772978739877"}');
    }
    toggle = !toggle; 
});

// 2. 专门给【订阅消息】用的门（保持原样，微店吃这一套）
app.all('/webhook/weidian', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('{"errcode":0,"errmsg":"success"}');
});

// 3. 专门给【授权回调链接】用的门（返回最标准、最基础的 JSON，完美避开微店解析报错）
app.all('/callback', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end('{"code":0,"msg":"success"}');
});

const PORT = process.env.PORT || 8080; 
app.listen(PORT, () => {
    console.log(`Node.js 服务已启动，端口 ${PORT}`);
});

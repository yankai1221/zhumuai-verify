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

// 2. 万能接收通道：不管微店访问什么链接，全部返回最纯净的 JSON！
app.all('*', (req, res) => {
    // 极其关键：用最底层 API 写死 Header，彻底扒掉 Express 的所有默认伪装
    res.writeHead(200, { 'Content-Type': 'application/json' });
    // 返回最纯净的字符串格式，绝对不会报错
    res.end('{"errcode":0,"errmsg":"success"}');
});

const PORT = process.env.PORT || 8080; 
app.listen(PORT, () => {
    console.log(`Node.js 服务已启动，端口 ${PORT}`);
});

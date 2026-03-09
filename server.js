const express = require('express');
const app = express();

const SIGN = '6d387baefc8f11119309_1773066522906'; // 最新 sign

function jsonReply(res, obj) {
const body = JSON.stringify(obj);
res.status(200);
res.set('Content-Type', 'application/json');
res.set('Cache-Control', 'no-store');
res.set('Content-Length', Buffer.byteLength(body));
return res.send(body);
}

// 根验证文件
app.get('/weidian_open.json', (req, res) => {
return jsonReply(res, { sign: SIGN });
});

// 订阅消息（建议单独路由）
app.all('/webhook/subscribe', (req, res) => {
return jsonReply(res, {
errcode: 0, errmsg: 'success',
code: 0, msg: 'success',
success: true
});
});

// 授权回调（建议单独路由，GET/POST都兼容）
app.all('/webhook/callback', (req, res) => {
return jsonReply(res, {
sign: SIGN,
errcode: 0, errmsg: 'success',
code: 0, msg: 'success',
success: true
});
});

app.listen(process.env.PORT || 8080);

const express = require('express');
const app = express();

const SIGN = '6d387baefc8f11119309_1773066522906'; // 每次用最新 sign

function sendJson(res, obj) {
const body = JSON.stringify(obj);
res.status(200);
res.set('Content-Type', 'application/json');
res.set('Cache-Control', 'no-store');
res.set('Content-Length', String(Buffer.byteLength(body)));
return res.end(body);
}

// 打印微店真实请求（很关键）
app.use((req, _res, next) => {
console.log('[REQ]', req.method, req.originalUrl);
next();
});

// 1) 根验证文件：只返回 sign
app.get('/weidian_open.json', (_req, res) => {
return sendJson(res, { sign: SIGN });
});

// 2) 订阅消息：只返回 errcode/errmsg
app.all('/webhook/subscribe', (_req, res) => {
return sendJson(res, { errcode: 0, errmsg: 'success' });
});

// 3) 授权回调：先用同样结构（最稳）
app.all('/webhook/callback', (_req, res) => {
return sendJson(res, { errcode: 0, errmsg: 'success' });
});

// 4) 兜底：也返回同结构，杜绝 {"ok":true}
app.use((_req, res) => {
return sendJson(res, { errcode: 0, errmsg: 'success' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
console.log(`server running on ${PORT}`);
});

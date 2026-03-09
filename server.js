const http = require('http');
const { URL } = require('url');

const SIGN = '6d387baefc8f11119309_1773066522906';
const OK = '{"errcode":0,"errmsg":"success"}';

function send(res, body) {
const buf = Buffer.from(body, 'utf8');
res.statusCode = 200;
res.setHeader('Content-Type', 'application/json'); // 不带 charset
res.setHeader('Content-Length', String(buf.length));
res.setHeader('Cache-Control', 'no-store');
res.setHeader('Connection', 'close');
res.end(buf);
}

http.createServer((req, res) => {
const u = new URL(req.url, 'http://localhost');
const p = u.pathname;
console.log('[REQ]', req.method, req.url);

if (p === '/weidian_open.json') {
return send(res, JSON.stringify({ sign: SIGN }));
}

// 微店可能打的各种候选路径，全兜住
if (
p === '/webhook/subscribe' ||
p === '/webhook/callback' ||
p === '/webhook/weidian' ||
p === '/webhook/subscribe/' ||
p === '/webhook/callback/' ||
p === '/webhook/weidian/'
) {
return send(res, OK);
}

// 兜底也返回 OK，避免 {"ok":true} 再出现
return send(res, OK);
}).listen(process.env.PORT || 8080, () => {
console.log('server started');
});

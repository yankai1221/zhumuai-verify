const http = require('http');
const { URL } = require('url');

const SIGN = '6d387baefc8f11119309_1773066522906'; // 用当前最新 sign
const OK = '{"errcode":0,"errmsg":"success"}';

const server = http.createServer((req, res) => {
const u = new URL(req.url, 'http://localhost');
const path = u.pathname;

let body = OK;
if (path === '/weidian_open.json') {
body = JSON.stringify({ sign: SIGN });
} else if (path === '/webhook/weidian') {
body = OK;
} else {
body = '{"ok":true}';
}

const buf = Buffer.from(body, 'utf8');

res.statusCode = 200;
res.setHeader('Content-Type', 'application/json'); // 不带 charset
res.setHeader('Content-Length', String(buf.length)); // 禁止 chunked
res.setHeader('Cache-Control', 'no-store');
res.setHeader('Connection', 'close');
res.setHeader('X-Content-Type-Options', 'nosniff');
// 不设置 Content-Encoding（确保不是 gzip/br）

res.end(buf);
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log('listening on', PORT));

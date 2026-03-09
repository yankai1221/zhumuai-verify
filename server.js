const http = require('http');
const { URL } = require('url');

const SIGN = '926880e306682b55da16_1773070745287';

function send(res, objOrStr) {
const body = typeof objOrStr === 'string' ? objOrStr : JSON.stringify(objOrStr);
const buf = Buffer.from(body, 'utf8');
res.statusCode = 200;
res.setHeader('Content-Type', 'application/json');
res.setHeader('Content-Length', String(buf.length));
res.setHeader('Cache-Control', 'no-store');
res.setHeader('Connection', 'close');
res.end(buf);
}

http.createServer((req, res) => {
const u = new URL(req.url, 'http://localhost');
const p = u.pathname;
console.log('[REQ]', req.method, req.url, req.headers['content-type']);

if (p === '/weidian_open.json') return send(res, { sign: SIGN });

let raw = '';
req.on('data', c => raw += c);
req.on('end', () => {
// 如果对方发的是 JSON，就原样回显
if (raw && (req.headers['content-type'] || '').includes('application/json')) {
try {
const obj = JSON.parse(raw);
return send(res, obj);
} catch {}
}

// 兜底返回（双字段兼容）
return send(res, {
errcode: 0, errmsg: 'success',
code: 0, msg: 'success'
});
});
}).listen(process.env.PORT || 8080);

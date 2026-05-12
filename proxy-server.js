const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const query = parsedUrl.query;

    if (parsedUrl.pathname === '/translate') {
        const { q, appid, appkey, salt, sign, from, to } = query;

        if (!q || !appid || !appkey || !salt || !sign) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Missing required parameters' }));
            return;
        }

        const params = new URLSearchParams({
            q: q,
            from: from || 'en',
            to: to || 'zh',
            appid: appid,
            salt: salt,
            sign: sign
        });

        const baiduUrl = `https://fanyi-api.baidu.com/api/trans/vip/translate?${params.toString()}`;

        https.get(baiduUrl, (baiduRes) => {
            let data = '';

            baiduRes.on('data', (chunk) => {
                data += chunk;
            });

            baiduRes.on('end', () => {
                res.writeHead(200, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type'
                });
                res.end(data);
            });
        }).on('error', (err) => {
            console.error('请求百度API失败:', err);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
});

server.on('error', (err) => {
    console.error('服务器错误:', err);
});

server.listen(PORT, () => {
    console.log(`代理服务器运行在 http://localhost:${PORT}`);
    console.log('按 Ctrl+C 停止服务器');
});
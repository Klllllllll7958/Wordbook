const http = require('http');
const https = require('https');
const url = require('url');
const crypto = require('crypto');

// 百度翻译API配置（从环境变量或硬编码）
const APP_ID = '20260323002578898';
const APP_KEY = 'QJ8I8wR4bEa5sQ10Yf4g'; // 从配置中获取的密钥
const BAIDU_API_URL = 'https://fanyi-api.baidu.com/api/trans/vip/translate';

// 计算MD5签名
function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

// 处理翻译请求
function handleTranslateRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  
  if (parsedUrl.pathname === '/translate') {
    const word = parsedUrl.query.q;
    
    if (!word) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing word parameter' }));
      return;
    }

    // 构造百度翻译API请求
    const salt = Date.now().toString();
    const sign = md5(APP_ID + word + salt + APP_KEY);
    
    const params = new URLSearchParams({
      q: word,
      from: 'en',
      to: 'zh',
      appid: APP_ID,
      salt: salt,
      sign: sign
    });

    const apiUrl = `${BAIDU_API_URL}?${params.toString()}`;

    // 发送请求到百度翻译API
    https.get(apiUrl, (apiRes) => {
      let data = '';
      
      apiRes.on('data', (chunk) => {
        data += chunk;
      });
      
      apiRes.on('end', () => {
        try {
          const result = JSON.parse(data);
          res.writeHead(200, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*' // 允许跨域
          });
          res.end(data);
        } catch (error) {
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Failed to parse response' }));
        }
      });
    }).on('error', (error) => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
    });
  } else {
    // 静态文件服务
    const fs = require('fs');
    const path = require('path');
    
    let filePath = path.join(__dirname, parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname);
    
    // 检查文件是否存在
    fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
        return;
      }

      // 读取并返回文件
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal server error');
        } else {
          // 根据文件扩展名设置Content-Type
          const ext = path.extname(filePath);
          let contentType = 'text/plain';
          
          switch (ext) {
            case '.html':
              contentType = 'text/html';
              break;
            case '.css':
              contentType = 'text/css';
              break;
            case '.js':
              contentType = 'text/javascript';
              break;
          }

          res.writeHead(200, { 'Content-Type': contentType });
          res.end(data);
        }
      });
    });
  }
}

// 创建服务器
const server = http.createServer(handleTranslateRequest);
const PORT = 8080;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log('Translation API endpoint: http://localhost:8080/translate?q=word');
});

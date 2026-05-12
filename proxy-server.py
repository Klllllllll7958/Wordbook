#!/usr/bin/env python3
"""
Python 代理服务器，用于百度翻译API
解决浏览器跨域问题
"""

import http.server
import socketserver
import urllib.parse
import urllib.request
import json

PORT = 3000
BAIDU_API_URL = "https://fanyi-api.baidu.com/api/trans/vip/translate"

class ProxyHandler(http.server.BaseHTTPRequestHandler):
    def _set_cors_headers(self):
        """设置CORS头"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        
    def do_OPTIONS(self):
        """处理OPTIONS预检请求"""
        self.send_response(200)
        self._set_cors_headers()
        self.end_headers()
    
    def do_GET(self):
        # 解析请求路径
        parsed_path = urllib.parse.urlparse(self.path)
        
        # 只处理 /translate 路径
        if parsed_path.path == '/translate':
            # 提取查询参数
            params = urllib.parse.parse_qs(parsed_path.query)
            
            # 检查必要参数
            if 'q' not in params or 'appid' not in params or 'appkey' not in params:
                self.send_error(400, "缺少必要参数")
                return
            
            try:
                # 构建百度API请求参数
                api_params = {
                    'q': params.get('q', [''])[0],
                    'from': params.get('from', ['en'])[0],
                    'to': params.get('to', ['zh'])[0],
                    'appid': params.get('appid', [''])[0],
                    'salt': params.get('salt', [''])[0],
                    'sign': params.get('sign', [''])[0]
                }
                
                # 构建请求URL
                api_request_url = BAIDU_API_URL + '?' + urllib.parse.urlencode(api_params)
                
                # 发送请求到百度API
                with urllib.request.urlopen(api_request_url) as response:
                    # 获取响应内容
                    content = response.read().decode('utf-8')
                    
                    # 发送响应
                    self.send_response(200)
                    self._set_cors_headers()
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(content.encode('utf-8'))
                    
            except Exception as e:
                # 处理错误
                self.send_error(500, f"服务器错误: {str(e)}")
                return
        else:
            # 其他路径返回404
            self.send_error(404, "Not Found")

def main():
    print(f"启动代理服务器，监听端口 {PORT}...")
    print(f"代理百度翻译API: {BAIDU_API_URL}")
    print("按 Ctrl+C 停止服务器")
    
    # 创建服务器
    with socketserver.TCPServer(("", PORT), ProxyHandler) as httpd:
        httpd.serve_forever()

if __name__ == "__main__":
    main()
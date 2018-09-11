# mockit

Http API mock for frontend development

## Install

```bash
npm i -g mockitjs
```

## Usage

```bash
mockit -h
```

Output:

```text
Usage: mockit [options] [config]

options:
   -H, --host=<host>       host name
   -P, --port=<port>       port number
   -S, --ssl               enable https
       --http2             enable http2
       --template=<path>   template file path
       --routes=<path>     routes file path
       --watch             enable routes file watch
       --persist=<path>    dump file path
   -C, --cert=<path>       ssl cert file path
   -K, --key=<path>        ssl key file path
   -O, --open              open browser
       --verbose           output verbose info
   -h, --help              show this help
```

Quick start:

```bash
mockit
```

Start from config file

```bash
mockit ./config.yml
mockit ./config.json
```

### Config

config.yml

```yaml
# 0.0.0.0 to listen from anywhere
host: "127.0.0.1"
# 0 to assign an available port
port: 0
# enable http2 support(requires ssl)
http2: false
ssl:
  # enable ssl support
  enabled: false
  cert: "/path/to/cert/file"
  key: "/path/to/key/file"
# enable verbose debug
debug: true
# enable request logging
logger:
  enabled: true
  # morgan types: combined|common|dev|short|tiny
  type: "combined"
dashboard:
  # dashboard base url
  baseUrl: "/dashboard"
  # template config(object) or path to template file(absolute or relative to this config file)
  template: "template.yml"
router:
  # enable CORS
  cors: true
  # routes config(object) or path to routes file(absolute or relative to this config file)
  routes: "routes.yml"
```

config.json

```json
{
  "host": "127.0.0.1",
  "port": 0,
  "http2": false,
  "ssl": {
    "enabled": false,
    "cert": "/path/to/cert/file",
    "key": "/path/to/key/file"
  },
  "debug": true,
  "logger": {
    "enabled": true,
    "type": "combined"
  },
  "dashboard": {
    "baseUrl": "/dashboard",
    "template": "template.yml"
  },
  "router": {
    "cors": true,
    "routes": "routes.yml"
  }
}
```

routes.yml

```yaml
# method and path
GET /api/v1/account:
  # bypass(disable) this route
  bypass: false
  # simulate response delay in milliseconds
  delay: 1000
  # http status code
  code: 200
  # response headers
  headers:
    Content-Type: "application/json"
    Server: "Nginx"
  # response body(string)
  body: '{"name":"admin"}'
PUT /api/v1/account:
  bypass: false
  delay: 0
  code: 204
  headers:
    Content-Type: "application/json"
    Server: "Nginx"
```

routes.json

```json
{
  "GET /api/v1/account": {
    "bypass": false,
    "delay": 1000,
    "code": 200,
    "headers": {
      "Content-Type": "application/json",
      "Server": "Nginx"
    },
    "body": "{\"name\":\"admin\"}"
  },
  "PUT /api/v1/account": {
    "bypass": false,
    "delay": 0,
    "code": 200,
    "headers": {
      "Content-Type": "application/json",
      "Server": "Nginx"
    }
  }
}
```

template.yml

```yaml
# http methods
methods:
  - "GET"
  - "HEAD"
  - "POST"
  - "PUT"
  - "DELETE"
  - "CONNECT"
  - "OPTIONS"
  - "TRACE"
  - "PATCH"
# http status codes and descriptions
codes:
  "100": "Continue"
  "101": "Switching Protocols"
  "102": "Processing"
  "200": "OK"
  "201": "Created"
  "202": "Accepted"
  "203": "Non-Authoritative Information"
  "204": "No Content"
  "205": "Reset Content"
  "206": "Partial Content"
  "207": "Multi-Status"
  "208": "Already Reported"
  "226": "IM Used"
  "300": "Multiple Choices"
  "301": "Moved Permanently"
  "302": "Found"
  "303": "See Other"
  "304": "Not Modified"
  "305": "Use Proxy"
  "306": "Switch Proxy"
  "307": "Temporary Redirect"
  "308": "Permanent Redirect"
  "400": "Bad Request"
  "401": "Unauthorized"
  "402": "Payment Required"
  "403": "Forbidden"
  "404": "Not Found"
  "405": "Method Not Allowed"
  "406": "Not Acceptable"
  "407": "Proxy Authentication Required"
  "408": "Request Timeout"
  "409": "Conflict"
  "410": "Gone"
  "411": "Length Required"
  "412": "Precondition Failed"
  "413": "Payload Too Large"
  "414": "URI Too Long"
  "415": "Unsupported Media Type"
  "416": "Range Not Satisfiable"
  "417": "Expectation Failed"
  "418": "I'm a teapot"
  "421": "Misdirected Request"
  "422": "Unprocessable Entity"
  "423": "Locked"
  "424": "Failed Dependency"
  "425": "Unordered Collection"
  "426": "Upgrade Required"
  "428": "Precondition Required"
  "429": "Too Many Requests"
  "431": "Request Header Fields Too Large"
  "444": "No Response"
  "449": "Retry With"
  "450": "Blocked by Windows Parental Controls"
  "451": "Unavailable For Legal Reasons"
  "499": "Client Closed Request"
  "500": "Internal Server Error"
  "501": "Not Implemented"
  "502": "Bad Gateway"
  "503": "Service Unavailable"
  "504": "Gateway Timeout"
  "505": "HTTP Version Not Supported"
  "506": "Variant Also Negotiates"
  "507": "Insufficient Storage"
  "509": "Bandwidth Limit Exceeded"
  "510": "Not Extended"
  "511": "Network Authentication Required"
# response types
mime:
  - "application/json"
  - "application/x-www-form-urlencoded"
  - "application/xhtml+xml"
  - "application/xml"
  - "multipart/form-data"
  - "text/css"
  - "text/csv"
  - "text/html"
  - "text/json"
  - "text/plain"
  - "text/xml"
```

template.json

```json
{
  "methods": [
    "GET",
    "HEAD",
    "POST",
    "PUT",
    "DELETE",
    "CONNECT",
    "OPTIONS",
    "TRACE",
    "PATCH"
  ],
  "codes": {
    "100": "Continue",
    "101": "Switching Protocols",
    "102": "Processing",
    "200": "OK",
    "201": "Created",
    "202": "Accepted",
    "203": "Non-Authoritative Information",
    "204": "No Content",
    "205": "Reset Content",
    "206": "Partial Content",
    "207": "Multi-Status",
    "208": "Already Reported",
    "226": "IM Used",
    "300": "Multiple Choices",
    "301": "Moved Permanently",
    "302": "Found",
    "303": "See Other",
    "304": "Not Modified",
    "305": "Use Proxy",
    "306": "Switch Proxy",
    "307": "Temporary Redirect",
    "308": "Permanent Redirect",
    "400": "Bad Request",
    "401": "Unauthorized",
    "402": "Payment Required",
    "403": "Forbidden",
    "404": "Not Found",
    "405": "Method Not Allowed",
    "406": "Not Acceptable",
    "407": "Proxy Authentication Required",
    "408": "Request Timeout",
    "409": "Conflict",
    "410": "Gone",
    "411": "Length Required",
    "412": "Precondition Failed",
    "413": "Payload Too Large",
    "414": "URI Too Long",
    "415": "Unsupported Media Type",
    "416": "Range Not Satisfiable",
    "417": "Expectation Failed",
    "418": "I'm a teapot",
    "421": "Misdirected Request",
    "422": "Unprocessable Entity",
    "423": "Locked",
    "424": "Failed Dependency",
    "425": "Unordered Collection",
    "426": "Upgrade Required",
    "428": "Precondition Required",
    "429": "Too Many Requests",
    "431": "Request Header Fields Too Large",
    "444": "No Response",
    "449": "Retry With",
    "450": "Blocked by Windows Parental Controls",
    "451": "Unavailable For Legal Reasons",
    "499": "Client Closed Request",
    "500": "Internal Server Error",
    "501": "Not Implemented",
    "502": "Bad Gateway",
    "503": "Service Unavailable",
    "504": "Gateway Timeout",
    "505": "HTTP Version Not Supported",
    "506": "Variant Also Negotiates",
    "507": "Insufficient Storage",
    "509": "Bandwidth Limit Exceeded",
    "510": "Not Extended",
    "511": "Network Authentication Required"
  },
  "mime": [
    "application/json",
    "application/x-www-form-urlencoded",
    "application/xhtml+xml",
    "application/xml",
    "multipart/form-data",
    "text/css",
    "text/csv",
    "text/html",
    "text/json",
    "text/plain",
    "text/xml"
  ]
}
```

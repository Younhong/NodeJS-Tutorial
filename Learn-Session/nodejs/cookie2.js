var http = require('http');
var cookie = require('cookie');
var url = require('url');
function ColorMode(request, response){
    
}
http.createServer(function(request, response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var cookies = request.headers.cookie ? cookie.parse(request.headers.cookie) : {};
    var css = '';
    if(queryData.type === 'night') {
        response.writeHead(200, 
            {'Set-Cookie':['type=night; ']}
        );
        css = 'background-color:black; color:white;';
    } else if(queryData.type === 'day') {
        response.writeHead(200, 
            {'Set-Cookie':['type=day']}
        );
        css = 'background-color:white; color:black;';
    } else {
        if(cookies.type === 'night'){
            css = 'background-color:black; color:white;';
        } else {
            css = 'background-color:white; color:black;';
        }
    }
    response.end(`
    <html>
        <body style="${css}">
            <a href="?type=night">night</a>
            <a href="?type=day">day</a>
        </body>
    </html>
    `);
}).listen(3000);
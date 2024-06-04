const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const mimeTypes = {
    html: "text/html",
    css: "text/css",
    js: "text/javascript",
    png: "image/png",
    jpeg: "image/jpeg",
    jpg: "image/jpg",
    woff: "font/woff",
    ttf: "font/ttf",
    eot: "application/vnd.ms-fontobject",
    svg: "image/svg+xml",
    default: "application/octet-stream"
};

// Objeto para armazenar em cache os conteúdos dos arquivos estáticos
const cache = {};

const server = http.createServer((req, res) => {
    const acesso_uri = url.parse(req.url).pathname;
    const caminho_completo_recurso = path.join(process.cwd(), decodeURI(acesso_uri));

    // Middleware para logging
    logRequest(req);

    try {
        const recurso_carregado = fs.lstatSync(caminho_completo_recurso);
        
        if (recurso_carregado.isFile()) {
            servirArquivo(res, caminho_completo_recurso);
        } else if (recurso_carregado.isDirectory()) {
            res.writeHead(302, {'Location': 'index.html'});
            res.end();
        } else {
            respondeErro(res, 500, 'Erro interno do servidor!');
        }
    } catch (error) {
        respondeErro(res, 404, 'Arquivo não encontrado!');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}/`);
});

function servirArquivo(res, filePath) {
    const extensao = path.extname(filePath).substring(1);
    const mimeType = mimeTypes[extensao] || mimeTypes.default;

    // Verifica se o arquivo está em cache
    if (cache[filePath]) {
        console.log('From cache:', filePath);
        res.writeHead(200, {'Content-Type': mimeType});
        res.end(cache[filePath]);
    } else {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                respondeErro(res, 500, 'Erro ao ler o arquivo!');
                return;
            }
            cache[filePath] = data;
            res.writeHead(200, {'Content-Type': mimeType});
            res.end(data);
        });
    }
}

function respondeErro(res, statusCode, mensagem) {
    res.writeHead(statusCode, {'Content-Type': 'text/html'});
    // Lendo o conteúdo do arquivo HTML 404
    fs.readFile('404.html', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo 404.html:', err);
            res.end();
            return;
        }
        res.write(data);
        res.end();
    });
}

// Função de middleware para logging
function logRequest(req) {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
}

const http = require('http');
const url = require('url');
const TaskController = require('./controllers/taskController');
const TaskService = require('./services/taskService');
const TaskRepository = require('./repositories/taskRepository'); 
const hostname = '127.0.0.1';
const port = 3000;

class Server {
    constructor(controller) {
        this.controller = controller;
    }

    handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const { pathname } = parsedUrl;
        const method = req.method;
        
        const routeHandlers = {
            'GET': {
                '/tasks': (controller, req, res) => controller.getTasks(req, res),
            },
            'POST': {
                '/tasks': (controller, req, res) => controller.addTask(req, res),
            },
            'PUT': {
                '/tasks/': (controller, req, res, id) => controller.updateTask(req, res, id),
            },
            'DELETE': {
                '/tasks/': (controller, req, res, id) => controller.deleteTask(req, res, id),
            },
        };
        
        const routeHandler = routeHandlers[method] && Object.entries(routeHandlers[method]).find(([path]) => pathname.startsWith(path));
        
        if (routeHandler) {
            const [path, handler] = routeHandler;
            const id = path === '/tasks/' ? pathname.split('/')[2] : null;
            handler(this.controller, req, res, id);
        } else {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'Rota não encontrada' }));
        }
    }

    start() {
        http.createServer((req, res) => this.handleRequest(req, res)).listen(port, hostname, () => {
            console.log(`O servidor está sendo executado em http://${hostname}:${port}/`);
        });
    }
}

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

const server = new Server(taskController);
server.start();

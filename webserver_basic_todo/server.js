const http = require('http');
const { parse: parseUrl } = require('url');
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
       
        const { pathname } = parseUrl(req.url, true);
        const method = req.method;
        
        const routes = {
            'GET': {
                '/tasks': this.controller.getTasks.bind(this.controller)
            },
            'POST': {
                '/tasks': this.controller.addTask.bind(this.controller)
            },
            'PUT': {
                '/tasks/': this.controller.updateTask.bind(this.controller)
            },
            'DELETE': {
                '/tasks/': this.controller.deleteTask.bind(this.controller)
            }
        };

        const handler = routes[method] && routes[method][pathname];
        if (handler) {
            handler(req, res);
        } else {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'Rota não encontrada' }));
        }
    }

    start() {
        const server = http.createServer((req, res) => this.handleRequest(req, res));
        server.listen(port, hostname, () => {
            console.log(`O servidor está sendo executado em http://${hostname}:${port}/`);
        });
    }

}

const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

const server = new Server(taskController);
server.start();

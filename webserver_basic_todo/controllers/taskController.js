class TaskController {
    constructor(service) {
        this.service = service;
    }

    async getTasks(req, res) {
        try {
            const tasks = await this.service.getTasks();
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(tasks));
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async addTask(req, res) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const task = JSON.parse(body);
                await this.service.addTask(task);
                res.writeHead(201, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ message: 'Tarefa adicionada com sucesso' }));
            } catch (error) {
                this.handleError(res, error);
            }
        });
    }

    async updateTask(req, res, id) {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const task = JSON.parse(body);
                await this.service.updateTask(id, task);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({ message: 'Tarefa atualizada com sucesso' }));
            } catch (error) {
                this.handleError(res, error);
            }
        });
    }

    async deleteTask(req, res, id) {
        try {
            await this.service.deleteTask(id);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'Tarefa deletada com sucesso' }));
        } catch (error) {
            this.handleError(res, error);
        }
    }

    handleError(res, error) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({ message: error.message }));
    }
}

module.exports = TaskController;

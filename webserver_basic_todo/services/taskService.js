class TaskService {
    constructor(repository) {
        this.repository = repository;
    }

    async getTasks() {
        return await this.repository.getAll();
    }

    async addTask(task) {
        this.validateTask(task);
        await this.repository.add(task);
    }

    async updateTask(id, task) {
        this.validateTask(task);
        await this.repository.update(id, task);
    }

    async deleteTask(id) {
        await this.repository.delete(id);
    }

    validateTask(task) {
        if (!task.title || typeof task.title !== 'string') {
            throw new Error('Tarefa inválida: título é obrigatório e deve ser uma string');
        }
        if (!task.description || typeof task.description !== 'string') {
            throw new Error('Tarefa inválida: descrição é obrigatória e deve ser uma string');
        }
    }
}

module.exports = TaskService;

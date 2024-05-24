class TaskRepository {
    constructor() {
        this.tasks = [];
        this.currentId = 1;
    }

    async getAll() {
        return this.tasks;
    }

    async add(task) {
        task.id = this.currentId++;
        this.tasks.push(task);
    }

    async update(id, updatedTask) {
        const index = this.tasks.findIndex(task => task.id == id);
        if (index !== -1) {
            this.tasks[index] = { ...this.tasks[index], ...updatedTask };
        } else {
            throw new Error('Tarefa não encontrada');
        }
    }

    async delete(id) {
        const index = this.tasks.findIndex(task => task.id == id);
        if (index !== -1) {
            this.tasks.splice(index, 1);
        } else {
            throw new Error('Tarefa não encontrada');
        }
    }
}

module.exports = TaskRepository;

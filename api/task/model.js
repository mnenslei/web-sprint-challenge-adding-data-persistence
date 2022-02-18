// build your `Task` model here
const db = require('../../data/dbConfig')

const getAll = async () => {
    const tasks = await db('tasks as t')
    .join('projects as p', 't.project_id', 'p.project_id')
    .select('t.*', 'project_name', 'project_description')

    return tasks.map(task => {
        if (!task.task_completed) {
            return {
                ...task,
                task_completed: false
            }
        } else {
            return {
                ...task,
                task_completed: true
            }
        }
    })
}

const create = async (task) => {
    const newTask = await db('tasks').insert(task)
    .then(([task_id]) => {
        return db('tasks')
        .where({ task_id }).first()
    })
    if(newTask.task_completed === 0){
        return {
            ...newTask,
            task_completed: false
        }
    } else {
        return {
            ...newTask,
            task_completed: true
        }
    }
}

module.exports = {
    getAll,
    create
}
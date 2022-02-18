// build your `Project` model here
const db = require('../../data/dbConfig')

const getAll = async () => {
    const projects = await db('projects')
    return projects.map(project => {
        if(!project.project_completed){
            return {
                ...project,
                project_completed: false
            }
        } else {
            return {
                ...project,
                project_completed: true
            }
        }
    })
}

const create = async (project) => {
    const newProject = await db('projects').insert(project)
    .then(([project_id]) => {
        return db('projects as p')
        .where({ project_id }).first()
    })
    if(!newProject.project_completed){
        return {
            ...project,
            project_completed: false
        }
    } else {
        return {
            ...project,
            project_completed: true
        }
    }
}

module.exports = {
    getAll,
    create,
}
// build your `/api/projects` router here
const router = require('express').Router()
const Projects = require('./model')

router.get('/', (req, res, next) => {
    Projects.getAll()
    .then(project => {
        res.status(200).json(project)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
    Projects.create(req.body)
    .then(newProject => {
        res.status(201).json(newProject)
    })
    .catch(next)
})

router.use((err, req, res, next) => {//eslint-disable-line
    res.status(500).json({
        customMessage: 'wrong!',
        message: err.message,
        stack: err.stack
    })
})
module.exports = router
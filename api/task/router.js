// build your `/api/tasks` router here
const router = require('express').Router()
const Tasks = require('./model')

router.get('/', (req, res, next) => {
    Tasks.getAll()
    .then(task => {
        res.status(200).json(task)
    })
    .catch(next)
})

router.post('/', (req, res, next) => {
    Tasks.create(req.body)
    .then(newTask => {
        res.status(201).json(newTask)
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
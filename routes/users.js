const express = require('express')
const router = express.Router()
const userController = require('../controller/users')


router.post('/users/add-user', userController.postUser)

router.get('/users', userController.getUsers)

router.get('/users/edit-user/:id', userController.getUser)

router.get('/users/delete-user/:id', userController.deleteUser)

router.use('/', userController.getHome)

module.exports = router
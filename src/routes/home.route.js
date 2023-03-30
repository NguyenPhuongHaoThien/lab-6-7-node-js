const express = require('express')

const Router = express.Router()
const HomeController = require('../controllers/home.controller')

Router.get('/file', (req, res) => res.render('file'))

Router.get('/', HomeController.show)
Router.post('/uploads', HomeController.upload)
Router.use('/uploads', express.static(__dirname + '../../uploads'))

Router.post('/create', HomeController.create)
Router.post('/createFolder', HomeController.createFolder)
Router.post('/rename', HomeController.rename)
Router.post('/delete', HomeController.delete)
Router.post('/download', HomeController.download)








module.exports = Router 

const express = require('express')

const AuthController = require('../controllers/auth.controller')
const AuthPayload = require('../payloadValidator/auth.payloadValidator')

const Router = express.Router()


Router.post('/login', AuthPayload.userLogin(), AuthController.userLogin)
Router.post('/signup', AuthPayload.userSignup(), AuthController.userSignup)



module.exports = Router

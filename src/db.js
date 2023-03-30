const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set('strictQuery', true);
const { MONGODB_CONNECTION } = process.env

async function conect () {
	try {
		await mongoose.connect(MONGODB_CONNECTION)
		console.log('Connect database success')
	} catch (err) {
		console.log("Can't connect database", err)
	}
}

module.exports = { conect }
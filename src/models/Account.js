const mongoose = require('mongoose')

const AccountSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
})
const Account = mongoose.model('Account', AccountSchema)
module.exports = Account

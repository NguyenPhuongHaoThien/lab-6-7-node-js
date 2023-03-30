const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Account = require('../models/Account')

const { SECRET_KEY_JWT } = process.env

class AuthServices {
	async userLogin(username, password) {
		const account = await Account.findOne({ username })
		if (!account) {
			return 'account not found'
		}

		const isMatch = await bcrypt.compare(password, account.password)

		if (!isMatch) {
			return 'password is incorrect'
		}

		const { name } = account		
		return { name }
	}

	async userSignup(email, name, password) {
		try {
			const hashedPassword = await bcrypt.hash(password, 10);
			console.log(name,
				email,
				hashedPassword)
			const account = new Account({
			  name,
			  email,
			  password: hashedPassword
			});
			await account.save();
			console.log('account created');
		  } catch (error) {
			console.log(error.message);
		}
        
	}
}

module.exports = new AuthServices()

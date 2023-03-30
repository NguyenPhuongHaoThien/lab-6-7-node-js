const AuthServices = require('../services/auth.services')

class AuthContainer {

	async userLogin(req, res) {
		const { name, password } = req.body

		const result = await AuthServices.userLogin(name, password)
		if (typeof result === 'string') {
			return res.status(200).json('Error')
		}
		
		req.session.name = result.name ;

		return res.redirect('/')
	}

	async userSignup(req, res) {

		const { email, name, password } = req.body
		const result = await AuthServices.userSignup(email, name, password)

		if (typeof result === 'string') {
			return res.status(200).json('Error')
		}

		return res.redirect('/login');


	}
}

module.exports = new AuthContainer()


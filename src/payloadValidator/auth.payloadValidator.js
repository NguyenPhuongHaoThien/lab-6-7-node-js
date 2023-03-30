const { check } = require('express-validator')

class AuthPayload {

	userLogin() {
		return [
			check('name')
				.not()
				.isEmpty()
				.withMessage("'username' is required")
				.isLength({ min: 6, max: 20 })
				.withMessage("'username' must be between 6 and 20 characters"),
			check('password')
				.not()
				.isEmpty()
				.withMessage("'password' is required")
				.isLength({ min: 6, max: 20 })
				.withMessage("'password' must be between 6 and 20 characters"),
		]
	}
	userSignup() {
		return [
			check('name')
				.not()
				.isEmpty()
				.withMessage("'username' is required")
				.isLength({ min: 6, max: 20 })
				.withMessage("'username' must be between 6 and 20 characters"),
			check('email')
				.not()
				.isEmpty()
				.withMessage("'email' is required")
				.isLength({ min: 6, max: 30 })
				.withMessage("'email' must be between 6 and 30 characters"),
			check('password')
				.not()
				.isEmpty()
				.withMessage("'password' is required")
				.isLength({ min: 6, max: 20 })
				.withMessage("'password' must be between 6 and 20 characters"),
		]
	}
}

module.exports = new AuthPayload()

const authRoute = require('./auth.route')
const homeRoute = require('./home.route')

const setRoutes = (app) => {
	function requireLogin(req, res, next) {
		if (req.session && req.session.name) {
		  next();
		} else {
		  res.redirect('/login');
		}
	}
	app.get('/login', (req, res) => res.render('login'))
	app.get('/signup', (req, res) => res.render('register'))


	app.use('/api/auth/', authRoute)
	app.use('/', requireLogin , homeRoute)

	
	app.get((req, res) => {
		res.send("404 - Error")
	})

	app.use((err, req, res, next) => {
		res.send(err.message)
	})
}
module.exports = setRoutes
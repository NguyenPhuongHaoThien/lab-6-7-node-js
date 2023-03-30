const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')
const hbs = require('express-handlebars')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
dotenv.config()

const initDatabase = require('./src/db')
const setRoutes = require('./src/routes')

const app = express()

app.engine('handlebars', hbs.engine({
	defaultLayout: 'main',  
}))
app.set('view engine', 'handlebars')

app.use(session({
	secret: process.env.SECRET_KEY_JWT,
	resave: false,
	saveUninitialized: false,
	store: MongoStore.create({
	  mongoUrl: process.env.MONGODB_CONNECTION
	})
}));

app.use(morgan('short'))
app.use(cors())
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../../public')))

setRoutes(app)
initDatabase.conect()

const { PORT } = process.env || 3000
console.log(PORT)
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})

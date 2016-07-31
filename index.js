const express = require('express')
const bodyParser = require('body-parser')
const slackMiddleware = require('./middleware/slack')
const errorHandler = require('./middleware/error_handler')

const PORT = 31385
const app = express()

const commandDispatcher = require('./command_dispatcher')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(slackMiddleware)

app.post('/mark', (req, res, next) => {
	commandDispatcher.dispatch(req, res, next)
})

app.use(errorHandler)

app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`) } )

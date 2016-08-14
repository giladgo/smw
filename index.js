const express = require('express')
const bodyParser = require('body-parser')
const slackMiddleware = require('./middleware/slack')
const errorHandler = require('./middleware/error_handler')
const commandDispatcher = require('./command_dispatcher')

const PORT = process.env.PORT || 31385
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(slackMiddleware)

app.post('/mark', commandDispatcher)

app.get('/', (req, res) => {
	res.status(200).send('<h1>OK</h1>')
})

app.use(errorHandler)

app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`) } )

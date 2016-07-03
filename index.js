const express = require('express')
const bodyParser = require('body-parser')

const PORT = 31385
const app = express()

const commandDispatcher = require('./command_dispatcher')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(function slackParams(req, res, next) {
	req.teamId = req.body.team_id
	req.teamDomain = req.body.team_domain
	req.channelId = req.body.channel_id
	req.channelName = req.body.channel_name
	req.cmdText = req.body.text
	req.userId = req.body.user_id

	const space = req.cmdText.indexOf(' ')
	req.cmdName = req.cmdText.substr(0, space)
	req.cmdArgs = req.cmdText.substr(space + 1)
	next()
})


app.post('/mark', (req, res) => {
	commandDispatcher.dispatch(req, res)
})

app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`) } )

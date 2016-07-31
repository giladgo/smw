function slackParams(req, res, next) {
	req.teamId = req.body.team_id
	req.teamDomain = req.body.team_domain
	req.channelId = req.body.channel_id
	req.channelName = req.body.channel_name
	req.cmdText = req.body.text
	req.userId = req.body.user_id
	req.userName = req.body.user_name

	const space = req.cmdText.indexOf(' ')
	if (space >= 0) {
		req.cmdName = req.cmdText.substr(0, space)
		req.cmdArgs = req.cmdText.substr(space + 1)
	} else {
		req.cmdName = req.cmdText
	}


	res.respond = (text) => {
		res.status(200).send(text)
	}

	res.respondInChannel = (text) => {
		res.status(200).send({
			response_type: 'in_channel',
			text
		})
	}

	next()
}

module.exports = slackParams

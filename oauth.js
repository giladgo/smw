"use strict";

const slack = require('slack-api').promisify()
const Team = require('./models/team')

module.exports = (req, res) => {
	slack.oauth.access({
		client_id: process.env['SLACK_CLIENT_ID'],
		client_secret: process.env['SLACK_CLIENT_SECRET'],
		code: req.query.code,
		redirect_uri: req.query.redirect_uri
	}, null).then((response) => {
		return Team.make(
			reponse.team_id,
			response.team_name,
			response.bot.bot_user_id,
			response.bot.bot_access_token
		)
	})
}

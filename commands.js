"use strict";

const AsciiTable = require('ascii-table')
const Mark = require('./models/mark')

const HELP_TEXT = `\
\`/mark\` (short for "mark my words") is a slash command to help you tell your friends - "I told you so!"

Here are the available commands:
\`/mark my [statement]\`
	Make a statement. Mark My will repeat it in the channel, remember it for you, and will record
	the time and date it was claimed.
	Example: \`/mark my Hillary Clinton will win the presidency\`
\`/mark predictions\`
	List the predicitons that people made in this channel.
	example: \`/mark predictions\` or just \`/mark p\` as a shortcut.
\`/mark mine\`
  Show a list of your statements.
\`/mark help\`
  Show this help message.

Enjoy!
`

function marksToTable(marks) {
	const table = new AsciiTable()
	table.setHeading('Predictor', 'Date', 'Contents')
	marks.forEach((mark) => {
		table.addRow(mark.get('creator_name'), mark.displayDate(), mark.get('mark'))
	})
	return `\`\`\`\n${table.toString()}\n\`\`\``
}

module.exports = {
	my(req, res, next) {
		Mark.make(req.teamId, req.channelId, req.userId, req.userName, req.cmdArgs).then((mark) => {
			res.respondInChannel(req.userName + ' asked me to remember that they said "' + req.cmdArgs + '".')
		}).catch(next)
	},

	predictions(req, res, next) {
		Mark.byChannel(req.teamId, req.channelId).then((marks) => {
			if (marks.length === 0) {
				res.respond("Nobody has made a prediction here yet! Use `/mark my [prediction]` to make one.")
			} else {
				res.respond(marksToTable(marks))
			}
		}).catch(next)
	},

	p() {
		return this.predictions(...arguments)
	},

	mine(req, res, next) {
		Mark.byCreator(req.teamId, req.userId).then((marks) => {
			if (marks.length === 0) {
				res.respond("You haven't any predictions yet! Use `/mark my [prediction]` to make one.")
			} else {
				res.respond(marksToTable(marks))
			}
		}).catch(next)
	},

	help(req, res, next) {
		res.respond(HELP_TEXT)
	},

	__default__(req, res, next) {
		res.respond(HELP_TEXT)
	}
}

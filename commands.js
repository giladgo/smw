const AsciiTable = require('ascii-table')
const Mark = require('./models/mark')

const HELP_TEXT = `\
\`/mark\` (short for "mark my words") is a slash command to help you tell your friends - "I told you so!"

Here are the available commands:
\`/mark my [statement]\`
	Make a statement. Mark My will repeat it in the channel, remember it for you, and will record
	the time and date it was claimed.
	Example: \`/mark my Hillary Clinton will win the presidency\`
\`/mark recall [name]\`
	Recall a previous statement you made, so you can say - "Told you so!".
	example: \`/mark recall OJ4vLr8FWk\`
\`/mark mine\`
  Show a list of your statements.
\`/mark help\`
  Show this help message.

Enjoy!
`

module.exports = {
	my(req, res, next) {
		Mark.make(req.teamId, req.userId, req.userName, req.cmdArgs).then((mark) => {
			res.respondInChannel(req.userName + ' asked me to remember that they said "' + req.cmdArgs + '".'+
			' To remind folks of this, type `/mark recall ' + mark.get('name') +  '`')
		}).catch(next)
	},

	recall(req, res, next) {
		Mark.byName(req.teamId, req.userId, req.cmdArgs).then((mark) => {
			if (mark) {
				res.respondInChannel(mark.get('creator_name') + ' said ' +
					mark.displayDate() + ': "' + mark.get('mark') + '"')
			} else {
				res.respond('Could not find a statement `' + req.cmdArgs +
					'`. Use `/mark mine` to see the list of you statements.')
			}
		}).catch(next)
	},

	mine(req, res, next) {
		Mark.byCreator(req.teamId, req.userId).then((marks) => {
			if (marks.length === 0) {
				res.respond("You haven't made any statements yet!")
			} else {
				const table = new AsciiTable()
				table.setHeading('Name', 'Date', 'Contents')
				marks.forEach((mark) => {
					table.addRow(mark.get('name'), mark.displayDate(), mark.get('mark'))
				})
				res.respond(`\`\`\`\n${table.toString()}\n\`\`\``)
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

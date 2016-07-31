const AsciiTable = require('ascii-table')
const Mark = require('./models/mark')

module.exports = {
	my(req, res, next) {
		Mark.make(req.teamId, req.userId, req.userName, req.cmdArgs).then((mark) => {
			res.respond('Ok! I\'ll remember that you said that.'+
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
			const table = new AsciiTable()
			table.setHeading('Name', 'Date', 'Contents')
			marks.forEach((mark) => {
				table.addRow(mark.get('name'), mark.displayDate(), mark.get('mark'))
			})
			res.respond(`\`\`\`\n${table.toString()}\n\`\`\``)
		}).catch(next)
	}
}

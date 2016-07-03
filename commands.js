const Mark = require('./models/mark')

module.exports = {
	my(req, res) {
		Mark.make(req.userId, req.teamId, req.cmdArgs).then((mark) => {
			res.status(200).send('Ok! I\'ll remember that you said that.'+
			' To remind folks of this, type `/mark recall ' + mark.get('name') +  '`')
		})
	},

	recall(req, res) {
		res.sendStatus(200)
	},

	mine(req, res) {
		res.sendStatus(200)
	}
}

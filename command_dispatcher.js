const _ = require('lodash')
const commands = require('./commands')

function tryDispatch(req, res, next, cmdName) {
	if (typeof commands[cmdName] === 'function') {
		commands[cmdName](req, res, next)
		return true
	}
	return false
}

module.exports = {
	dispatch(req, res, next) {
		return (
			tryDispatch(req, res, next, req.cmdName) ||
			tryDispatch(req, res, next, _.camelCase(req.cmdName)) ||
			res.status(500).send("Illegal command")
		)
	}
}

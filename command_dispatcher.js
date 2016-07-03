const _ = require('lodash')
const commands = require('./commands')

function tryDispatch(req, res, cmdName) {
	if (typeof commands[cmdName] === 'function') {
		commands[cmdName](req, res)
		return true
	}
	return false
}

module.exports = {
	dispatch(req, res) {
		return (
			tryDispatch(req, res, req.cmdName) ||
			tryDispatch(req, res, _.camelCase(req.cmdName)) ||
			res.status(500).send("Illegal command")
		)
	}
}

const _ = require('lodash')
const commands = require('./commands')

function tryDispatch(req, res, next, cmdName) {
	if (typeof commands[cmdName] === 'function') {
		commands[cmdName](req, res, next)
		return true
	}
	return false
}

module.exports = (req, res, next) => {
	const boundTryDispatch = tryDispatch.bind(undefined, req, res, next)

	boundTryDispatch(req.cmdName) ||
		boundTryDispatch(_.camelCase(req.cmdName)) ||
		boundTryDispatch('__default__') ||
		res.status(500).send("Illegal command")
}

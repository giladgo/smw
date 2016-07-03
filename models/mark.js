const randomstring = require('randomstring')
const bookshelf = require('../db/bookshelf')

const Mark = bookshelf.Model.extend({ tableName: 'marks', hasTimestamps: true },
	{
		make(teamId, creatorId, text) {
	    return this.forge({
				creator_id: creatorId,
				team_id: teamId,
				name: randomstring.generate(10),
				mark: text
			}).save()
	  }
	}
)

module.exports = Mark

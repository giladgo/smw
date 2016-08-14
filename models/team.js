const randomstring = require('randomstring')
const moment = require('moment')
const bookshelf = require('../db/bookshelf')

const Team = bookshelf.Model.extend(
	{
		tableName: 'teams',
		hasTimestamps: true
	},
	{
		make(teamId, teamName, botUserId, botAccessToken) {
	    let newTeam = this.forge({
				team_id: teamId
			})

			const teamParams = {
				team_name: teamName,
				bot_user_id: botUserId,
				bot_access_token: botAccessToken
			}

			return newTeam.fetch().then((existingTeam) => {
				if (existingTeam) {
					return existingTeam.save(teamParams)
				} else {
					return newTeam.save(teamParams)
				}
			})
	  }

	}
)

module.exports = Team

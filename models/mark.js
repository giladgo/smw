const randomstring = require('randomstring')
const moment = require('moment')
const bookshelf = require('../db/bookshelf')

const Mark = bookshelf.Model.extend(
	{
		tableName: 'marks',
		hasTimestamps: true,
		displayDate() {
			return moment(this.get('created_at')).calendar(null, {
		    sameDay: '[today at] LT',
		    nextDay: '[tomorrow at] LT',
		    nextWeek: '[on] dddd',
		    lastDay: '[yesterday] at LT',
		    lastWeek: '[last] dddd [at] LT',
		    sameElse: '[on] LLL'
		})
		}
	},
	{
		make(teamId, channelId, creatorId, creatorName, text) {
	    return this.forge({
				creator_id: creatorId,
				creator_name: creatorName,
				team_id: teamId,
				channel_id: channelId,
				name: randomstring.generate(10),
				mark: text
			}).save()
	  },

		byName(teamId, creatorId, name) {
			return this.collection().query({ where: {
				team_id: teamId,
				creator_id: creatorId,
				name
			}}).fetchOne()
		},

		byCreator(teamId, creatorId) {
			return this.collection().query({ where: {
				team_id: teamId,
				creator_id: creatorId
			}}).fetch()
		},

		byChannel(teamId, channelId) {
			return this.collection().query({ where: {
				team_id: teamId,
				channel_id: channelId
			}}).fetch()
		}
	}
)

module.exports = Mark

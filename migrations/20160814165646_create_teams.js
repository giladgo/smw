
exports.up = function(knex, Promise) {
  return knex.schema.createTable('teams', (table) => {
		table.increments()
		table.string('name')
		table.string('team_id')
		table.string('bot_user_id')
		table.string('bot_access_token')
		table.timestamps()
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('teams')
};

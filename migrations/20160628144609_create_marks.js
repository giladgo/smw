
exports.up = function(knex, Promise) {
  return knex.schema.createTable('marks', (table) => {
		table.increments()
		table.string('creator_id')
		table.string('team_id')
		table.string('name')
		table.string('mark')
		table.timestamps()
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('marks')
};

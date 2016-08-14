
exports.up = function(knex, Promise) {
  return knex.schema.table('marks', (table) => {
		table.string('channel_id')
	})
};

exports.down = function(knex, Promise) {
	return knex.schema.table('marks', (table) => {
		table.dropColumn('channel_id')
	})
};

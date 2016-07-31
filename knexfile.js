// Update with your config settings.

const defaultDBSettings = {
	client: 'postgresql',
	connection: {
		database: 'smw'
	},
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}
}

module.exports = {
  development: defaultDBSettings,
  staging: defaultDBSettings,
  production: defaultDBSettings
};

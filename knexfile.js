"use strict";

const defaultDBSettings = {
	client: 'postgresql',
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	}
}

const developmentDBSettings = {
	connection: {
		database: 'smw'
	}
}

const herokuDBSettings = {
	connection: process.env.DATABASE_URL
}

module.exports = {
  development: Object.assign({}, defaultDBSettings, developmentDBSettings),
  staging: Object.assign({}, defaultDBSettings, herokuDBSettings),
  production: Object.assign({}, defaultDBSettings, herokuDBSettings)
};

import knex from 'knex'
const knexfile = require('../../knexfile')

const connection = knex(knexfile[process.env.NODE_ENV as any])

export default connection

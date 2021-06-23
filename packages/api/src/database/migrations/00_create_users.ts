import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('username').notNullable().unique()
    table.string('password').notNullable()
    table.integer('level').notNullable()
    table.date('created_at').notNullable()
    table.date('updated_at').notNullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('users')
}
import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('denunciations', table => {
    table.increments('id').primary()
    table.string('image_url').notNullable()
    table.decimal('latitude',).notNullable()
    table.decimal('longitude',).notNullable()
    table.text('description').notNullable()
    table.boolean('resolved').defaultTo(false).notNullable()
    table.timestamps(true, true)
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('denunciations')
}
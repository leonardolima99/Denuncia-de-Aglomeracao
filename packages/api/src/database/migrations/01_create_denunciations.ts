import Knex from 'knex'

export async function up(knex: Knex) {
  return knex.schema.createTable('denunciations', table => {
    table.increments('id').primary()

    // Relacionamento
    /* table.integer('user_id')
      .references('users.id')
      .notNullable() */

    table.string('image_url').notNullable()
    table.decimal('latitude', null).notNullable()
    table.decimal('longitude', null).notNullable()
    table.text('description').notNullable()
    table.boolean('resolved').defaultTo(false).notNullable()

    // Timestamp
    table.date('created_at').notNullable()
    table.date('updated_at').notNullable()
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('denunciations')
}
import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('users').insert([
    { 
      id: 1,
      username: 'leonardo',
      password: '$2a$10$Th0rwFkeMbdOBMg0D7Fi7uYQO4vraOjmOkPTtir6ZPZcX6pZwtSfy',
      level: 1,
      created_at: new Date(Date.now() - 126400000),
      updated_at: new Date(Date.now() - 126400000),
    },
    { 
      id: 2,
      username: 'admin',
      password: '$2a$10$Th0rwFkeMbdOBMg0D7Fi7uYQO4vraOjmOkPTtir6ZPZcX6pZwtSfy',
      level: 2,
      created_at: new Date(Date.now() - 6400000),
      updated_at: new Date(Date.now() - 6400000),
    },
    { 
      id: 3,
      username: 'leonardo2',
      password: '$2a$10$Th0rwFkeMbdOBMg0D7Fi7uYQO4vraOjmOkPTtir6ZPZcX6pZwtSfy',
      level: 1,
      created_at: new Date(Date.now() - 126400000),
      updated_at: new Date(Date.now() - 126400000),
    },
    { 
      id: 4,
      username: 'leonardo3',
      password: '$2a$10$Th0rwFkeMbdOBMg0D7Fi7uYQO4vraOjmOkPTtir6ZPZcX6pZwtSfy',
      level: 1,
      created_at: new Date(Date.now() - 126400000),
      updated_at: new Date(Date.now() - 126400000),
    },
  ])
}

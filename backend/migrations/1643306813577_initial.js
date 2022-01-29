/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createFunction(
    'update_updated_at',
    [],
    {
      returns: 'trigger',
      language: 'plpgsql',
    },
    `
    BEGIN
      NEW."updatedAt" = NOW();
      RETURN NEW;
    END;
    `
  )
  
  pgm.createTable('users', {
    id: {
      type: 'uuid',
      default: pgm.func('uuid_generate_v4()'),
      notNull: true,
      primaryKey: true,
    },
    username: {
      type: 'text',
      notNull: true
    },
    email: {
      type: 'text',
      notNull: 'true'
    },
    createdAt: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updatedAt: {
      type: 'timestamp with time zone',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })

  pgm.createTable('post', {
    id: {
      type: 'uuid',
      default: pgm.func('uuid_generate_v4()'),
      notNull: true,
      primaryKey: true,
    },
    title: {
      type: 'text',
      notNull: true
    },
    body: {
      type: 'text',
      notNull: 'true'
    },
    authorId: {
      type: 'uuid',
      references: '"users"(id)',
      onDelete: 'cascade',
    },
  })

  pgm.createTrigger('users', 'users_update_updated_at', {
    when: 'BEFORE',
    operation: 'UPDATE',
    function: 'update_updated_at',
    level: 'ROW',
  })
}

exports.down = pgm => {
  pgm.dropTrigger('users', 'users_update_updated_at')
  pgm.dropTable('users')
  pgm.dropFunction('update_updated_at')
}

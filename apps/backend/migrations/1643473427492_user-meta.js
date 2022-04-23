/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createType('user_type', ['NORMAL', 'ADMIN'])
  pgm.createType('color', ['RED', 'GREEN', 'BLUE'])

  pgm.addColumns('users', {
    userType: {
      type: 'user_type',
      notNull: true,
      default: 'NORMAL',
    },
    meta: {
      type: 'jsonb',
      notNull: true,
      default: '{}',
    },
    favoriteColors: {
      type: 'color[]',
      notNull: true,
      default: '{}',
    },
  })
}

exports.down = (pgm) => {
  pgm.dropColumns('users', ['userType', 'meta', 'favoriteColors'])
  pgm.dropType('color')
  pgm.dropType('user_type')
}

const { db } = require('./util/db')
// Context passed to all resolvers (third argument)
// req => Query
// connection => Subscription
// eslint-disable-next-line no-unused-vars
// code asynchrone
module.exports = async (req, connection) => {
  return {
    db: await db // attend que la base soit prête
  }
}

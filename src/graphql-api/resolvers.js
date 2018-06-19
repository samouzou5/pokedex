const GraphQLJSON = require('graphql-type-json')
// resolver = correspondance entre un champ et une fonction
// connectors
const pokemons = require('./connectors/pokemons')

module.exports = {
  JSON: GraphQLJSON,

  Pokemon: {
    types: (pokemon, args, context) => pokemons.getTypes(pokemon, context)
  },
  Query: {
    hello: (root, { name }) => `Hello ${name || 'World'}!`,
    pokemons: (root, { input }, context) => pokemons.list(input, context),
    pokemon: (root, args, context) => pokemons.find(args, context)
  },

  Mutation: {
    myMutation: (root, args, context) => {
      const message = 'My mutation completed!'
      context.pubsub.publish('hey', { mySub: message })
      return message
    }

  },

  Subscription: {
    mySub: {
      subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('hey')
    }

  }
}

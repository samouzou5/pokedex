exports.list = (input, context) => {
  return context.db.all('SELECT * FROM pokemon_base ORDER BY id LIMIT ?,50', 50 * input.page)
}

exports.find = ({ id }, context) => {
  return context.db.get('SELECT * FROM pokemon_base WHERE id = ?', id)
}

exports.getTypes = (pokemon, context) => {
  const list = [
    {id: pokemon.type_1}
  ]
  if (pokemon.type_2) {
    list.push({
      id: pokemon.type_2
    })
  }
  return list
}

/* Favorite management */

const favoritePokemons = new Map()
exports.isFavorite = ({ id }, context) => {
  return favoritePokemons.has(id)
}

exports.toggleFavorite = ({ id }, context) => {
  if (favoritePokemons.has(id)) {
    favoritePokemons.delete(id)
  } else {
    favoritePokemons.add(id)
  }
  return exports.find({ id }, context)
}

const sqlite = require('sqlite')
const path = require('path')
// on recupère le fichier en indiquant son chemin
const dbPath = path.resolve(__dirname, '../../live/Pokedex.db')
const db = sqlite.open(dbPath)
// export de la base
exports.db = db

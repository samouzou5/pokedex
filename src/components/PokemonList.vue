<template>
  <div class="pokemon-list">
    <h1>Pokedex</h1>
    <div class="toolbar">
      <input
       v-model="search"
       placeholder="Filter..."
      >
    </div>
    <div class="pokemons">
    <PokemonListItem
    v-for="pokemon of filteredPokemons"
    :key="pokemon.id"
    :pokemon="pokemon"
    />
    </div>
  </div>
</template>

<script>
import pokemons from '@/assets/pokemons.json'
import PokemonListItem from './PokemonListItem'
export default {
  components: {
    PokemonListItem
  },
  data () {
    return {
      pokemons,
      search: ''
    }
  },
  computed: {
    filteredPokemons () {
      if (!this.search) {
        return this.pokemons
      }
      const lowerCaseSearch = this.search.toLowerCase()
      return this.pokemons.filter(
        pokemon => pokemon.name.toLowerCase().indexOf(lowerCaseSearch) !== -1
      )
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~@/style/imports.styl'
.pokemon-list
  margin $padding
.pokemons
  display grid
  grid-template-columns repeat(auto-fill, 200px)
  grid-auto-rows 200px
  grid-gap 12px
.toolbar
  margin-bottom $padding
</style>

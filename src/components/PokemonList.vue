<template>
  <div class="pokemon-list">
    <h1>Pokedex</h1>
    <div class="toolbar">
      <input v-model="search" placeholder="Filter...">
    </div>

    <BaseLoader v-if="!pokemons"/>

    <template v-else>
      <div class="pokemons">
        <PokemonListItem
          v-for="pokemon of displayedPokemons"
          :key="pokemon.id"
          :pokemon="pokemon"
        />
      </div>

      <div class="bottom-actions">
        <button  @click="loadMorePokemons()">Load more</button>
      </div>
    </template>
  </div>
</template>

<script>
import PokemonListItem from './PokemonListItem'
import POKEMONS from '../graphql/pokemons.gql'

let page = 0

export default {
  components: {
    PokemonListItem
  },
  data () {
    return {
      search: ''
    }
  },
  apollo: {
    pokemons: {
      query: POKEMONS,
      variables: {
        input: {
          page: 0
        }
      }
    }
  },
  computed: {
    displayedPokemons () {
      if (this.search) {
        const regex = new RegExp(this.search, 'i')
        return this.pokemons.filter(
          pokemon => pokemon.name.match(regex)
        )
      }
      return this.pokemons
    }
  },
  methods: {
    loadMorePokemons () {
      page++

      this.$apollo.queries.pokemons.fetchMore({
        variables: {
          input: {
            page
          }
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newPokemons = fetchMoreResult.pokemons
          return {
            pokemons: [
              ...previousResult.pokemons, ...newPokemons
            ]
          }
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/style/imports'
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

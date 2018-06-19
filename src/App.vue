<template>
  <div id="app">
    <div id="nav">
      <router-link :to="{name: 'home'}">Home</router-link>
    </div>
    <router-link @toggleFavorite="onToggleFavorite()"></router-link>
    <router-view/>
  </div>
</template>

<style lang="stylus">
@import '~@/style/main.styl'
</style>

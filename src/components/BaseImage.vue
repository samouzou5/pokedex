<template>
  <div class="base-image"
    :class="{
        loaded
      }">
    <img :src="src" alt="Image" class="image" @load="onLoad" />
    <transition name="fade">
      <BaseLoader v-if="!loaded" />
    </transition>
  </div>
</template>

<script>
const isLoaded = new Map()

export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      loaded: isLoaded.get(this.src)
    }
  },

  methods: {
    onLoad () {
      this.loaded = true
      isLoaded.set(this.src, true)
    }
  }

}
</script>
<style lang="stylus" scoped>
.base-image
  position relative
  .image
    width 100%
    height @width
    opacity 0
    transition opacity .15s
  &.loaded
    .image
      opacity 1
  .base-loader
    position absolute
    top 0
    left 0
    width 100%
    height 100%
</style>

<template>
  <component :is="componentName"></component>
</template>

<script>

export default {
  name: 'ComponentLoader',
  props: {
    value: {
      type: String
    }
  },
  computed: {
    componentName() {
      if(!this.value) return false
      return () => import(`@/views/${this.value}.vue`)
    }
  },
}
</script>

<style scoped lang="scss">
</style>

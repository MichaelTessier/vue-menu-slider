<template>
  <div class="menu-slider">
    <div
      ref="items"
      class="items"
    >
      <div
        v-for="n in 10"
        :key="n"
        class="item"
      >
        item {{ n }}
      </div>
    </div>
    <div class="controls">
      <button
        class="prev"
        :disabled="!canPrev"
        @click="prev"
      >
        prev
      </button>
      <button
        class="next"
        :disabled="!canNext"
        @click="next"
      >
        next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuSlider',
  props: {
    // msg: String
  },
  data () {
    return {
      canPrev: false,
      canNext: true
    }
  },
  methods: {
    prev () {
      const { offsetLeft, scrollLeft, children } = this.$refs.items
      this.canNext = true

      const prevItem = Object.values(children).reverse().find((child, index) => {
        if (!child || index === 0) return false
        if (index === children.length - 1) this.canPrev = false
        return (child.offsetLeft) < (offsetLeft + scrollLeft)
      })

      if (!prevItem) return false

      this.$refs.items.scrollLeft = prevItem.offsetLeft - this.$refs.items.offsetLeft
    },
    next () {
      const { offsetWidth, offsetLeft, scrollLeft, children } = this.$refs.items
      this.canPrev = true

      const nextItem = Object.values(children).find((child, index) => {
        if (!child) return false
        if (index === children.length - 1) this.canNext = false
        return (child.offsetWidth + child.offsetLeft) > (offsetLeft + offsetWidth + scrollLeft)
      })

      if (!nextItem) return false

      this.$refs.items.scrollLeft = (nextItem.offsetWidth + nextItem.offsetLeft) - (offsetLeft + offsetWidth)
    }
  }
}
</script>

<style scoped lang="scss">
.menu-slider {
  display: flex;

  & .items {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      display: none;
    }

    & .item {
      display: flex;
      white-space: nowrap;

      margin: 0 4px;
      padding: 5px;
      border-radius: 4px;
      border: 1px solid #eee;
    }
  }

  & .controls {
    display: flex;
  }
}

</style>

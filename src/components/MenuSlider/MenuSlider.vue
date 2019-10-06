<template>
  <div class="menu-slider">
    <div class="items" ref="items">
      <div
        v-for="n in 20"
        :key="n"
        class="item"
      >
        item {{ n }}
      </div>
    </div>
    <div class="controls">
      <button class="prev" @click="prev" :disabled="!canPrev">
        prev
      </button>
      <button class="next" @click="next" :disabled="!canNext">
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
  data() {
    return {
      canPrev: false,
      canNext: true
    }
  },
  methods: {
    prev () {
      const {offsetWidth, offsetLeft, scrollLeft, children} = this.$refs.items

      const prevItem = Object.values(children).find((child) => {
        return (child.offsetWidth + child.offsetLeft) < (offsetLeft + offsetWidth + scrollLeft)
      })

      this.$refs.items.scrollLeft = this.$refs.items.scrollLeft - prevItem.offsetWidth * 2
    },
    next () {
      const {offsetWidth, offsetLeft, scrollLeft, children} = this.$refs.items

      const nextItem = Object.values(children).find((child) => {
        if (!child) return false
        return (child.offsetWidth + child.offsetLeft) > (offsetLeft + offsetWidth + scrollLeft)
      })


      console.log(nextItem)
      this.canNext === nextItem
      if (!nextItem) return false


      this.$refs.items.scrollLeft = this.$refs.items.scrollLeft + nextItem.offsetWidth * 2
      
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

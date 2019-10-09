<template>
  <div class="menu-slider">
    <div
      ref="container"
      class="container"
    >
      <router-link
        v-for="(item, index) in items"
        :key="index"
        v-slot="{ isExactActive }"
        tag="div"
        :to="item.to"
        @click.native="onClick($event, item.to)"
      >
        <div
          class="item"
          :style="[isExactActive && activeStyle]"
        >
          {{ item.label }}
        </div>
      </router-link>
    </div>
    <div class="controls">
      <button
        class="prev"
        :disabled="!canPrev"
        @click="prev"
      >
        <
      </button>
      <button
        class="next"
        :disabled="!canNext"
        @click="next"
      >
        >
      </button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MenuSlider',
  props: {
    items: {
      type: Array,
      required: true
    },
    activeColor: {
      type: String,
      default: '66, 185, 131'
    }
  },
  data () {
    return {
      canPrev: false,
      canNext: true
    }
  },
  computed: {
    activeStyle () {
      return {
        color: `rgb(${this.activeColor}`,
        backgroundColor: `rgba(${this.activeColor}, .1)`,
        borderColor: `rgba(${this.activeColor}, .3)`
      }
    }
  },
  methods: {
    prev () {
      const { offsetLeft, scrollLeft, children } = this.$refs.container
      this.canNext = true

      const prevItem = Object.values(children).reverse().find((child, index) => {
        if (!child) return false
        if (index === children.length - 1) this.canPrev = false

        return (child.offsetLeft) < (offsetLeft + scrollLeft)
      })

      if (!prevItem) return false

      this.$refs.container.scrollLeft = prevItem.offsetLeft - offsetLeft
    },
    next () {
      const { offsetWidth, offsetLeft, scrollLeft, children } = this.$refs.container
      this.canPrev = true

      const nextItem = Object.values(children).find((child, index) => {
        if (!child) return false
        if (index === children.length - 1) this.canNext = false

        return (child.offsetWidth + child.offsetLeft) > (offsetLeft + offsetWidth + scrollLeft)
      })

      if (!nextItem) return false

      this.$refs.container.scrollLeft = (nextItem.offsetWidth + nextItem.offsetLeft) - (offsetLeft + offsetWidth)
    },
    onClick (event, to) {
      const target = event.target
      const { offsetLeft, scrollLeft, offsetWidth } = this.$refs.container

      if ((offsetLeft + scrollLeft) > target.offsetLeft) {
        this.prev()
      } else if ((offsetLeft + scrollLeft + offsetWidth) < (target.offsetLeft + target.offsetWidth)) {
        this.next()
      }
      this.$router.push(to)
    }

  }
}
</script>

<style scoped lang="scss">
.menu-slider {
  display: flex;

  & .container {
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
      display: none;
    }

    & .item {
      display: flex;
      white-space: nowrap;
      cursor: pointer;
      margin: 0 .3em;
      padding: .3em .8em;
      border-radius: 30px;
      border: 1px solid #eee;
      transition: all .4s ease;
    }
  }

  & .controls {
    display: flex;

    & button {
      background: none;
      font-family: inherit;
      font-size: 100%;
      line-height: 1.15;
      margin: 0;
      outline: none;
      border: 1px solid #eee;
    }
  }
}

</style>

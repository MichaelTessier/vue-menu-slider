<template>
  <div class="menu-slider">
    <div
      ref="container"
      class="container"
      @scroll="handleScroll"
    >
      <div
        v-for="(item, index) in items"
        :key="index"
      >
        <slot 
          name="item" 
          :item="item" 
          :onClick="{
            click: ($event) => onClick($event)
          }"
        >
          <div class="item" @click="onClick($event, item)">{{ item.label }}</div>
        </slot>
      </div>
    </div>
    <div class="controls">
      <button
        class="prev"
        @click="prev"
        :disabled="!canPrev"
      >
        <slot name="prev">
          {{ prevLabel }}
        </slot>
      </button>
      <button
        class="next"
        :disabled="!canNext"
        @click="next"
      >
        <slot name="next">
          {{ nextLabel }}
        </slot>
      </button>
    </div>
  </div>
</template>

<script>

import { 
  getPrevItem, 
  getNextItem, 
  removeClass 
} from './_lib'

const ACTIVE_CLASS = 'ms-item-is-active'

export default {
  name: 'MenuSlider',
  props: {
    items: {
      type: Array,
      required: true
    },
    prevLabel: {
      type: String,
      default: 'Prev'
    },
    nextLabel: {
      type: String,
      default: 'Next'
    },
  },
  data() {
    return {
      index: 0,
      lastItem: null,
    }
  },
  computed: {
    canPrev() { 
      return this.index > 0
    },
    canNext() {
      return this.index < this.items.length - 1
    }
  },
  mounted() {
    this.lastItem = Object.values(this.$refs.container.children).pop()
  },
  methods: {
    prev() {
      const { children, scrollLeft, offsetLeft } = this.$refs.container
      const item = getPrevItem(children, scrollLeft, offsetLeft)

      this.scrollTo(item.offsetLeft - offsetLeft);
    },
    next() {
      const container = this.$refs.container
      const { children } = container
      const { 
        right: containerRight, 
        left: containerLeft 
      } = container.getBoundingClientRect()

      const nextItem = getNextItem(children, containerRight)

      this.scrollTo(nextItem.offsetLeft - containerLeft);
    },
    scrollTo(offset) {
      this.$refs.container.scrollTo({
          "behavior": "smooth",
          "left": offset,
      });
    },
    onClick (event, item) {
      if(!event && !event.target) return false
      const target = event.target
      const { offsetLeft, scrollLeft, offsetWidth } = this.$refs.container

      this.addActiveClass(target)

      if ((offsetLeft + scrollLeft) > target.offsetLeft) {
        this.prev()
      } else if ((offsetLeft + scrollLeft + offsetWidth) < (target.offsetLeft + target.offsetWidth)) {
        this.next()
      }

      this.$emit('onClick', item)
    },
    addActiveClass(target) {
      if(!target) return false
      const { children } = this.$refs.container
     
      removeClass(children, ACTIVE_CLASS)
     
      target.classList.add(ACTIVE_CLASS)
    },
    handleScroll(event) {
      const targetScrollLeft = event.target.scrollLeft
      const targetScrollRight = Math.round(event.target.getBoundingClientRect().right)
      const lastItemRight = Math.round(this.lastItem.getBoundingClientRect().right)
      
      if(targetScrollLeft === 0) this.index = 0
      if(targetScrollLeft > 0) this.index = 1
      if(targetScrollRight >= lastItemRight) this.index = this.items.length - 1
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

    & > * {
      white-space: nowrap;
      cursor: pointer;
    }

    & .item {
      display: flex;
      margin: 0 .3em;
      padding: .3em .8em;
      border-radius: 30px;
      border: 1px solid #eee;
      transition: all .4s ease;

      &.ms-item-is-active {
        color: green;
      }
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
      cursor: pointer;
    }
  }
}

</style>

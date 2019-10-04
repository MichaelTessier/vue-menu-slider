<template>
  <div class="menu-slider">
    <div class="container">
      <div
        v-for="n in 10"
        :key="n"
        class="item"
      >
        item {{ n }}
      </div>
    </div>

    <div class="controls">
      <div class="prev">
        prev
      </div>
      <div class="next">
        next
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuSlider',
  props: {
    // msg: String
  },
  // data: () => ({
  //   items: [
  //     'item 1',
  //     'item 2',
  //     'item 3'
  //   ]
  // }),
  methods: {
    canPrev () {
      // to implement
    },
    prev () {
      // to implement
    },
    canNext () {
      // to implement
    },
    next () {
      // to implement
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

    &::-webkit-scrollbar {
      display: none;
    }

    & .item {
      display: flex;
      white-space: nowrap;

      margin: 0 2px;
      padding: 3px;
      border-radius: 2px;
      border: 1px solid #eee;
    }
  }

  & .controls {
    display: flex;
  }
}

</style>

<template>
  <div class="home">
    <div class="container">
      <MenuSlider />
    </div>
  </div>
</template>

<script>

import { MenuSlider } from '@/components/MenuSlider'

export default {
  name: 'Home',
  components: {
    MenuSlider
  }
}

</script>

<style scoped lang="scss">
.container {
  width: 500px;
  margin: 0 auto;
}
</style>

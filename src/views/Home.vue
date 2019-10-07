<template>
  <div class="home">
    <div class="container">
      <MenuSlider :items="items" />
      <router-view />
    </div>
  </div>
</template>

<script>

import { MenuSlider } from '@/components/MenuSlider'

export default {
  name: 'Home',
  components: {
    MenuSlider
  },
  data: () => ({
    items: [
      {
        label: 'Ambiance',
        to: { name: 'contact' }
      },
      {
        label: 'Management',
        to: { name: 'about' }
      },
      {
        label: `Rôle et persepective d'évolution`,
        to: { name: 'page-a' }
      },
      {
        label: 'Espece et condotions de travail',
        to: { name: 'page-b' }
      }
    ]
  })
}

</script>

<style scoped lang="scss">
.container {
  width: 500px;
  margin: 0 auto;
}
</style>

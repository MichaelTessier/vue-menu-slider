<template>
  <div class="home">
    <div class="container">

      <h1> Avec composants dynamiques </h1>

      <MenuSlider :items="componentsLinks" @onClick="switchComponent">
        <div slot="prev">Précedent</div>
        <div slot="next">Suivant</div>
      </MenuSlider>

      <ComponentLoader v-model="activeComponent" ></ComponentLoader>

      <h1> Avec router </h1>

      <MenuSlider class="custom-menu-slider"  
       :items="routerLinks">
        <template v-slot:item="{ item, onClick }" >
          <div v-on="onClick">
            <router-link :to="item.to">{{ item.label }}</router-link>
          </div>
        </template>
      </MenuSlider>
      <router-view />

    </div>
  </div>
</template>

<script>

import { MenuSlider } from '@/components/MenuSlider'
import { ComponentLoader } from '@/components/ComponentLoader'

export default {
  name: 'Home',
  components: {
    MenuSlider,
    ComponentLoader
  },
  data() {
    return {
      activeComponent: 'Contact',
      routerLinks: [
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
          label: 'Espece et conditions de travail',
          to: { name: 'page-b' }
        },
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
          label: 'Espece et conditions de travail',
          to: { name: 'page-b' }
        }
      ],
      componentsLinks: [
        {
          label: 'Component Contact',
          component: { name: 'Contact' }
        },
        {
          label: 'Component About',
          component: { name: 'About' }
        },
        {
          label: `Component PageA`,
          component: { name: 'PageA' }
        },
        {
          label: 'Component PageB',
          component: { name: 'PageB' }
        }
      ]
    }
  },
  methods: {
    routerMethod(item) {
      this.$router.push(item.to)
    },
    switchComponent(item) {
      this.activeComponent = item.component.name
    }
  }
}

</script>

<style lang="scss">

.container {
  width: 500px;
  margin: 0 auto;
}

.custom-menu-slider {
  .ms-item-is-active {
    color: red;
  }
}

</style>

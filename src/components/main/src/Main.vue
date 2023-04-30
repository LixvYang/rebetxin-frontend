<template>
  <div class="main" :style="{ paddingTop: !isMobile ? '0' : '50px' }">
    <nav-search />
    <category-tab />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavSearch from './cpns/nav-search.vue'
import CategoryTab from './cpns/category-tab.vue'
import store from '@/store'
import { computed } from 'vue'

export default defineComponent({
  components: {
    NavSearch,
    CategoryTab
  },
  setup () {
    const isMobile = computed(() => store.state.main.isMobile)

    return {
      isMobile
    }
  }
})
</script>

<style scoped>


</style>

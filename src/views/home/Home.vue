<template>
  <div class="home">
    <Main class="main"></Main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Main from '@/layouts/main'

import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    Main,
  },
  setup () {
    const route = useRoute()
    const routePath = route.path
    console.log(routePath)

    return {
      routePath
    }
  }
})
</script>

<style scoped>
</style>

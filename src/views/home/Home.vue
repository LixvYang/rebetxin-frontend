<template>
  <div class="home">
    <Main class="main"></Main>

    <KeepAlive>
      <Footer class="footer"></Footer>
    </KeepAlive>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Footer from '@/components/footer'
import Main from '@/components/main'

import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
    Main,
    Footer,
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

<template>
  <div class="home">
    <Main class="main"></Main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Main from '@/layouts/main'


export default defineComponent({
  components: {
    Main,
  },
  setup () {

    return {
    }
  }
})
</script>

<style scoped>
</style>

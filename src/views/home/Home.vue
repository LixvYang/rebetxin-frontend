<template>
  <div class="home">
    <Header class="header"></Header>
    <Main class="main"></Main>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/header'
import Footer from '@/components/footer'
import Main from '@/components/main'

export default defineComponent({
  components: {
    Header,
    Footer,
    Main
  },
  setup () {

    return {
      Header
    }
  }
})
</script>

<style scoped>
</style>

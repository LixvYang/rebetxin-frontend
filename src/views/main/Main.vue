<template>
  <div>
    <KeepAlive>
      <Header></Header>
    </KeepAlive>

    <router-view />

    <KeepAlive>
      <Footer class="footer"></Footer>
    </KeepAlive>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/layouts/header';
import Footer from '@/layouts/footer';

export default defineComponent({
  components: {
    Header,
    Footer
  },
  setup () {

    return {}
  }
})
</script>

<style scoped>

</style>

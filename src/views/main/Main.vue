<template>
  <div>
    <KeepAlive>
      <Header></Header>
    </KeepAlive>

    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/header';
export default defineComponent({
  components: {
    Header
  },
  setup () {

    return {}
  }
})
</script>

<style scoped>

</style>

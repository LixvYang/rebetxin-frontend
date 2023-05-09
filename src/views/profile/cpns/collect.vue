<template>
  <div class="collect">
    <topic-list />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TopicList from '@/components/topic-list'

export default defineComponent({
  components: {
    TopicList
  },
  setup () {


    return {}
  }
})
</script>

<style scoped>

</style>

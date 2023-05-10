<template>
  <div class="boarder">
    <TopicContent></TopicContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TopicContent from './cpns/topic-content.vue';

export default defineComponent({
  components: {
    TopicContent
  },
  setup () {

    return {
    }
  }
})
</script>

<style scoped>
.topic {
  padding-top: 50px;
}
</style>

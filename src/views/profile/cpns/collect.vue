<template>
  <div class="collect">
    <van-list
      :finished="true"
      finished-text="END"
    >
      <template v-for="item in list" :key="item">
        <topic-item
          :collect="true"
          class="topic-item"
          :topic="item.topic"
        />
      </template>
    </van-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import TopicItem from '@/components/topic-list/src/cpns/topic-item.vue'

export default defineComponent({
  components: {
    TopicItem
  },
  setup () {
    const store = useStore()
    const list = computed(() => store.state.main.collectList)
    store.dispatch('main/handleTopicCollectList')

    return {
      list
    }
  }
})
</script>

<style scoped>

</style>

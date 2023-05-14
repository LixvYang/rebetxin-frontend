<template>
  <div class="purchase">
    <van-list
      :finished="true"
      finished-text="END"
    >
      <template v-for="item in list" :key="item">
        <topic-item
          :purchase="true"
          class="topic-item"
          :topic="item"
        />
      </template>
    </van-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import TopicItem from '@/components/topic-list/src/cpns/topic-item.vue'


export default defineComponent({
  components: {
    TopicItem
  },
  setup () {
    const store = useStore()
    const list = computed(() => store.state.main.purchaseList)
    store.dispatch('main/handleTopicPurchaseList')

    return {
      list
    }
  }
})
</script>

<style scoped>

</style>

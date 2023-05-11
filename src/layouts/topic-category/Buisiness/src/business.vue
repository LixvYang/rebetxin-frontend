<template>
  <div class="business">
    <van-list
      v-model:loading="loading"
      :finished="loadingFinished"
      finished-text="没有更多了"
      @load="loadingTopics"
    >
      <template v-for="item in list" :key="item">
        <topic-item
          class="topic-item"
          :topic="item"
        />
      </template>
    </van-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { computed } from 'vue'
import TopicItem from '@/components/topic-list/src/cpns/topic-item.vue'
import { getTopicsByCid } from '@/service/topic/topic'
import { ref } from 'vue'

export default defineComponent({
  components: {
    TopicItem
  },
  setup () {
    const store = useStore()
    const list = computed(() => store.state.main.businessList)
    const loading = ref(false)
    const loadingFinished = ref(false)

    const prePageToken = computed(() => store.state.main.businessPrePageToken)

    const loadingTopics = async () => {
      // loading data
      const res = await getTopicsByCid('1', prePageToken.value, store.state.user.userInfo.uid ?? '')
      store.commit('main/appendBusinessList', res.data.list)
      store.commit('main/changeBusinessToken', res.data.pre_page_token)
      // 加载状态结束
      loading.value = false
      // 数据全部加载完成
      if (prePageToken.value === '') {
        loadingFinished.value = true
      }
    }


    return {
      list,
      loadingTopics,
      loading,
      loadingFinished
    }
  }
})
</script>

<style scoped>

</style>

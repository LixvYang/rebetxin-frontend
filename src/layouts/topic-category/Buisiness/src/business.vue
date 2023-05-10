<template>
  <div class="business">
    <v-infinite-scroll :height="300" :items="list" :onLoad="loadingTopics">
      <template v-for="(item, index) in list" :key="item">
        <div :class="['pa-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
          Item #{{ item }}
        </div>
      </template>
      <span>加载更多</span>
      <template v-slot:loading>
        <v-progress-linear color="blue" height="2"></v-progress-linear>
      </template>
    </v-infinite-scroll>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from '@/store'
import { computed } from 'vue'

export default defineComponent({
  components: {
  },
  setup () {
    const store = useStore()
    const list = computed(() => store.state.main.businessList)
    store.dispatch('main/handleTopicList', {
      cid: '1',
      category: 'Business'
    })
    const prePageToken = computed(() => store.state.main.businessPrePageToken)
      if (prePageToken.value != '') {
        store.dispatch('main/handleTopicList', {
        cid: '1',
        category: 'Business'
      })
    }

    const loadingTopics = ({done}) => {
      setTimeout(() => {
        if (prePageToken.value != '') {
          store.dispatch('main/handleTopicList', {
            cid: '1',
            category: 'Business'
          })
        }
        if (prePageToken.value == '') {
          done('empty')
        }
        done('ok')
      }, 1000)
    }


    return {
      list,
      loadingTopics
    }
  }
})
</script>

<style scoped>

</style>

<template>
  <div class="topic-item">
    <v-card
      class="mx-auto"
      max-width="700"
    >
      <v-img
        height="200"
        :src="topic.img_url"
        cover
        class="text-white"
      >
        <v-toolbar
          color="rgba(0, 0, 0, 0)"
          theme="dark"
        >
          <v-spacer></v-spacer>
          <v-btn rounded :color="isCollect"  icon="mdi mdi-star" @click="handleCollctClick"></v-btn>
          <template v-slot:append>
            <v-btn rounded icon="mdi mdi-share-variant-outline" @click="handleShareClick(topic.tid, topic.intro, topic.img_url, topic.title)"></v-btn>
          </template>
        </v-toolbar>
        <v-card-title class="text-left align-end" style="position: absolute; bottom: 0;">
          {{topic.title}}
        </v-card-title>

        <v-card-title class="text-left align-end" style="position: absolute; bottom: 0; right: 0%;">
          {{formattedTotalPrice(topic.total_price)}}
        </v-card-title>
      </v-img>

      <v-progress-linear
        :model-value="topic.yes_ratio"
        color="#5ddb92"
        bg-opacity="0.65"
        height="20"
        :bg-color="negativeColor"
        rounded
        rounded-bar
        >
        <strong>{{ Math.ceil(topic.yes_ratio > topic.no_ratio ? topic.yes_ratio : topic.no_ratio) }}%</strong>
      </v-progress-linear>

      <div style="display: flex; justify-content: space-between;">
        <v-card-subtitle class="pt-4">
          {{ topic.category.category_name }}
        </v-card-subtitle>
        <v-card-subtitle class="pt-4">
          Create: {{  formatedCreatedTime(topic.created_at) }}
        </v-card-subtitle>
      </div>

      <div style="display: flex; justify-content: space-between;">
        <v-card-text>
          <div>{{ topic.intro }}</div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="light-blue" @click="handleEnterClick">
            Enter
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter } from 'vue-router'
import { formatedCreatedTime, formattedTotalPrice, handleShareClick } from '../config/config'
import { useStore } from '@/store'
import { deleteCollect, createCollect } from '@/service/collect/collect'
import { showToast } from 'vant'

export default defineComponent({
  props: {
    topic: {
      type: Object,
      required: true
    },
    collect: {
      type: Boolean,
      default: false
    },
    purchase: {
      type: Boolean,
      default: false
    }
  },
  setup (props, {emit}) {
    const positiveValue = 60
    const negativeColor = 'red'
    const router = useRouter()
    const store = useStore()
    const isCollect = computed(() => props.topic.is_collect === 1 ? 'yellow' : '')

    const handleEnterClick = () => {
      store.commit('main/changeTopicContent', props.topic)
      router.push(`/main/topic/${props.topic.tid}`)
    }

    const handleCollctClick = async () => {
      if (!store.state.user.userInfo.uid) {
        showToast('请先登陆.')
      }
      if (isCollect.value == '') {
        const res = await createCollect(props.topic.tid)
        if (res.code === 0) {
          showToast('收藏成功')
          store.dispatch('main/handleCollectAction', {tid: props.topic.tid, is_collect: 1, category: props.topic.category.category_name, collect: props.collect, purchase: props.purchase})
        }
      } else {
        const res = await deleteCollect(props.topic.tid)
        if (res.code === 0) {
          showToast('取消收藏')
          store.dispatch('main/handleCollectAction', {tid: props.topic.tid, is_collect: 0, category: props.topic.category.category_name, collect: props.collect, purchase: props.purchase})
        }
        store.dispatch('main/handleTopicContent', {tid: props.topic.tid, uid: store.state.user.userInfo.uid})
      }
      if (props.collect == true) {
        store.dispatch('main/handleTopicCollectList')
      }
      if (props.purchase == true) {
        store.dispatch('main/handleTopicPurchaseList')
      }
    }

    return {
      formattedTotalPrice,
      formatedCreatedTime,
      handleCollctClick,
      handleShareClick,
      handleEnterClick,
      positiveValue,
      negativeColor,
      isCollect
    }
  }
})
</script>

<style scoped>

</style>

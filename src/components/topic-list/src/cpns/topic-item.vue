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
            <v-btn rounded :color="topic.is_collect === 1 ? 'teal' : ''"  icon="mdi mdi-bookmark-box-outline"></v-btn>
          <template v-slot:append>
            <v-btn rounded icon="mdi mdi-send" @click="handleShareClick"></v-btn>
          </template>
        </v-toolbar>
        <v-card-title class="text-left align-end" style="position: absolute; bottom: 0;">
          {{topic.title}}
        </v-card-title>

        <v-card-title class="text-left align-end" style="position: absolute; bottom: 0; right: 0%;">
          {{formattedTotalPrice}}
        </v-card-title>
      </v-img>

      <v-progress-linear
        model-value="40"
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
          {{topic.category.category_name}}
        </v-card-subtitle>
        <v-card-subtitle class="pt-4">
          Create: {{formatedCreatedTime}}
        </v-card-subtitle>
      </div>


      <v-card-text>
        <div>{{ topic.intro }}</div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { SITE_URL } from '@/service/request/config'
import { computed } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    topic: {
      type: Object,
      required: true
    }
  },
  setup (props, {emit}) {
    const positiveValue = 60
    const negativeColor = 'red'
    const formattedTotalPrice = computed(() => {
      if (props.topic.total_price >= 10000) {
        return (Math.round(props.topic.total_price / 1000) / 10) + '万';
      } else {
        return props.topic.total_price;
      }
    })

    const formatedCreatedTime = computed(() => {
      const dateTimeString = props.topic.created_at;
      const datePart = dateTimeString.substring(0, 10);
      const timePart = dateTimeString.substring(11, 19);
      const dateTime = new Date(`${datePart}T${timePart}`);
      const formattedDateTime = dateTime.toLocaleString('zh-CN', { hour12: false });
      return formattedDateTime;
    })

    const handleShareClick = () => {
      const data = {
        action: `${SITE_URL}/main/topic/${props.topic.tid}`,
        app_id: "c1412f68-6152-40ad-a193-f7fadf9328a1",
        description: `${props.topic.intro}`,
        icon_url: `${props.topic.img_url}`,
        title: `${props.topic.title}`
      };
      window.open("mixin://send?category=app_card&data=" + encodeURIComponent(btoa(JSON.stringify(data))))
    }


    return {
      formattedTotalPrice,
      formatedCreatedTime,
      handleShareClick,
      positiveValue,
      negativeColor
    }
  }
})
</script>

<style scoped>

</style>

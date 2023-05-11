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
          <template v-slot:append>
            <v-btn rounded icon="mdi-dots-vertical"></v-btn>
          </template>

          <v-btn icon rounded>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

        </v-toolbar>
        <v-card-title class="text-left align-end" style="position: absolute; bottom: 0;">
          {{topic.title}}
        </v-card-title>

        <v-card-title class="text-left align-end" style="position: absolute; bottom: 0; right: 0%;">
          {{topic.total_price}}
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
          {{topic.created_at}}
        </v-card-subtitle>
      </div>


      <v-card-text>
        <div>{{ topic.intro }}</div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    topic: {
      type: Object,
      required: true
    }
  },
  setup () {
    const positiveValue = 60
    const negativeColor = 'red'


    return {
      positiveValue,
      negativeColor
    }
  }
})
</script>

<style scoped>

</style>

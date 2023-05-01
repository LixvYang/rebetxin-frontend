<template>
  <div class="topic-item">
    <v-card
      class="mx-auto"
      max-width="700"
    >
      <v-img
        height="200"
        src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
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
          Your Title
        </v-card-title>

        <v-card-title class="text-left align-end" style="position: absolute; bottom: 0; right: 0%;">
          Amount
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
        <strong>{{ Math.ceil(20) }}%</strong>
      </v-progress-linear>

      <div style="display: flex; justify-content: space-between;">
        <v-card-subtitle class="pt-4">
          Category
        </v-card-subtitle>
        <v-card-subtitle class="pt-4">
          Created Time
        </v-card-subtitle>
      </div>


      <v-card-text>
        <div>This is a Intro</div>
      </v-card-text>

      <!-- <v-card-actions>
        <v-btn color="orange">
          Share
        </v-btn>
        <v-btn color="orange">
          Explore
        </v-btn>
      </v-card-actions> -->
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
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

<template>
  <div class="topic-list">
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" md="6">
            <topic-item />
          </v-col>
          <v-col cols="12" md="6">
            <topic-item />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TopicItem from './cpns/topic-item.vue'

export default defineComponent({
  components: {
    TopicItem
  },
  setup () {


    return {}
  }
})
</script>

<style scoped>

</style>

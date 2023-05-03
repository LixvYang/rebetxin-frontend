<template>
  <div class="category-tab">
    <v-card>
      <v-tabs
        show-arrows
        v-model="tab"
        color="deep-purple-accent-4"
        align-tabs="center"
        active-class="purple--text"
      >
        <v-tab v-for="i in 6" :key="i" :value="i">Options {{ i }}</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item
          v-for="n in 6"
          :key="n"
          :value="n"
        >
        <topic-list />
        </v-window-item>
      </v-window>
    </v-card>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { defineComponent } from 'vue'
import TopicList from '@/components/topic-list/index'

export default defineComponent({
  components: {
    TopicList
  },
  setup () {
    const tab = ref(1)

    return {
      tab
    }
  }
})
</script>

<style lang="scss">
.category-tab {
  display: flex;
  justify-content: center;
}
.v-tabs {
  // left: 50%;
  width: 700;
}
</style>

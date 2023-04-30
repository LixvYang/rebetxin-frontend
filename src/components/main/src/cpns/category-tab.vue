<template>
  <div class="category-tab">
  <v-card>
    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs="center"
      active-class="purple--text"
      density="default"
    >
      <v-tab v-for="i in 6" :key="i" :value="i">Options {{ i }}</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <v-window-item
        v-for="n in 6"
        :key="n"
        :value="n"
      >
        <v-container fluid>
          hello {{ n }}
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const tab = ref(1)

    return {
      tab
    }
  }
})
</script>

<style scoped>
</style>

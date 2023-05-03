<template>
  <div class="footer">
    <v-layout v-if="isMobile" class="overflow-visible" style="height: 56px;">
      <v-bottom-navigation
        :elevation="0"
        v-model="value"
        color="teal"
        grow
      >
        <v-btn>
          <v-icon>mdi-history</v-icon>

          Recents
        </v-btn>

        <v-btn>
          <v-icon>mdi-heart</v-icon>

          Favorites
        </v-btn>

        <v-btn>
          <v-icon>mdi-map-marker</v-icon>

          Nearby
        </v-btn>
      </v-bottom-navigation>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { defineComponent } from 'vue'
import store from '@/store';
import { computed } from 'vue';

export default defineComponent({
  setup () {
    const value = ref(1)
    const isMobile = computed(() => store.state.main.isMobile)

    return {
      isMobile,
      value
    }
  }
})
</script>

<style scoped>

</style>

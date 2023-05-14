<template>
  <div class="category-tab">
    <v-card>
      <v-tabs
        show-arrows
        v-model="tab"
        color="teal"
        align-tabs="center"
        active-class="purple--text"
      >
        <v-tab :value="tab.value" v-for="tab in tabs" :key="tab.value">{{ tab.value }}</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <v-window-item
          :value="tab.value" v-for="tab in tabs" :key="tab.value"
        >
         <component :is="tab.value"></component>
        </v-window-item>
      </v-window>
    </v-card>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { defineComponent } from 'vue'
import {tabs} from './tab-config'
import Crypto from '@/layouts/topic-category/Crypto';
import Business from '@/layouts/topic-category/Buisiness';
import New from '@/layouts/topic-category/New';
import Politics from '@/layouts/topic-category/Politics';
import Sports from '@/layouts/topic-category/Sports';
import Trending from '@/layouts/topic-category/Trending';

export default defineComponent({
  components: {
    Crypto,
    Business,
    New,
    Politics,
    Sports,
    Trending
  },
  setup () {
    const tab = ref(1)

    return {
      tab,
      tabs
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

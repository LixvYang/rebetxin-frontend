<template>
  <div class="topic">
    <v-container>
      <v-card
        class="mx-auto"
        max-width="434"
      >
        <v-card-text class="pt-4">
          <v-avatar
            color="teal"
            size="5rem"
            :image="avatarUrl"
          >
          </v-avatar>
          <span style="position: absolute; top: 2rem; left: 7rem; font-size: larger;"> {{ name }}</span>
          <span style="position: absolute; top: 3.5rem; left: 7rem; font-size: small;"> {{ intro }}</span>
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
        <v-card>
          <v-tabs
            grow
            show-arrows
            v-model="tab"
            color="teal"
            align-tabs="center"
            active-class="purple--text"
          >
            <v-tab :value="tab.value" v-for="tab in tabs" :key="tab.value">{{ tab.value }}</v-tab>
          </v-tabs>
          <v-divider></v-divider>

          <v-window v-model="tab">
            <v-window-item
            :value="tab.value" v-for="tab in tabs" :key="tab.value"
            >
            <component :is="tab.value"></component>
            </v-window-item>
          </v-window>
        </v-card>
      </v-container>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { defineComponent } from 'vue'
import Collect from './cpns/collect.vue'
import Purchase from './cpns/purchase.vue'
import { useStore } from '@/store'
import { computed } from 'vue'
import  { tabs } from './cpns/tab-config'

export default defineComponent({
  components: {
    Collect,
    Purchase
  },
  setup () {
    const tab = ref(1)
    const store = useStore()
    const name = computed(() => store.state.user.userInfo.full_name)
    const intro = computed(() => store.state.user.userInfo.biography)
    const avatarUrl = computed(() => store.state.user.userInfo.avatar_url)

    return {
      name,
      intro,
      avatarUrl,
      tab,
      tabs
    }
  }
})
</script>

<style scoped>
.topic {
  padding-top: 50px;
}

</style>

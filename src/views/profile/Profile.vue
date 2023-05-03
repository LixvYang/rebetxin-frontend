<template>
  <div class="topic">
    <v-container>
      <v-card
        class="mx-auto"
        max-width="434"
      >
        <v-card-text class="pt-4">
          <v-avatar
            color="grey"
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
          color="deep-purple-accent-4"
          align-tabs="center"
          active-class="purple--text"
        >
          <v-tab v-for="i in 2" :key="i" :value="i">Options {{ i }}</v-tab>
        </v-tabs>
        <v-divider></v-divider>

        <v-window v-model="tab">
          <v-window-item
            v-for="n in 2"
            :key="n"
            :value="n"
          >
          <topic-list />
          </v-window-item>
        </v-window>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { defineComponent } from 'vue'
import TopicList from '@/components/topic-list'

export default defineComponent({
  components: {
    TopicList
  },
  setup () {
    const name = '张三'
    const intro = '我是一名前端工程师，擅长 Vue.js 和 React.js。'
    const avatarUrl = 'https://cdn.vuetifyjs.com/images/profiles/marcus.jpg'
    const tab = ref(1)

    return {
      name,
      intro,
      avatarUrl,
      tab
    }
  }
})
</script>

<style scoped>
.topic {
  padding-top: 50px;
}

</style>

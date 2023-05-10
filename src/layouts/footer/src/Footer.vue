<template>
  <div class="footer">
    <v-layout v-if="isMobile" class="overflow-visible">
      <v-bottom-navigation
        :elevation="0"
        v-model="value"
        color="teal"
        grow
      >
        <v-btn @click="handleHomeClick">
          <v-icon size="x-large"
          >mdi mdi-home</v-icon>
        </v-btn>

        <v-btn @click="handleBoarderClick">
          <v-icon size="x-large">mdi mdi-chevron-triple-up</v-icon>
        </v-btn>

        <v-btn  @click="handleProfileClick">
          <v-icon size="x-large">mdi mdi-account-outline</v-icon>
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
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  setup () {
    const value = ref(0)
    const router = useRouter()
    const route = useRoute()
    const isMobile = computed(() => store.state.main.isMobile)
    if (route.path === '/main/home') {
      value.value = 0
    } else if (route.path === '/main/boarder') {
      value.value = 1
    } else {
      value.value = 2
    }

    const handleHomeClick = () => {
      router.push('/main/home')
    }
    const handleBoarderClick = () => {
      router.push('/main/board')
    }
    const handleProfileClick = () => {
      router.push('/main/profile')
    }

    return {
      isMobile,
      value,
      handleHomeClick,
      handleBoarderClick,
      handleProfileClick
    }
  }
})
</script>

<style scoped>

</style>

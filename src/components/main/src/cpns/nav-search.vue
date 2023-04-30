<template>
  <div class="nav-search">
    <v-card
    class="mx-auto"
    color="grey-lighten-3"
    max-width="500"
  >
    <v-card-text>
      <v-text-field
        :loading="loading"
        density="compact"
        variant="solo"
        label="Search templates"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="onClick"
      ></v-text-field>
    </v-card-text>
  </v-card>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const loading = ref(false)
    const loaded = ref(false)

    const onClick = () => {
        loading.value = true

        setTimeout(() => {
          loading.value = false
          loaded.value = true
        }, 2000)
      }

    return {
      onClick,
      loading
    }
  }
})
</script>

<style scoped>

</style>

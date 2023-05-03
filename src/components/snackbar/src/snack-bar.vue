<template>
  <div class="snack-bar">
      <v-snackbar
      v-model="snackbarData.show"
      :timeout="snackbarData.timeout"
      color="light-green"
      contained
      location="top"
      rounded
      transition="scroll-x-reverse-transition"
      >
      {{ snackbarData.text }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue';

export default defineComponent({
  props: {
    snackbar: {
      type: Boolean,
      require: true
    },
    timeout: {
      type: Number,
      require: true
    },
    text: {
      type: String,
      require: true
    }
  },
  setup(props) {
    const snackbarData = reactive({
      show: props.snackbar,
      timeout: props.timeout,
      text: props.text,
    });

    // 监听 props.snackbar 的变化，以便在变化时显示或隐藏 Snackbar
    watch(() => props.snackbar, (newValue) => {
      snackbarData.show = newValue;
    });

    return {
      snackbarData,
    };
  },
});
</script>

<style scoped>

</style>

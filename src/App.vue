<template>
  <van-config-provider :theme-vars="themeVars">
    <router-view />
  </van-config-provider>
</template>

<script>
import { ref, reactive } from 'vue';

export default {
  setup() {
    // themeVars 内的值会被转换成对应 CSS 变量
    // 比如 sliderBarHeight 会转换成 `--van-slider-bar-height`
    const themeVars = reactive({
      rateIconFullColor: '#07c160',
      sliderBarHeight: '4px',
      sliderButtonWidth: '20px',
      sliderButtonHeight: '20px',
      sliderActiveBackground: '#07c160',
      buttonPrimaryBackground: '#07c160',
      buttonPrimaryBorderColor: '#07c160',
      gridItemTextFontSize: '18px',
      gridItemContentPadding: '0px'
    });

    return {
      themeVars,
    };
  },
};
</script>

<template>
  <van-config-provider :theme-vars="themeVars">
    <router-view />
  </van-config-provider>
</template>

<script>
import { ref, reactive } from 'vue';
import { usePassport } from "@foxone/mixin-passport/lib/helper";
import cache from '@/plugins/cache';

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
    })

    const passport = usePassport();
    const auth = cache.getCache('auth')
    if (auth) {
      const authObject = JSON.parse(auth)
      passport.sync({
        token: authObject.token,
        channel: authObject.channel
      })
    }

    return {
      themeVars,
    };
  },
};
</script>

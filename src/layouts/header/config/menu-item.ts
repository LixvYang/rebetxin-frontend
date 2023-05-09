import cache from "@/plugins/cache";
import { Ref } from "vue";

export const handleProfileClick = (snackbar: Ref<boolean>) => {
  snackbar.value = true
  setTimeout(() => {
    snackbar.value = false
  }, 2000);
}

export const handleSettingsClick = (snackbar: Ref<boolean>) => {
  handleProfileClick(snackbar)
}


export const handleLanguageClick = (snackbar: Ref<boolean>) => {
  handleProfileClick(snackbar)
}

export const handleDiscontent = (snackbar: Ref<boolean>) => {
  cache.deleteCache("_betxin_token")
  setTimeout(() => {
    snackbar.value = false
  }, 2000);
}

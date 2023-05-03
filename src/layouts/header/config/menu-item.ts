import { Ref } from "vue";

export const handleProfileClick = (snackbar: Ref<boolean>) => {
  snackbar.value = true
  setTimeout(() => {
    snackbar.value = false
  }, 2000);
  console.log('handleProfileClick')
}

export const handleSettingsClick = (snackbar: Ref<boolean>) => {
  handleProfileClick(snackbar)
}


export const handleLanguageClick = (snackbar: Ref<boolean>) => {
  handleProfileClick(snackbar)
}

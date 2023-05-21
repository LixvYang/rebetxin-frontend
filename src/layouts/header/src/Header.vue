<template>
  <div class="header">
    <v-layout v-if="isMobile" full-height>
      <v-app-bar app :elevation="0" density="compact" flat>
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click="isMenuOpen = !isMenuOpen">
          </v-app-bar-nav-icon>
        </template>
        <v-toolbar-title class="text-gray-800">Betxin</v-toolbar-title>
      </v-app-bar>

      <v-navigation-drawer
        v-model="isMenuOpen"
        app
        location="top"
        right="false"
        class="menu-drawer"
        v-if="isMobile"
      >
        <v-list>
          <v-list-item v-for="item in menuItems" :key="item.title" @click="item.handle" :prepend-icon="item.icon">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>

    <v-toolbar v-if="!isMobile" color="deep-purple-accent-3" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Betxin</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-toolbar>
  </div>

  <snack-bar :snackbar="snackbar" :timeout="2000" :text="snackBarText" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref, computed } from 'vue';
import { usePassport } from "@foxone/mixin-passport/lib/helper";
import { handleDiscontent, handleProfileClick } from '../config/menu-item'
import { useStore } from '@/store'
import SnackBar from '@/components/snackbar/src/snack-bar.vue';
import { showToast } from 'vant';
import cache from '@/plugins/cache';

export default defineComponent({
  components: {
    SnackBar
  },
  setup() {
    const passport = usePassport();
    const isMenuOpen = ref(false)
    const isMobile = computed(() => store.state.main.isMobile)
    const snackbar = ref(false)
    const snackBarText = ref('更多功能正在开发中')
    const isMvm = ref(false)
    const signMsg = ref('')
    const store = useStore()
    const user = computed(() => store.state.user.userInfo)

    const handleConnectClick = async () => {
      if (user.value.uid) {
        showToast('您已经登陆')
        return
      }
      `
      eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJhaWQiOiI4ZjdkM2UwNS03MGQwLTRiNWMtYTg5Yi0wZmVkYmNiODZmYzUiLCJleHAiOjE3MTYxMDgyNTIsImlhdCI6MTY4NDU3MjI1MiwiaXNzIjoiMzBhYWQ1YTUtZTVmMy00ODI0LTk0MDktYzJmZjQxNTI3MjRlIiwic2NwIjoiUFJPRklMRTpSRUFEIEFTU0VUUzpSRUFEIn0.VvSZ_iMKMcA_gkSnRMfsdE1USZfJAXbx-5I4A0cpkKWAbX1Mb_sEoztWeyD8IdtMiQFJhAiFBHk6SmIOuoQmSgJGxOc6YfVKdkLX9iwhX1RP6XgDQ-bz5VyThfYw9qXJlMhUcldXzXZ2Ic0G47WcrB7-suExpSh8eJ7S1qz9H0M
      `

      const { token, channel, mixin_token } = await passport.auth({
        origin: "Betxin",
        authMethods: ["metamask", "walletconnect", "mixin", "fennec", "onekey"],
        clientId: "30aad5a5-e5f3-4824-9409-c2ff4152724e",
        scope: "PROFILE:READ ASSETS:READ",
        pkce: true,
        signMessage: true,
        hooks: {
        beforeSignMessage: async () => {
          // sign a message
          return {
              statement: "You'll login to your_app by the signature",
              expirationTime: new Date(
                new Date().getTime() + 1000 * 60 * 100
              ).toISOString(),
            };
          },
          onDistributeToken: async (params: any) =>  {
            if (params.type === 'mixin_token')  {
              return { token: params.token, mixin_token: params.token };
            }else if (params.type === 'signed_message'){
              isMvm.value = true
              signMsg.value = params.message
              return { token: params.signature, mixin_token: params.signature };
            }
            return { token: params.mixin_code, mixin_token: params.code };
          },
          afterDisconnect() {
            console.log("Disconnect")
          },
        }
      })
      if (!isMvm.value) {
        cache.setCache('login_method', 'mixin_token')
        store.dispatch('user/handleUserLogin', {
          'login_method': 'mixin_token',
          'token': token
        })
      } else {
        cache.setCache('login_method', 'mvm')
        store.dispatch('user/handleUserLogin', {
          'login_method': 'mvm',
          'sign': token,
          'sign_msg': signMsg
        })
      }
      cache.setCache('token', token)
      setTimeout(() => {
        if (store.state.user.userInfo.uid) {
          isMenuOpen.value = false
          snackBarText.value = 'Success Connect'
          handleProfileClick(snackbar)
        }
      }, 3000);
    }

    const profileClick = () => {
      snackBarText.value = '更多功能正在开发中'
      handleProfileClick(snackbar)
    }

    const discontentClick = async () => {
      if (!user.value.uid) {
        showToast('请先登陆')
        return
      }
      handleDiscontent(snackbar)
    }

    const menuItems = [
      { title: 'Login', handle: handleConnectClick, icon: 'mdi-login'},
      { title: 'Settings', handle: profileClick },
      { title: 'Language', handle: profileClick },
      { title: 'Disconnect', handle: discontentClick },
    ];


    return {
      snackbar,
      passport,
      isMenuOpen,
      isMobile,
      menuItems,
      snackBarText,
    }
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  position: relative;
}

.notify {
  display: flex;
  right: 20%;
}
</style>

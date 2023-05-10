<template>
  <div class="header">
    <v-layout v-if="isMobile" full-height>
      <v-app-bar app :elevation="0" density="compact" flat>
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click="isMenuOpen = !isMenuOpen">
          </v-app-bar-nav-icon>
        </template>
        <v-toolbar-title class="text-gray-800">Betxin</v-toolbar-title>
        <v-btn
          class="notify"
          icon="mdi mdi-bell"
          color="teal"
        ></v-btn>
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
          <v-list-item v-for="item in menuItems" :key="item.title" :to="item.to" @click="item.handle" :prepend-icon="item.icon">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item  >
            <v-icon>mdi-login</v-icon>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>


    <!-- <div v-if="!isMobile">
        <v-btn-toggle
          rounded="0"
          color="deep-purple-accent-3"
          group
        >
          <v-btn value="left">
            Left
          </v-btn>

          <v-btn value="center">
            Center
          </v-btn>

          <v-btn value="right">
            Right
          </v-btn>

          <v-btn value="justify">
            Justify
          </v-btn>
        </v-btn-toggle>
    </div> -->
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

    const handleConnectClick = async () => {
      const { token, channel, mixin_token } = await passport.auth({
        origin: "FoxONE UIKit",
        authMethods: ["metamask", "walletconnect", "mixin", "fennec", "onekey"],
        clientId: "fbd26bc6-3d04-4964-a7fe-a540432b16e2",
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
        store.dispatch('user/handleUserLogin', {
          'login_method': 'mixin_token',
          'token': token
        })
      } else {
        store.dispatch('user/handleUserLogin', {
          'login_method': 'mvm',
          'sign': token,
          'sign_msg': signMsg
        })
      }
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

    const discontentClick = () => {
      snackBarText.value = 'Discontent Success'
      handleDiscontent(snackbar)
    }

    const menuItems = [
      { title: 'Login', handle: handleConnectClick, icon: 'mdi-domain' },
      { title: 'Profile', icon: 'mdi-domain', to: '/main/profile'   },
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

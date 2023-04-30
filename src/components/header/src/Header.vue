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
          color="purple-darken-2"
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
          <v-list-item to="/login">
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ref, computed } from 'vue';
import store from '@/store'

export default defineComponent({
  setup() {
    const isMenuOpen = ref(false)
    const isMobile = computed(() => store.state.main.isMobile)
    const handleProfileClick = () => {
      console.log('handleProfileClick')
    }

    const menuItems = [
      { title: 'Profile', handle: handleProfileClick, icon: 'mdi-domain' },
      { title: 'Setting', to: '/features' },
      { title: 'Language', to: '/marketplace' },
      { title: 'Disconnect' },
    ];


    // setInterval(() => {
    //   console.log(isMobile.value)
    // },1000)

    return {
      isMenuOpen,
      isMobile,
      menuItems,
      handleProfileClick
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

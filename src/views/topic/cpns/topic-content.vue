<template>
  <div class="topic-item">
    <v-card
      class="mx-auto"
      max-width="700"
    >
      <v-img
        height="200"
        src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
        cover
        class="text-white"
      >
        <v-toolbar
          color="rgba(0, 0, 0, 0)"
          theme="dark"
        >

        <v-btn icon rounded>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
          <template v-slot:append>
            <v-btn rounded icon="mdi-dots-vertical"></v-btn>
          </template>

          <v-btn icon rounded>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

        </v-toolbar>
        <v-card-title class="text-left align-end" style="position: absolute; bottom: 0;">
          Your Title
        </v-card-title>

        <v-card-title class="text-left align-end" style="position: absolute; bottom: 0; right: 0%;">
          Amount
        </v-card-title>
      </v-img>

      <v-progress-linear
        model-value="40"
        color="#5ddb92"
        bg-opacity="0.65"
        height="20"
        :bg-color="negativeColor"
        rounded
        rounded-bar
        >
        <strong>{{ Math.ceil(20) }}%</strong>
      </v-progress-linear>

      <div style="display: flex; justify-content: space-between;">
        <v-card-subtitle class="pt-4">
          Yes Price
        </v-card-subtitle>
        <v-card-subtitle class="pt-4">
          No Price
        </v-card-subtitle>
      </div>

      <v-divider></v-divider>

      <div style="display: flex; justify-content: space-between;">
        <v-card-subtitle class="pt-4">
          Intro
        </v-card-subtitle>
        <v-card-subtitle class="pt-4">
          Created Time
        </v-card-subtitle>
      </div>


      <v-card-text>
        <div>This is a Content</div>
      </v-card-text>

      <div style="display: flex; justify-content:space-around;">
        <v-card-actions>
          <v-btn color="light-blue">
            Bet
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn color="light-green">
            Refund
          </v-btn>
        </v-card-actions>
      </div>

      <div style="display: flex; justify-content:space-between;">
        <v-card-subtitle class="pt-4">
          Topic End Time
        </v-card-subtitle>
        <v-card-subtitle class="pt-4">
          Refund End Time
        </v-card-subtitle>
      </div>
    </v-card>

    <div>
      <div id="talkee-comments"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  mounted() {
    window.Talkee.show({
      apiBase: 'https://talkee-api.pando.im/api',
      slug: window.location.pathname,
      siteId: '2',
      locale: "en",
      // show the link to the arweave transaction page if possible
      showLink: true,
      container: '#talkee-comments',
      auth: {
        authMethods: ['metamask', 'walletconnect', 'mixin', 'fennec'],
      },
    })
  },
  setup () {
    const positiveValue = 60
    const negativeColor = 'red'

    // function installTalkee() {
    //   const talkeeOpts = {
    //     apiBase: "https://talkee-api.pando.im/api",
    //     slug: window.location.pathname,
    //     // show the link to the arweave transaction page if possible
    //     showLink: true,
    //     // the site id, required
    //     siteId: "2",
    //     // the container selector to render the talkee
    //     container: "#talkee-comments",
    //     // default locale is en
    //     locale: "en",
    //     // add supported auth methods
    //     auth: {
    //       authMethods: ["metamask", "walletconnect", "mixin", "fennec"],
    //     }
    //   };

    //   const _checkTalkee = () => {
    //     return window.Talkee && window.Talkee.install && window.Vue;
    //   }
    //   setTimeout(() => {
    //     if (_checkTalkee()) {
    //       if (document.getElementById("comments")) {
    //         window.Talkee.show(talkeeOpts);
    //       }
    //     } else {
    //       // try again
    //       installTalkee();
    //     }
    //   }, 1000);
    // }
    // installTalkee();



    return {
      positiveValue,
      negativeColor
    }
  }
})
</script>

<style scoped>

#talkee-comments {
  margin: auto;
  max-width: 700px;
  border-radius: 10%;
}
</style>

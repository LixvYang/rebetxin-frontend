<template>
  <v-btn @click="login">Auth</v-btn>
</template>


<script lang="ts">
  import { usePassport } from "@foxone/mixin-passport/lib/helper";
  import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    const passport = usePassport();

    const login = async () => {
    const { token, channel } = await passport.auth({
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
          console.log(params)
          // if (params.type === 'mixin_token')  {
          //   console.log(params)
          //   return { token: 'mixin_token', mixin_token: params.token };
          // }else if (params.type === 'signed_message'){
          //   return { token: params.signature, mixin_token: params.signature };
          // }
          // mock
          //
          const accessToken = "123456"

          return { token: accessToken, mixin_token: '123456789' };
        },
        afterDisconnect() {
            console.log("ni")
        },
      }
    });

    console.log(token, channel)
    // 123456, metamusk
    }

    return {
      login
    }
  }
})

</script>


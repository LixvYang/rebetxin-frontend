<template>
  <button @click="login">Auth</button>
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
      authMethods: ["metamask", "walletconnect", "mixin", "fennec"],
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
              new Date().getTime() + 1000 * 60 * 3
            ).toISOString(),
          };
        },
        onDistributeToken: (params: any) => {
          if (params.type === 'mixin_token') return Promise.resolve({ token: 'mixin_token', mixin_token: params.token });
          else if (params.type === 'signed_message') return Promise.resolve({ token: params.signature, mixin_token: params.message });
          return Promise.resolve({ token: 'mixin_code', mixin_token: params.code });
        },
        afterDisconnect()  {
          // sign a message
        return {
            statement: "You are disconnect!",
            expirationTime: new Date(
              new Date().getTime() + 1000 * 60 * 3
            ).toISOString(),
          };
        }
      }
    });

    console.log(token, channel)
    }

    return {
      login
    }
  }
})

</script>


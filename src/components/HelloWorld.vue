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
              return { token: params.signature, mixin_token: params.signature };
            }
            return { token: params.mixin_code, mixin_token: params.code };
          },
          afterDisconnect() {
            console.log("ni")
          },
        }
      });
      console.log(token, channel, mixin_token)


      // const authData = await passport.sync({
      //   channel: channel,
      //   token: token,
      //   mixin_token: mixin_token,
      // });


      setTimeout(async () => {
        //transfer
       const res = await passport.payment({
          // PaymentOption
            assetId: "965e5c6e-434c-3fa9-b780-c50f43cd955c", //CNB
            amount: "1",
            recipient: "fbd26bc6-3d04-4964-a7fe-a540432b16e2",
            traceId: "fbd26bc6-434c-3fa9-b780-c50f43cd9551",
            memo: "Test",
            checker: async () => {
              return new Promise((reslove) => {
                setTimeout(function () {
                  reslove(true);
                }, 10000);
              });
            },
        });

        console.log(res)
      }, 3000);


      // passport.getAssets().then((assets) => {
      //   console.log(assets);
      // });

    }


    return {
      login
    }
  }
})

</script>


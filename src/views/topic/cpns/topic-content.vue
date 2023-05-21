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

          <v-btn rounded icon="mdi mdi-keyboard-return" @click="HandleReturnClick"></v-btn>

          <v-spacer></v-spacer>
          <v-btn rounded :color="isCollect"  icon="mdi mdi-star" @click="handleCollctClick(topic.is_collect!, topic.tid!)"></v-btn>
            <template v-slot:append>
            <v-btn rounded icon="mdi mdi-share-variant-outline" @click="handleShareClick(topic.tid!, topic.intro!, topic.img_url!, topic.title!)"></v-btn>
          </template>
        </v-toolbar>
        <v-card-title class="text-left align-end" style="position: absolute; bottom: 0;">
          {{topic.title}}
        </v-card-title>

        <v-card-title class="text-left align-end" style="position: absolute; bottom: 0; right: 0%;">
          {{ formattedTotalPrice(topic.total_price) }}
        </v-card-title>
      </v-img>

      <v-progress-linear
        :model-value="topic.yes_ratio"
        color="#5ddb92"
        bg-opacity="0.65"
        height="20"
        bg-color="red"
        rounded
        rounded-bar
        >
        <strong>{{ Math.ceil(parseInt(topic.yes_ratio!) > parseInt(topic.no_ratio!) ? parseInt(topic.yes_ratio!) : parseInt(topic.no_ratio!)) }}%</strong>
      </v-progress-linear>

      <div style="display: flex; justify-content: space-between;">
        <v-card-subtitle class="pt-4">
          Yes Price {{ formattedTotalPrice(topic.yes_price!) }}
        </v-card-subtitle>
        <v-card-subtitle class="pt-4">
          No Price {{ formattedTotalPrice(topic.no_price!) }}
        </v-card-subtitle>
      </div>

      <v-divider></v-divider>

      <div style="display: flex; justify-content: space-between;">
        <v-card-subtitle class="pt-4">
          {{ topic.intro! }}
        </v-card-subtitle>
        <v-card-subtitle class="pt-4">
          Created {{ formatedCreatedTime(topic.created_at!) }}
        </v-card-subtitle>
      </div>
      <v-card-text>
        <div>{{ topic.content! }}</div>
      </v-card-text>

      <div style="display: flex; justify-content:space-around;">
        <v-card-actions>
          <v-btn color="light-blue" variant="outlined" @click="HandleBetBtnClick">
            下注
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn color="light-green" variant="outlined" :disabled="JSON.stringify(purchase) === '{}' || (purchase.yes_price === '0' && purchase.no_price === '0')" @click="refundDialog = true">
            退款
          </v-btn>
        </v-card-actions>
      </div>

      <div style="display: flex; justify-content:space-around;">
        <v-card-actions>
        购买数额  Yes {{ purchase.yes_price ?? '0' }}
        </v-card-actions>
        <v-card-actions>
          No {{ purchase.no_price ?? '0' }}
        </v-card-actions>
      </div>

      <div>
        <v-card-subtitle class="pt-4">
          话题终止 {{ formatedCreatedTime(topic.end_time!) }}
        </v-card-subtitle>
        <v-card-subtitle class="pt-4">
          退款终止 {{ formatedCreatedTime(topic.refund_end_time!) }}
        </v-card-subtitle>
      </div>
    </v-card>

    <van-dialog closeOnClickOverlay v-model:show="betDialog" title="下注"  width="40rem" class="bet-dialog" :showConfirmButton="false">
      <van-radio-group v-model="BetSelect" direction="horizontal" class="bet-radio-group" checked-color="#009688">
        <van-radio name="0">Yes</van-radio>
        <van-radio name="1">No</van-radio>
      </van-radio-group>

      <v-responsive
        class="mx-auto"
        max-width="344"
      >
        <v-text-field
          :rules="[positiveNumber]"
          v-model="BetAmount"
          label="CNB Amount"
          type="input"
          clearable
          hint="Enter input your amount"
        ></v-text-field>
      </v-responsive>

      <van-grid :column-num="3" :gutter="10" direction="horizontal"  icon-size="20px">
        <van-grid-item icon-color="teal" :icon="item.isSelect ? 'success': ''" :text="item.amount" v-for="item in BtnAmountGroup" :key="item.amount" @click="HandleAmountItemClick(item)" />
      </van-grid>

      <van-divider></van-divider>

      <van-button :loading="payBtnLoading" @click="HandlePayClick" plain hairline type="primary" size="large" icon="https://mixin-images.zeromesh.net/0sQY63dDMkWTURkJVjowWY6Le4ICjAFuu3ANVyZA4uI3UdkbuOT5fjJUT82ArNYmZvVcxDXyNjxoOv0TAYbQTNKS=s128">
        支付
      </van-button>
    </van-dialog>

    <van-dialog closeOnClickOverlay v-model:show="refundDialog" title="退款"  width="40rem" class="bet-dialog" :showConfirmButton="false">
      <van-radio-group v-model="BetSelect" direction="horizontal" class="bet-radio-group" checked-color="#009688">
        <van-radio name="0">Yes</van-radio>
        <van-radio name="1">No</van-radio>
      </van-radio-group>

      <v-responsive
        class="mx-auto"
        max-width="344"
      >
        <v-text-field
          :rules="[positiveRefundNumber]"
          v-model="refundAmount"
          label="CNB Amount"
          type="input"
          clearable
          hint="Enter input your amount"
        ></v-text-field>

        <div style="display: flex; justify-content: space-between;">
          <v-btn variant="text">
            退款最大金额 {{ maxRefundAmount.value }}
          </v-btn>
          <v-btn variant="text">
            费用 {{feeAmount.value}}
          </v-btn>
        </div>
      </v-responsive>
      <van-button @click="handleRefundBtnClick" plain hairline type="primary" size="large" icon="https://mixin-images.zeromesh.net/0sQY63dDMkWTURkJVjowWY6Le4ICjAFuu3ANVyZA4uI3UdkbuOT5fjJUT82ArNYmZvVcxDXyNjxoOv0TAYbQTNKS=s128">
        退款
      </van-button>
    </van-dialog>

    <div>
      <div id="talkee-comments"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { formatedCreatedTime, formattedTotalPrice, handleShareClick } from '../../../components/topic-list/src/config/config'
import { useStore } from '@/store'
import { computed } from 'vue'
import { ref } from 'vue'
import { BtnAmountGroup, positiveNumber } from '../config/config'
import { showToast } from 'vant'
import { usePassport } from "@foxone/mixin-passport/lib/helper";
import { MixinConfig } from '@/service/request/config'
import { v4 as uuidv4 } from 'uuid';
import { createSnapshot, getSnapshot } from '@/service/snapshot/snapshot'
import { createCollect, deleteCollect } from '@/service/collect/collect'
import { POLLING_INTERVAL } from '@/service/request/config'
import { createRefund } from '@/service/refund/refund'

export default defineComponent({
  mounted() {
    window.Talkee.show({
      apiBase: 'https://talkee-api.pando.im/api',
      slug: window.location.pathname,
      siteId: '36',
      locale: "en",
      showLink: true,
      container: '#talkee-comments',
      auth: {
        authMethods: ['metamask', 'walletconnect', 'mixin', 'fennec'],
      },
    })
  },
  setup(props, { emit }) {
    const passport = usePassport();
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const topic = computed(() => store.state.main.TopicContent)
    const purchase = computed(() => store.state.purchase.purchaseInfo)
    const betDialog = ref(false)
    const BetSelect = ref('0')
    const BetAmount = ref(0)
    const payBtnLoading = ref(false)
    const isCollect = computed(() => topic.value.is_collect === 1 ? 'yellow' : '')
    const refundAmount = ref(0)
    let uuid = uuidv4()
    const refundDialog = ref(false)
    const refundBtnLoading = ref(false)
    const feeAmount = computed(() => {
      if (BetSelect.value === "0") {
        const price = parseFloat(purchase.value.yes_price!);
        return ref(price * 0.1);
      } else {
        const price = parseFloat(purchase.value.no_price!);
        return ref(price * 0.1);
      }
    })

    const maxRefundAmount = computed(() => {
      if (BetSelect.value === "0") {
        const price = parseFloat(purchase.value.yes_price!);
        return ref(price * 0.9);
      } else {
        const price = parseFloat(purchase.value.no_price!);
        return ref(price * 0.9);
      }
    });


    const params = route.path.split('/'); // 将URL按照'/'分割成数组
    const tid = params[3];
    store.dispatch('main/handleTopicContent', {tid: tid, uid: store.state.user.userInfo.uid})

    if (store.state.user.userInfo.uid) {
      store.dispatch('purchase/handleGetPurchase', {uid: store.state.user.userInfo.uid, tid: tid})
    }

    const positiveRefundNumber = (value: any) => {
      if (!BetSelect.value) {
        return 'Value is required';
      }
      const num = Number(refundAmount.value);
      if (isNaN(num) || num <= 0) {
        return 'Value must be a positive number';
      }

      if (refundAmount.value > maxRefundAmount.value.value) {
        return 'Value invaild';
      }
      return true;
    }

    const handleRefundBtnClick = async () => {
      if (positiveRefundNumber(refundAmount) !== true) {
        showToast('数额无效!')
        return
      }

      const res = await createRefund(topic.value.tid!, store.state.user.userInfo.uid!, Number(BetSelect.value))
      if (res.code !== 0) {
        showToast('退款失败')
        return
      }
      showToast('退款成功')
    }

    const HandleReturnClick = () => {
      router.back()
    }

    const HandleBetBtnClick = () => {
      if (!store.state.user.userInfo.uid) {
        showToast('请先登陆!')
        return
      }
      betDialog.value = true
    }

    const HandleAmountItemClick = (item: any) => {
      if (item.amount === BetAmount.value) {
        for (let i = 0; i < BtnAmountGroup.value.length; i++) {
          if (item.amount == BtnAmountGroup.value[i].amount) {
            BtnAmountGroup.value[i].isSelect = false
          }
        }
        BetAmount.value = 0
        return
      }

      BetAmount.value = item.amount

      for (let i = 0; i < BtnAmountGroup.value.length; i++) {
        if (item.amount == BtnAmountGroup.value[i].amount) {
          BtnAmountGroup.value[i].isSelect = true
        } else {
          BtnAmountGroup.value[i].isSelect = false
        }
      }
    }

    const handleCollctClick = async (is_collect?: number, tid?: string) => {
      if (is_collect == 0) {
        const res = await createCollect(tid!)
        if (res.code === 0) {
          showToast('收藏成功')
        }
      } else {
        const res = await deleteCollect(tid!)
        if (res.code === 0) {
          showToast('取消收藏')
        }
      }
      store.dispatch('main/handleTopicContent', {tid: tid, uid: store.state.user.userInfo.uid})
    }

    const HandlePayClick = async () => {
      if (positiveNumber(BetAmount.value) !== true) {
        showToast('数额无效!')
        return
      }

      if (BetSelect.value != '0' && BetSelect.value != '1') {
        showToast('选择错误!')
        return
      }

      const data = {
        tid: topic.value.tid,
        select: Number(BetSelect.value),
      }

      const res = await createSnapshot(topic.value.tid!, uuid, store.state.user.userInfo.uid!)
      if (res.code !== 0) {
        showToast('创建账单错误!')
        return
      }
      payBtnLoading.value = true

      let pollingInterval: any = null
      try {
        await passport.payment({
          recipient: MixinConfig.ClientId,
          amount: `${BetAmount.value}`,
          assetId: MixinConfig.DefaultAssetId,
          traceId: uuid,
          memo: btoa(JSON.stringify(data)),
          multisig: false,
          checker: () => {
            return new Promise((resolve) => {
              pollingInterval = setInterval(async ()=>{
                const res = await getSnapshot(uuid);
                  if (res.code === 0) {
                    showToast('Success Bet!');
                    payBtnLoading.value = false;
                    betDialog.value = false;
                    uuid = uuidv4();
                    clearInterval(pollingInterval); // 清除轮询定时器

                    resolve(true);
                  }
              }, POLLING_INTERVAL)
            });
          },
        })
      } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        payBtnLoading.value = false;
        clearTimeout(pollingInterval)
        showToast('取消支付')
      }
    }


    return {
      positiveNumber,
      positiveRefundNumber,
      maxRefundAmount,
      feeAmount,
      refundBtnLoading,
      refundAmount,
      purchase,
      payBtnLoading,
      betDialog,
      topic,
      BetAmount,
      BtnAmountGroup,
      BetSelect,
      isCollect,
      refundDialog,
      HandleBetBtnClick,
      HandleReturnClick,
      formatedCreatedTime,
      formattedTotalPrice,
      handleShareClick,
      HandleAmountItemClick,
      handleCollctClick,
      HandlePayClick,
      handleRefundBtnClick
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
.bet-radio-group {
  position: relative;
  left: 35%;
}
</style>

<template>
  <div class="payment">
    <div class="time_down payment_group" @click="startCountDown">
      请在
      <span class="red">{{ countDown }}</span>
      完成援助，否则系统自动取消揭榜
    </div>

    <van-cell-group class="payment_group">
      <van-cell title="揭榜单编号" :value="order.orderInfo.orderSn"/>
      <van-cell title="实援助金额">
        <span class="red">{{order.orderInfo.actualPrice *100 | yuan}}</span>
      </van-cell>
    </van-cell-group>

    <div class="pay_way_group">
      <div class="pay_way_title">选择收款方式</div>
      <van-radio-group v-model="payWay">
        <van-cell-group>
          <van-cell>
            <template slot="title">
              <img src="../../../assets/images/ali_pay.png" alt="支付宝" width="82" height="29">
            </template>
            <van-radio name="ali"/>
          </van-cell>
          <van-cell>
            <template slot="title">
              <img src="../../../assets/images/wx_pay.png" alt="微信支付" width="113" height="23">
            </template>
            <van-radio name="wx"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>

    <van-button class="pay_submit" @click="pay" type="primary" bottomAction>去援助</van-button>
  </div>
</template>

<script>
import { Radio, RadioGroup, Dialog } from 'vant';
import { orderDetail, orderPrepay, orderH5pay,ordersimulationpay } from '@/api/api';
import _ from 'lodash';
import { getLocalStorage, setLocalStorage } from '@/utils/local-storage';

export default {
  name: 'payment',

  data() {
    return {
      remainingTime: 0,
      countDown: '',
      lastTimestamp: null,

      payWay: 'wx',
      order: {
        orderInfo: {},
        orderGoods: []
      },
      orderId: 0
    };
  },

  mounted() {
    this.loadLastTimestamp()
    if (this.lastTimestamp) {
      this.remainingTime = this.lastTimestamp - Date.now()
      this.updateCountDown()
      setInterval(this.updateCountDown, 1000)
    }
    // Add the following code to trigger startCountDown on the first visit only
    const hasStarted = localStorage.getItem('hasStarted')
    if (!hasStarted) {
      this.startCountDown()
      localStorage.setItem('hasStarted', true)
    }
  },

  created() {
    if (_.has(this.$route.params, 'orderId')) {
      this.orderId = this.$route.params.orderId;
      this.getOrder(this.orderId);
    }
  },
  methods: {
    startCountDown() {
      if (!this.lastTimestamp) {
        this.lastTimestamp = Date.now() + 30 * 60 * 1000
        localStorage.setItem('lastTimestamp', this.lastTimestamp)
      }
      if (!this.remainingTime) {
        this.remainingTime = this.lastTimestamp - Date.now()
        setInterval(this.updateCountDown, 1000)
      }
    },
    updateCountDown() {
      const minutes = Math.floor(this.remainingTime / 60000)
      const seconds = Math.floor((this.remainingTime % 60000) / 1000)
      this.countDown = `${minutes}:${seconds.toString().padStart(2, '0')}`
      this.remainingTime -= 1000
      if (this.remainingTime <= 0) {
        this.remainingTime = 0
        localStorage.removeItem('lastTimestamp')
        clearInterval(this.updateCountDown)
      }
    },
    loadLastTimestamp() {
      const timestamp = localStorage.getItem('lastTimestamp')
      if (timestamp) {
        this.lastTimestamp = parseInt(timestamp)
      }
    },

    getOrder(orderId) {
      orderDetail({orderId: orderId}).then(res => {
        this.order = res.data.data;
      });
    },

    pay() {
      Dialog.alert({
        message: '你选择了' + (this.payWay === 'wx' ? '微信收款' : '支付宝收款')
      }).then(() => {
        this.$dialog
            .confirm({
              message: '确认援助后,请尽快前往援助!'
            })
            .then(() => {
              console.log(this.orderId);
              ordersimulationpay({orderId: this.orderId}).then(() => {
                this.$toast({
                  message: '请尽快前往援助',
                  type: 'success',
                  position: 'top'
                });
                this.$router.push('/user/order/list/3');
              });
            })
            .catch(() => {
            });
      });
    },

    noenpay() {

      Dialog.alert({
        message: '你选择了' + (this.payWay === 'wx' ? '微信收款' : '支付宝收款')
      }).then(() => {
        if (this.payWay === 'wx') {
          let ua = navigator.userAgent.toLowerCase();
          let isWeixin = ua.indexOf('micromessenger') != -1;
          if (isWeixin) {
            orderPrepay({ orderId: this.orderId })
              .then(res => {
                let data = res.data.data;
                let prepay_data = JSON.stringify({
                  appId: data.appId,
                  timeStamp: data.timeStamp,
                  nonceStr: data.nonceStr,
                  package: data.packageValue,
                  signType: 'MD5',
                  paySign: data.paySign
                });
                setLocalStorage({ prepay_data: prepay_data });

                if (typeof WeixinJSBridge == 'undefined') {
                  if (document.addEventListener) {
                    document.addEventListener(
                      'WeixinJSBridgeReady',
                      this.onBridgeReady,
                      false
                    );
                  } else if (document.attachEvent) {
                    document.attachEvent(
                      'WeixinJSBridgeReady',
                      this.onBridgeReady
                    );
                    document.attachEvent(
                      'onWeixinJSBridgeReady',
                      this.onBridgeReady
                    );
                  }
                } else {
                  this.onBridgeReady();
                }
              })
              .catch(err => {
                Dialog.alert({ message: err.data.errmsg });
                that.$router.replace({
                  name: 'paymentStatus',
                  params: {
                    status: 'failed'
                  }
                });
              });
          } else {
            orderH5pay({ orderId: this.orderId })
              .then(res => {
                let data = res.data.data;
                window.location.replace(
                  data.mwebUrl +
                  '&redirect_url=' +
                  encodeURIComponent(
                    window.location.origin +
                    '/#/?orderId=' +
                    this.orderId +
                    '&tip=yes'
                  )
                );
              })
              .catch(err => {
                Dialog.alert({ message: err.data.errmsg });
              });
          }
        } else {
          //todo : alipay
        }
      });
    },
    onBridgeReady() {
      let that = this;
      let data = getLocalStorage('prepay_data');
      // eslint-disable-next-line no-undef
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        JSON.parse(data.prepay_data),
        function(res) {
          if (res.err_msg == 'get_brand_wcpay_request:ok') {
            that.$router.replace({
              name: 'paymentStatus',
              params: {
                status: 'success'
              }
            });
          } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
            that.$router.replace({
              name: 'paymentStatus',
              params: {
                status: 'cancel'
              }
            });
          } else {
            that.$router.replace({
              name: 'paymentStatus',
              params: {
                status: 'failed'
              }
            });
          }
        }
      );
    }
  },

  components: {
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [Dialog.name]: Dialog
  }
};
</script>

<style lang="scss" scoped>
.payment_group {
  margin-bottom: 10px;
}

.time_down {
  background-color: #fffeec;
  padding: 10px 15px;
}

.pay_submit {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.pay_way_group img {
  vertical-align: middle;
}

.pay_way_title {
  padding: 15px;
  background-color: #fff;
}
</style>

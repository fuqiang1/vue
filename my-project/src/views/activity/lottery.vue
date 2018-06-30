<template>
  <div class="lottery padding-b-3">
    <div id="lottery">
      <div class="lottery-wrap">
        <div class="draw-lottery">
          <p class="text-center ft-1p3">
            <span v-if="token">今日可抽奖次数：<span class="draw-count">{{drawCount}}</span>次</span>
          </p>
          <!-- 抽奖转盘 1, "当日加息"" ; 2, "现金奖励 ; 3, "加息券 ; 4, "现金券" ; 5, "特权本金" ; 6, "谢谢"-->
          <div class="lottery-box" id="js-rect-luck-draw-con">
            <div class="lottery-item js-item selecting" data-sort="1" data-prize-id="1">
              <img src="../../images/lottery/one-day-rate.png" alt="">
              <span class="item-mask"></span>
            </div>
            <div class="lottery-item js-item selecting" data-sort="2" data-prize-id="2">
              <img src="../../images/lottery/cash.png" alt="">
              <span class="item-mask"></span>
            </div>
            <div class="lottery-item js-item selecting" data-sort="3" data-prize-id="3">
              <img src="../../images/lottery/rate-coupon.png" alt="">
              <span class="item-mask"></span>
            </div>
            <div class="lottery-item js-item selecting" data-sort="8" data-prize-id="5">
              <img src="../../images/lottery/privilege.png" alt="">
              <span class="item-mask"></span>
            </div>
            <div class="lottery-item js-start-btn" @click="getPrize">
              <img src="../../images/lottery/draw.png" alt="">
            </div>
            <div class="lottery-item js-item selecting" data-sort="4" data-prize-id="4">
              <img src="../../images/lottery/cash-coupon.png" alt="">
              <span class="item-mask"></span>
            </div>
            <div class="lottery-item js-item selecting" data-sort="7" data-prize-id="6">
              <img src="../../images/lottery/thanks.png" alt="">
              <span class="item-mask"></span>
            </div>
            <div class="lottery-item js-item selecting" data-sort="6" data-prize-id="1">
              <img src="../../images/lottery/one-day-rate.png" alt="">
              <span class="item-mask"></span>
            </div>
            <div class="lottery-item js-item selecting" data-sort="5" data-prize-id="5">
              <img src="../../images/lottery/privilege.png" alt="">
              <span class="item-mask"></span>
            </div>
          </div>
        </div>
      <div class="lottery-other">
          <p class="display-inb" @click="ruleBox()">活动规则</p>
          <p class="display-inb" @click="toLotteryRecord()">我的奖励</p>
        </div>
        <!-- 幸运用户 -->
        <div class="lucky-users">
          <img src="../../images/lottery/title-lucky-users.png" alt="" width="48%">
          <div class="lucky-users-wrap">
            <ul class="lucky-users-box margin-b-0">
              <li class="text-justify" v-for="item in luckyUsers" :key="item.index"><span>恭喜{{item.mobile}}</span>{{item.prizeName}}</li>
            </ul>
          </div>
          <p class="text-center state" v-show="isiOS">该活动与设备生产商Apple Inc.公司无关</p>
        </div>
      </div>
    </div>
    <!--中奖弹窗-->
    <div class="mask-common showDrawBox" v-show="showDrawBox">
      <div class="draw-box">
        <!-- 抽奖 获得奖励-->
        <div class="receive-draw" v-if="receiveDraw">
          <img src="../../images/lottery/receive-draw-01.png" alt="恭喜您获得奖励!" width="55%" v-show="prizeList.prizeType !== 6">
          <div class="getPrize">
            <p ng-show="prizeList.prizeType !== 6">{{prizeList.prizeValue}}</p>
            <p  ng-class="{'margin-t-0p8': prizeList.prizeType === 6}">{{prizeList.prizeText}}</p>
          </div>
          <div class="prize-effect">{{prizeList.prizeCont.split('，')[0]}} <br> {{prizeList.prizeCont.split('，')[1]}}</div>
          <!--<div class="prize-effect">{{prizeList.prizeCont}} <br> {{prizeList.prizeCont}}</div>-->
          <!-- 第一次抽奖 未分享 出现 ；第二次获得奖励 隐藏 -->
          <img src="../../images/lottery/share-friends.png" alt="分享好友，再抽一次" width="42%" v-show="canShare" @click="LotteryShareTo();">
        </div>
        <!-- 抽奖次数达上限，欢迎明日再来！ -->
        <div class="upper-limit" v-if="showUpperLimit">
          <img src="../../images/lottery/upper-limit-01.png" alt="抽奖次数达上限，欢迎明日再来！" width="65%" @click="LotteryShareTo()">
          <img src="../../images/lottery/upper-limit-02.png" alt="明日见" width="45%" class="margin-t-4">
        </div>
        <!-- 今日次数用完需分享 -->
        <div class="usedAndcanShare" v-if="usedAndcanShare">
          <img src="../../images/lottery/usedAndcanShare-01.png" alt="今日免费抽奖机会已使用！分享好友可再获一次免费抽奖机会" width="75%">
          <img src="../../images/lottery/usedAndcanShare-02.png" alt="分享好友，再抽一次" width="38%" class="margin-t-1" @click="LotteryShareTo();">
        </div>
        <img src="../../images/lottery/close-drawBox.png" alt="关闭中奖弹窗" width="8%" @click="closeDraw(showDrawBox);">
      </div>
    </div>
    <!--活动规则-->
    <div class="mask-common text-center" v-show="showRules">
      <div class="rule-box">
        <div class="rule-title">
          <img src="../../images/lottery/rule-title.png" width="50%">
          <img src="../../images/lottery/rule-title-portrait.png"  width="12%" class="hongcai-portrait">
        </div>
        <div class="rule-bg">
          <div class="rule-content">
            <p>1.每人每天拥有1次免费抽奖机会，首次分享幸运大抽奖到第三方平台，可再获得1次免费抽奖机会；</p>
            <p>2.您可在【我的奖励】中查看自己最近两周内的中奖情况；</p>
            <p>3.抽中的当日加息奖励系统将自动为您使用，次日即可获得奖励收益，加息仅针对您当日宏财精选及宏财尊贵项目在投总资产有效，包含当日新增投资，不含购买的债权转让项目及已经成功转让的资产；</p>
            <p>4.抽中的特权本金、返现、现金券及加息券奖励将直接发放至您的账户中，可在【我的】页面相应位置查看；</p>
            <p>5.所有奖励均可叠加获得；</p>
            <p>6.在法律规定范围内，平台保留本活动最终解释权；</p>
            <p>7.如有更多相关问题，可致电详询<br>
              客服电话：400-990-7626 <br>
              服务时间：工作日9:00-18:00
            </p>
          </div>
        </div>
      </div>
      <img src="../../images/lottery/close-drawBox.png" alt="关闭弹窗" width="8%" @click="ruleBox()">
    </div>
  </div>
</template>
<style lang="less">
  @import '../../styles/lottery.less';
</style>
<script>
  import {Utils, bridgeUtil, ModalHelper} from '../../service/Utils'
  import $ from 'zepto'
  import {LuckDraw} from '../../service/rect.luckdraw.js'
  export default {
    name: 'lottery',
    data () {
      return {
        drawCount: 0,
        prizeList: {},
        showRules: false,
        canShare: false,
        showDrawBox: false,
        showUpperLimit: false,
        usedAndcanShare: false,
        receiveDraw: false,
        shareCallHandCallback: null,
        luckyUsers: [],
        timer: null,
        isiOS: Utils.isIos(),
        isAndroid: Utils.isAndroid(),
        domain: process.env.domain
      }
    },
    props: ['token'],
    watch: {
      token: function (value) {
        if (value !== '') {
          this.getDrawCount(this.token)
        }
      },
      showDrawBox: function (val) {
        val ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      }
    },
    created: function () {
      this.getLuckyUsers()
      if (this.token) {
        this.getDrawCount(this.token)
      }
      var that = this
      this.shareRegisterCallback = function (data) {
        data = Utils.isAndroid() ? JSON.parse(data) : data
        if (data.isShareSuccess === 1) {
          that.$http.post('/hongcai/rest/lotteries/share', {
            token: that.token
          })
          .then(function (res) {
            if (res.data && res.data.ret !== -1) {
              that.drawCount = !res.data.isEffective ? that.drawCount : that.drawCount + 1
              that.showDrawBox = false
            }
          })
          .catch(function (err) {
            console.log(err)
          })
        }
      }
      bridgeUtil.webConnectNative('HCNative_NeedShare', 'HCWeb_ShareSuccess', {
        'HC_shareType': 2,
        'title': '今日运势，一试便知',
        'subTitle': '100%有礼！随机奖金、特权本金、返现加息券样样都有！好运从这里开始！',
        'url': that.domain + '/lottery',
        'imageUrl': 'https://mmbiz.qlogo.cn/mmbiz_jpg/8MZDOEkib8AlvibTmbDkqwbDiasl9BphCGgYnicBzl9VfX4Sm9cpvFiarGsV73IRYurUF9LPibzL0JLR5SGmd1TeO3ug/0?wx_fmt=jpeg'
      }, function (response) {}, that.shareRegisterCallback)
    },
    methods: {
      draw: function (prizeId) {
        var prizeList = {}
        var that = this
        LuckDraw.RectLuckDraw('#js-rect-luck-draw-con', prizeList, {
          turnAroundCount: 2,
          maxAnimateDelay: 400,
          turnStartCallback: function () {
          },
          turnEndCallback: function (prizeId, obj) {
            that.showDrawBox = true
            $('.lottery-item').addClass('selecting')
          },
          startBtnClick: function ($btn) {
            if (LuckDraw.isLocked()) {
              return
            }
            // prizeId ? LuckDraw.start(prizeId) : ''
          }
        })
      },
      toLotteryRecord: function () {
        if (!this.token || this.token === '') {
          bridgeUtil.webConnectNative('HCNative_Login', '', {}, function (response) {}, '')
          return
        }
        this.$router.push({name: 'LotteryRecord'})
      },
      ruleBox: function () {
        // ruleBox.showRuleBox(document.querySelector('#lottery'), this, closeBox)
        this.showRules = !this.showRules
        this.showRules ? ModalHelper.afterOpen() : ModalHelper.beforeClose()
      },
      closeDraw: function (showDrawBox) {
        this.showDrawBox = !this.showDrawBox
      },
      toLogin: function () {
        bridgeUtil.webConnectNative('HCNative_Login', undefined, {}, function (response) {}, null)
      },
      getPrize: function () {
        if (!this.token || this.token === '') {
          this.toLogin()
          return
        }
        if (LuckDraw.isLocked()) {
          return
        }
        this.$http.post('/hongcai/rest/lotteries/draw', {
          token: this.token
        })
        .then((response) => {
          if (response.data && response.data.ret === -1) {
            this.showDrawBox = true
            this.receiveDraw = false
            if (response.data.code === -1300) {
              this.showUpperLimit = true
            } else if (response.data.code === -1301) {
              this.usedAndcanShare = true
            } else {
              // alert(response.data.msg)
              this.showDrawBox = false
            }
          } else {
            this.receiveDraw = true
            this.usedAndcanShare = false
            $('.lottery-item').removeClass('selecting')
            var receivePrize = response.data
            var prizeId = receivePrize.prizeType || 1
            // console.log(prizeId)
            this.canShare = response.data.canShare
            this.draw(prizeId)
            LuckDraw.start(prizeId)
            switch (prizeId) {
              case 1:
                this.prizeList = {
                  prizeType: receivePrize.prizeType,
                  prizeText: '当日加息',
                  prizeValue: '+' + receivePrize.value + '%',
                  prizeCont: '奖励已自动生效，成功为您加息！'
                }
                break
              case 2:
                this.prizeList = {
                  prizeType: receivePrize.prizeType,
                  prizeText: '返现',
                  prizeValue: receivePrize.value + '元',
                  prizeCont: '奖励已发放至您的账户，前往“我的”页面即可查看！'
                }
                break
              case 3:
                this.prizeList = {
                  prizeType: receivePrize.prizeType,
                  prizeText: '加息券',
                  prizeValue: '+' + receivePrize.value + '%',
                  prizeCont: '奖励已发放至您的账户，前往“我的-加息券”即可查看！'
                }
                break
              case 4:
                this.prizeList = {
                  prizeType: receivePrize.prizeType,
                  prizeText: '现金券',
                  prizeValue: Number(receivePrize.value).toFixed(0) + '元',
                  prizeCont: '奖励已发放至您的账户，前往“我的-现金券”即可查看！'
                }
                break
              case 5:
                this.prizeList = {
                  prizeType: receivePrize.prizeType,
                  prizeText: '(有效期1天)',
                  prizeValue: Number(receivePrize.value).toFixed(0) + '元特权本金',
                  prizeCont: '奖励已发放至您的账户，前往“我的-特权本金”即可查看！'
                }
                break
              case 6:
                this.prizeList = {
                  prizeType: receivePrize.prizeType,
                  prizeText: '谢谢',
                  prizeValue: receivePrize.value,
                  prizeCont: '什么都木有赚到，换个姿势再试一次吧～'
                }
                break
            }
            this.drawCount = this.drawCount <= 0 ? this.drawCount : this.drawCount - 1
          }
        })
      },
      getDrawCount: function (token) {
        var that = this
        that.$http({
          url: '/hongcai/rest/lotteries/drawCount?token=' + token
        })
        .then(function (res) {
          if (res.data && res.data.ret !== -1) {
            that.drawCount = res.data
          }
        })
        .catch(function (err) {
          console.log(err)
        })
      },
      LotteryShareTo: function () {
        var that = this
        bridgeUtil.webConnectNative('HCNative_Share', 'HCWeb_ShareSuccess', {
          'HC_shareType': 2,
          'title': '今日运势，一试便知',
          'subTitle': '100%有礼！随机奖金、特权本金、返现加息券样样都有！好运从这里开始！',
          'url': that.domain + '/lottery',
          'imageUrl': 'https://mmbiz.qlogo.cn/mmbiz_jpg/8MZDOEkib8AlvibTmbDkqwbDiasl9BphCGgYnicBzl9VfX4Sm9cpvFiarGsV73IRYurUF9LPibzL0JLR5SGmd1TeO3ug/0?wx_fmt=jpeg'
        }, function () {}, that.shareRegisterCallback)
        that.showDrawBox = false
      },
      getLuckyUsers: function () {
        var that = this
        that.$http({
          url: '/hongcai/rest/lotteries/luckyUsers'
        })
        .then(function (res) {
          that.luckyUsers = res.data
          for (var i = 0; i < that.luckyUsers.length; i++) {
            var prizeType = that.luckyUsers[i].prizeType
            switch (prizeType) {
              case 1:
                that.luckyUsers[i].prizeName = '获得+' + that.luckyUsers[i].value + '%当日加息'
                break
              case 2:
                that.luckyUsers[i].prizeName = '获得返现' + that.luckyUsers[i].value + '元'
                break
              case 3:
                that.luckyUsers[i].prizeName = '获得+' + that.luckyUsers[i].value + '%加息券'
                break
              case 4:
                that.luckyUsers[i].prizeName = '获得' + Number(that.luckyUsers[i].value).toFixed(0) + '元现金券'
                break
              case 5:
                that.luckyUsers[i].prizeName = '获得特权本金' + Number(that.luckyUsers[i].value).toFixed(0) + '元'
                break
            }
          }
          that.luckyTimer(-2.5)
        })
      },
      luckyTimer: function (val) {
        var $luckyUsersList = document.querySelector('.lucky-users-box')
        this.timer = setInterval(function () {
          if (val % -12.5 === 0 && val !== 0) {
            val = 0
            $luckyUsersList.classList.remove('animate')
            $luckyUsersList.style.webkitTransform = 'translateY(0rem)'
          } else {
            $luckyUsersList.className += ' animate'
            $luckyUsersList.style.webkitTransform = 'translateY(' + val + 'rem)'
          }
          val -= 2.5
        }, 5000)
      }
    },
    destory: function () {
      window.clearInterval(this.timer)
    }
  }
</script>

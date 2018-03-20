<template>
  <div class="arbor_day">
    <img src="../../images/arbor-day/arbor-header.png" alt="" width="100%">
    <div class="tree_status">
      <div class="priviledge_status position-re" v-if="!token">
        <p class="position-ab"></p>
        已收获特权本金：100
      </div>
      <div class="no_login" v-if="!token">
        <img src="../../images/arbor-day/status_logout.png" alt="" width="100%" class="display-bl">
      </div>
      <div class="login_status position-re" v-if="token">
        <img src="../../images/arbor-day/invest-icon1.png" alt="" width="26%" class="position-ab invest_icon">
        <div class="tree1">
          <img src="../../images/arbor-day/tree1.png" alt="" width="31.7%" v-if="processDatas.annualInvestLevel === 1000">
          <img src="../../images/arbor-day/tree2.png" alt="" width="27%" v-if="processDatas.annualInvestLevel === 10000">
          <img src="../../images/arbor-day/tree3.png" alt="" width="14%" v-if="processDatas.annualInvestLevel === 30000">
          <img src="../../images/arbor-day/tree4.png" alt="" width="26%" v-if="processDatas.annualInvestLevel === 50000">
          <img src="../../images/arbor-day/tree5.png" alt="" width="28.5%" v-if="processDatas.annualInvestLevel === 100000">
          <img src="../../images/arbor-day/tree6.png" alt="" width="38%" v-if="processDatas.annualInvestLevel === 3000000">
        </div>
      </div>
      <img src="../../images/arbor-day/text1.png" alt="" width="29.2%" class="margin-auto">
      <img src="../../images/arbor-day/text2.png" alt="" width="45.2%" class="margin-auto" v-if="false">
      <div class="process_bar">
        <p class="process_title">累计年化投资金额(元)</p>
        <div class="process position-re">
          <div class="position-ab" :style="{'width': annualInvestAmount / processDatas.annualInvestLevel * 100 + '%'}"></div>
          <p class="position-ab"><span class="text_red">{{annualInvestAmount}}</span>／{{processDatas.annualInvestLevel}}</p>
        </div>
        <p>还差<span class="text_red">{{processDatas.diffrentAmount}}元</span>即可将<span class="text_red">{{processDatas.annualInvestLevel}}元</span>特权本金收入囊中咯！</p>
      </div>
      <div class="btns">
        <button type="button">活动期间投资记录</button>
        <button type="button">年化投资计算器</button>
      </div>
    </div>
    <div class="arbor_tip">
      活动期间，用户投资宏财精选、尊贵项目即可为摇钱树浇水，<span class="text_red text-bold text-justify">累计年化投资金额</span>达到指定额度，摇钱树成长即可收获相应特权本金奖励！(特权本金有效期1天)
    </div>
    <div class="table_wrapper">
      <table>
        <tr>
          <td>累计年化投资金额(元)</td>
          <td>可收获特权本金(元)</td>
        </tr>
        <tr v-for="(item, index) in annualInvestList" :key="index">
          <td>{{item.amount || 0}}</td>
          <td>{{item.priviledge || 0}}</td>
        </tr>
      </table>
      <p class="table_explain">年化投资金额=投资金额x项目期限/365天</p>
    </div>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'ArborDay',
  data () {
    return {
      priviledge: 0, // 以获取的特权本金
      annualInvestAmount: 18000,
      processDatas: {
        annualInvestLevel: 10000,
        diffrentAmount: 0
      },
      annualInvestList: [
        {
          amount: 1000,
          priviledge: 10000
        }, {
          amount: 10000,
          priviledge: 12000
        }, {
          amount: 30000,
          priviledge: 390000
        }, {
          amount: 50000,
          priviledge: 500000
        }, {
          amount: 100000,
          priviledge: 1180000
        }, {
          amount: 30000,
          priviledge: 5800000
        }
      ],
      rewardList: [
        {
          status: 0, // 领取状态 0 可领 1 不可领
          amount: 10000 // 特权本金金额
        }, {
          status: 0,
          amount: 10000
        }
      ]
    }
  },
  created () {
    this.getToken()
    this.getActivityInfo(42)
    this.getProcessDatas()
  },
  computed: {
    ...mapGetters([
      'activityInfo',
      'token'
    ])
  },
  methods: {
    ...mapActions([
      'getActivityInfo',
      'getToken'
    ]),
    getProcessDatas () { // 进度条下一等级和达到下一等级的差值
      let amount = 0
      let diff = 0
      if (this.annualInvestAmount < 1000) {
        amount = 1000
        diff = 1000 - this.annualInvestAmount
      } else if (this.annualInvestAmount >= 1000 && this.annualInvestAmount < 10000) {
        amount = 10000
        diff = 12000 - this.annualInvestAmount
      } else if (this.annualInvestAmount >= 10000 && this.annualInvestAmount < 30000) {
        amount = 30000
        diff = 30000 - this.annualInvestAmount
      } else if (this.annualInvestAmount >= 30000 && this.annualInvestAmount < 50000) {
        amount = 50000
        diff = 50000 - this.annualInvestAmount
      } else if (this.annualInvestAmount <= 50000 && this.annualInvestAmount < 100000) {
        amount = 100000
        diff = 100000 - this.annualInvestAmount
      } else {
        amount = 300000
        diff = 300000 - this.annualInvestAmount
      }
      this.processDatas = {
        annualInvestLevel: amount,
        diffrentAmount: diff
      }
    }
  }
}
</script>
<style scoped lang=""<style lang="less" scoped>
  .arbor_day {
    padding-bottom: 1rem;
    background-color:#9ce9ca;
    .text_red {
      color: #c6421f;
    }
    .tree_status {
      .priviledge_status {
        padding-left: 4%;
        margin: -.4rem auto 0;
        width: 70%;
        font-size: .26rem;
        font-weight: bold;
        line-height: .85rem;
        color: #c6421f;
        height: .8rem;
        border-radius: .5rem;
        background: url('../../images/arbor-day/coin_icon1.png') no-repeat 5% 48%;
        background-color: rgba(255, 255, 255, 0.5);
        background-size: 9%;
      }
      .login_status {
        margin-bottom: .1rem;
        height: 5rem;
        width: 100%;
        background: url('../../images/arbor-day/tree-bg.png') no-repeat center bottom;
        background-size: 100%;
        .invest_icon {
          right: 0;
          top: 0;
        }
        .tree1 {
          img {
            margin-top: 2.2rem;
          }
        }
      }
      .process_bar {
        width: 100%;
        p {
          color: #634d25;
        }
        .process_title {
          width: 85.6%;
          margin: 0 auto;
          margin-top: .2rem;
          padding-left: 7%;
          text-align: left;
          font-size: .22rem;
          line-height: 1.38;
          letter-spacing: -1px;
          background: url('../../images/arbor-day/coin_icon1.png') no-repeat 1% -18%;
          background-size: 5.5%;
        }
        .process {
          width: 85.6%;
          margin: .1rem auto;
          height: .44rem;
          border-radius: .25rem;
          background-color: #ffffff;
          box-shadow: inset 1.1px 1.1px 3.5px 0 rgba(3, 0, 0, 0.35);
          div {
            top: .053rem;
            left: 0.05rem;
            height: .34rem;
            // margin-top: .02rem;
            width: 50%;
            border-radius: .25rem;
            background-color: #facc2e;
          }
          p {
            width: 100%;
            height: 100%;
            line-height: .5rem;
            font-size: .25rem;
            font-weight: bold;
            letter-spacing: -1px;
            span {
              color: #c7461e;
            }
          }
        }
      }
      .btns {
        margin: .35rem 0 .3rem -2%;
        text-shadow: 0.2px 0.5px 0 rgba(111, 73, 0, 0.28);
        button {
          margin-left: 2%;
          display: inline-block;
          height: .6rem;
          width: 42.8%;
          font-size: .26rem;
          border: none;
          background: url('../../images/arbor-day/right-btn.png') no-repeat center center;
          background-size: 100%;
          color: #c6421f;
          line-height: 1.2;
        }
        button:first-child {
          background: url('../../images/arbor-day/left-btn.png') no-repeat center center;
          background-size: 100%;
          color: #fff;
        }
      }
    }
    .arbor_tip {
      width:88.2%;
      text-align: justify;
      margin: 0 auto .2rem;
      color: #634d25;
      line-height: 1.46;
      font-size: .24rem;
    }
    .table_wrapper {
      width: 96%;
      height: 8rem;
      margin-left: 2.5%;
      padding-top: 1.5rem;
      background: url('../../images/arbor-day/rule-bg2.png') no-repeat top center;
      background-size: 100%;
      table {
        padding: 0 .12rem;
        margin-left: 3.6%;
        display: block;
        width: 86%;
        text-align: center;
        font-size: .25rem;
        background-color: #2e9e86;
        tr {
          display: block;
          width: 100%;
          border-bottom: 1px solid #fff;
          td {
            width: 48%;
            height: .75rem;
            line-height: .75rem;
            display: inline-table;
            font-weight: bold;
          }
          td:first-child {
            color: #fff;
            border-right: .5px solid #fff;
          }
          td:last-child {
            color: #ffe400;
          }
        }
      }
      .table_explain {
        margin-top: .2rem;
        font-size: .22rem;
        color: #fff;
      }
    }
  }
</style>

<template>
  <div class="new_year">
      <div class="position-re carousel-mask">
        <div id="wrapper">
          <ul class="poster-list clearfix clear">
            <li>
              <div class="red_bag_bg" @click="openBag(5)">5</div>
            </li>
            <li>
              <div class="red_bag_bg" @click="openBag(35)">35</div>
            </li>
            <li>
              <div class="red_bag_bg" @click="openBag(90)">90</div>
            </li>
            <li>
              <div class="red_bag_bg" @click="openBag(120)">120</div>
            </li>
            <li>
              <div class="red_bag_bg" @click="openBag(150)">150</div>
            </li>
            <li>
              <div class="red_bag_bg" @click="openBag(1288)">1288</div>
            </li>
          </ul>
        </div>
      </div>
  </div>
</template>

<script>
  import {Carousel} from '../../service/mCarousel'
  export default {
    name: 'NewYear',
    data () {
      return {
        cash: 90, // 当前最大可领取红包
        carouselId: {
          '5': 0,
          '35': 1,
          '90': 2,
          '120': 3,
          '150': 4,
          '1288': 5
        }, // 最大可领取对应的index值
        canOpen: true, // 轮播切换中是否可拆
        isOpened: false // 是否拆过红包
      }
    },
    created () {
    },
    methods: {
      openBag (cash) {
        if (!this.canOpen || this.carouselId[cash] !== Carousel.index || cash > this.cash || this.isOpened) {
          return
        }
        this.isOpened = true
        alert(cash)
      }
    },
    mounted () {
      var that = this
      var wrapper = document.getElementById('wrapper')
      Carousel.mCarousel(wrapper, {
        index: that.carouselId[that.cash],
        active: 'active',
        scale: 0.67,
        duration: 300,
        locked: true,
        diff: 0.45,
        before: function () { // 动画执行中不可拆红包
          that.canOpen = false
        },
        after: function () {
          that.canOpen = true
        }
      })
    }
  }
</script>
<style>
  .new_year {
    overflow-x: hidden;
  }
  #wrapper {
    height: 3.6rem;
  }
  .poster-list li {
    width: 72%;
    margin: 0 auto;
    height: 100%;
  }
  .carousel-mask {
    width: 78%;
    margin: 0 auto;
  }
  .poster-list li .red_bag_bg {
    width: 100%;
    height: 100%;
    color: #fff;
    line-height: 4rem;
    font-size: .4rem;
    background: url('../../images/new-year/red_bag.png') no-repeat center center;
    background-size: contain;
  }
</style>

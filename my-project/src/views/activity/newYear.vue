<template>
  <div class="new_year">
      <div class="position-re carousel-mask">
        <div id="wrapper">
          <ul class="poster-list clearfix clear">
            <li class="">
              <div class="red_bag_bg">5</div>
            </li>
            <li class="">
              <div class="red_bag_bg">35</div>
            </li>
            <li class="">
              <div class="red_bag_bg">90</div>
            </li>
            <li class="">
              <div class="red_bag_bg">120</div>
            </li>
            <li class="">
              <div class="red_bag_bg">150</div>
            </li>
            <li class="">
              <div class="red_bag_bg">1288</div>
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
        carouselId: Function // 最大可领取对应的index值
      }
    },
    created () {
      switch (this.cash) {
        case 5:
          this.carouselId = 0
          break
        case 35:
          this.carouselId = 1
          break
        case 90:
          this.carouselId = 2
          break
        case 120:
          this.carouselId = 3
          break
        case 150:
          this.carouselId = 4
          break
        case 1288:
          this.carouselId = 5
          break
      }
    },
    mounted () {
      var that = this
      var wrapper = document.getElementById('wrapper')
      Carousel.mCarousel(wrapper, {
        index: that.carouselId,
        active: 'active',
        scale: 0.7,
        duration: 300,
        locked: true,
        diff: 0.45,
        before: function () {
          console.log('切换开始' + this.index)
        },
        after: function () {
          console.log('切换结束' + this.index)
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
    width: 100%;
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

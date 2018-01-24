<template>
  <div class="home" v-auto-height>
    <!-- <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <img src="../images/transfer.png" alt="" width="60%">
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br> -->
    <!-- 轮播banner图 -->
    <div class="slide-banner position-re overflow-hid" >
      <div class="slide position-re" id="slideBanner">
        <ul>
          <li class="position-re text-center">
            <a class="pic display-bl"><img src="../images/home/fenlan.png" /></a>
          </li>
          <li class="position-re text-center">
            <a class="pic display-bl"><img src="../images/home/madajiasijia.png" /></a>
          </li>
          <li class="position-re text-center">
            <a class="pic display-bl"><img src="../images/home/gelunbiya.png" /></a>
          </li>
          <li class="position-re text-center">
            <a class="pic display-bl"><img src="../images/home/guba.png" /></a>
          </li>
          <li class="position-re text-center">
            <a class="pic display-bl"><img src="../images/home/hanguo.png" /></a>
          </li>
          <li class="position-re text-center">
            <a class="pic display-bl"><img src="../images/home/baimuda.png" /></a>
          </li>
          <li class="position-re text-center">
            <a class="pic display-bl"><img src="../images/home/helan.png" /></a>
          </li>
          <li class="position-re text-center">
            <a class="pic display-bl"><img src="../images/home/kamailong.png" /></a>
          </li>
          <li class="position-re text-center">
            <a class="pic display-bl"><img src="../images/home/niriliya.png" /></a>
          </li>
        </ul>
        <div class="dot">
          <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
        </div>
      </div>
    </div>
    <div class="hot_area">
      <p>热门国家或地区</p>
      <div class="hot_box">
        <div class="hot-son">
          <div class="hot-son-inner" v-for="area in areaList">
            <img :src="'../../static/images/' + area.country + '.png'" width="100%" height="100%">
            <span class="shade" :style="'background-color: ' + area.color + ';'"></span>
            <p>{{area.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <footer-div></footer-div>
  </div>
</template>

<script>
  import $ from 'zepto'
  import footerDiv from 'components/footer'
  import {swiper} from '../service/swipeSlide'
  export default {
    name: 'home',
    data () {
      return {
        obj: $('#slideBanner'),
        areaList: []
      }
    },
    created () {
      this.getAreas()
    },
    mounted () {
      swiper.init({
        autoSwipe: true,
        axisX: true,
        continuousScroll: true,
        speed: 2000,
        transitionType: 'cubic-bezier(0.22, 0.69, 0.72, 0.88)',
        firstCallback: function (i, sum) {
          $('#slideBanner').find('.dot').children().first().addClass('cur')
        },
        callback: function (i, sum) {
          $('#slideBanner').find('.dot').children().eq(i).addClass('cur').siblings().removeClass('cur')
        }
      })
    },
    methods: {
      getAreas () {
        this.$http.get('http://localhost:8888/api/areas').then((res) => {
          console.log(res.data.data)
          this.areaList = res.data.data
        })
      }
    },
    components: {
      footerDiv
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home {
    background-color: #fff;
  }
  .hot_box {
    margin: .3rem auto;
  }
  .hot-son {
    margin-left: -5%;
    text-align: center;
  }
  .hot-son .hot-son-inner {
    display: inline-block;
    height: 100px;
    width: 25%;
    margin-left: 5%;
    position: relative;
  }
  .hot-son-inner span {
    display: block;
    position: absolute;
    bottom: 0;
    width: 60%;
    height: .35rem;
    left: 20%;
    opacity: 0.7;
  }
  .hot-son-inner p {
    position: absolute;
    bottom: 0;
    text-align: center;
    width: 60%;
    height: .35rem;
    line-height: .4rem;
    font-size: .2rem;
    left: 20%;
    color: #fff;
  }
</style>

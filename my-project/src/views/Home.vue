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
    <!-- <loading :show="show1" :text="text1"></loading> -->
    <!-- <alert v-model="show" :title="''">就是问问你吃没吃，没别的意思</alert> -->
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
      <p @click="getAreas">作者：{{$store.state.author}},年龄：{{$store.state.age}}</p>
      <button @click="$store.commit('changeName')">点击切换{{sex}}</button><br>
      <!-- 上个月第一天到最后一天 -->
      <p @click="change()">{{year}}年-{{lastMonth}}月-1日 -- {{year}}年-{{lastMonth}}月-{{lastDate}}日</p>
      <div class="hot_box">
        <div class="hot-son">
          <div class="hot-son-inner" v-for="area in areaList" :key="area.name" @click="toAreaDetail(area.country)">
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
import $ from "zepto";
import footerDiv from "components/footer";
import { swiper } from "../service/swipeSlide";
import { axios } from "../service/Utils";
import { Loading, Alert } from "vux";
import store from "../vuex/store";
import { mapState, mapGetters } from "vuex";
export default {
  name: "home",
  data() {
    return {
      obj: $("#slideBanner"),
      areaList: [],
      lastMonth: new Date().getMonth(),
      lastDate: 30,
      show1: true,
      show: true,
      text1: "加载中～",
      year: new Date().getFullYear()
    };
  },
  computed: {
    ...mapState(["sex", "age"]),
    ...mapGetters(["age"]),
    age() {
      return this.$store.getters.age;
    }
  }, // computed属性可以在输出前，对data中的值进行改变，我们就利用这种特性把store.js中的state值赋值给我们模板中的data值。
  created() {
    // this.getAreas();
    this.cacul();

    // console.log(mapMutations)
    // console.log(this.getMaxProfit([5, 4, 3, 4, 3]));
  },
  mounted() {
    swiper.init({
      autoSwipe: true,
      axisX: true,
      continuousScroll: true,
      speed: 2000,
      transitionType: "cubic-bezier(0.22, 0.69, 0.72, 0.88)",
      firstCallback: function(i, sum) {
        $("#slideBanner")
          .find(".dot")
          .children()
          .first()
          .addClass("cur");
      },
      callback: function(i, sum) {
        $("#slideBanner")
          .find(".dot")
          .children()
          .eq(i)
          .addClass("cur")
          .siblings()
          .removeClass("cur");
      }
    });
  },
  methods: {
    quickSort(arr) {
      // 快速排序
      if (arr.length <= 1) {
        return arr;
      }
      let arrL = [];
      let arrR = [];
      let q = arr[0];
      for (let i = 1, j = arr.length; i < j; i++) {
        if (arr[i] > q) {
          arrR.push(arr[i]);
        } else {
          arrL.push(arr[i]);
        }
      }
      return [].concat(this.quickSort(arrL), [q], this.quickSort(arrR));
    },
    getMaxProfit(arr) {
      var minPrice = arr[0];
      var maxProfit = 0;

      for (var i = 0; i < arr.length; i++) {
        var currentPrice = arr[i];

        minPrice = Math.min(minPrice, currentPrice);

        var potentialProfit = currentPrice - minPrice;

        maxProfit = Math.max(maxProfit, potentialProfit);
      }

      return maxProfit;
    },
    getAreas() {
      // this.$http.get("http://localhost:8888/api/areas").then(res => {
      //   this.areaList = res.data.data;
      // });
      axios.get("http://localhost:8888/api/areas").then(res => {
        this.areaList = res.data.data;
        console.log('aaa')
      })
    },
    toAreaDetail(name) {
      this.$router.push({ name: name });
    },
    cacul() {
      let currentDate = new Date();
      this.lastMonth =
        currentDate.getMonth() === 0 ? 12 : currentDate.getMonth();
      this.year = this.lastMonth === 12 ? this.year - 1 : this.year;
      if (
        this.lastMonth === 4 ||
        this.lastMonth === 6 ||
        this.lastMonth === 9 ||
        this.lastMonth === 11
      ) {
        this.lastDate = 30;
      } else if (this.lastMonth === 2) {
        this.lastDate = this.year % 4 === 0 ? 29 : 28;
      } else {
        this.lastDate = 31;
      }
    }
  },
  components: {
    footerDiv,
    Loading,
    Alert
  },
  store
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  background-color: #fff;
}
.hot_box {
  margin: 0.3rem auto;
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
  height: 0.35rem;
  left: 20%;
  opacity: 0.7;
}
.hot-son-inner p {
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 60%;
  height: 0.35rem;
  line-height: 0.4rem;
  font-size: 0.2rem;
  left: 20%;
  color: #fff;
}
</style>

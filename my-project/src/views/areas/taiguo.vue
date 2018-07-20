<template>
  <div class="taiguo" v-auto-height>
    <div class="wrap">
      <div class="item item1">{{country}}</div>
      <div class="item item2">{{country}}</div>
      <div class="item item3">{{country}}</div>
      <div class="item item4">{{country}}</div>
    </div>
  </div>
</template>
<script>
import { iSlider } from "../../service/iSlider.js";
export default {
  name: "taiguo",
  data() {
    return {
      country: "泰国"
    };
  },
  created() {
    var num = 0;
    outermost: for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        if (i == 5 && j == 5) {
          break outermost;
        }
        num++;
      }
    }
    console.log(num)
  },
  mounted() {
    iSlider.Slider({
      isVertical: false // 是否竖屏显示
    });
  }
};
</script>
<style scoped>
.taiguo {
  background-color: #f5ff;
}
.item2 {
  background-color: forestgreen;
}
.item3 {
  background-color: blueviolet;
}
.item4 {
  background-color: yellowgreen;
}
</style>

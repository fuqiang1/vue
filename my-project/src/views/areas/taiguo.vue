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
  import {iSlider} from '../../service/iSlider.js'
  export default {
    name: 'taiguo',
    data () {
      return {
        country: '泰国'
      }
    },
    mounted () {
      iSlider.Slider({
        isVertical: false // 是否竖屏显示
      })
    }
  }
</script>
<style scoped>
  .taiguo {
    background-color:red;
  }
  .item2 {
    background-color: forestgreen;
  }
  .item3 {
    background-color:blueviolet;
  }
  .item4 {
    background-color:yellowgreen;
  }
</style>

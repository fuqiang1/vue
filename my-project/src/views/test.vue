<template>
  <div class="home">
    <!-- 轮播banner图 -->
    <div class="slide-banner position-re overflow-hid" >
      <div class="slide position-re" id="slideBanner">
        <ul>
          <li class="position-re text-center">
            <a class="pic display-bl"><img src="../images/banner/banner1.jpg" /></a>
          </li>
          <li class="position-re text-center">
            <a class="pic display-bl"><img src="../images/banner/banner1.jpg" /></a>
          </li>
          <li class="position-re text-center">
            <a class="pic display-bl"><img src="../images/banner/banner1.jpg" /></a>
          </li>
          <li class="position-re text-center">
            <a class="pic display-bl"><img src="../images/banner/banner1.jpg" /></a>
          </li>
        </ul>
        <div class="dot">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    <!--常见问题-->
    <div class="symptom bg-white">
      <div class="title symptom-title bd-t-eee bd-b-eee pad-40">
        <p class="display-inb ft-444 text-left ft-30"><span class="line display-inb bg-blue"></span>孩子的常见问题</p><p class="display-inb ft-999 text-right ft-24">更多</p>
      </div>
      <div class="symptom-list bd-b-eee">
        <ul>
          <li class="display-inb"><img src="../images/home/symptom11.png" alt=""></li>
          <li class="display-inb"><img src="../images/home/symptom11.png" alt=""></li>
          <li class="margin-r-0 display-inb"><img src="../images/home/symptom11.png" alt=""></li>
          <li class="display-inb"><img src="../images/home/symptom11.png" alt=""></li>
          <li class="display-inb"><img src="../images/home/symptom11.png" alt=""></li>
          <li class="margin-r-0 display-inb"><img src="../images/home/symptom11.png" alt=""></li>
        </ul>
      </div>
    </div>
    <!--专家推荐-->
    <div class="expert bg-white">
      <div class="title expert-title bd-t-eee bd-b-eee pad-40">
        <p class="display-inb ft-444 text-left ft-30"><span class="line display-inb bg-blue"></span>专家推荐</p><p class="display-inb ft-999 text-right ft-24">更多</p>
      </div>
      <ul>
        <li class="pad-40 bd-b-eee">
          <div class="portrait display-inb"></div>
          <div class="portrait display-inb"><div class="portrait-inner"><img src="../images/home/boy.png" alt="" class="header" width="100%"></div></div>
          <div class="info display-inb">
            <div class="name"><p class="ft-28 ft-444 display-inb text-left">叶问</p><p class="ft-red ft-28 display-inb text-right ft-Arial">50</p></div>
            <p class="ft-24 ft-999"><span>北京大学心理学教授</span><span>儿童教育学专家</span></p> 
            <p class="ft-24 ft-999">擅长：儿童心理问题诊断治疗，帮助建立良好复</p>     
          </div>
        </li>
        <li class="pad-40 bd-b-eee">
          <div class="portrait display-inb"></div>
          <div class="portrait display-inb"><div class="portrait-inner"><img src="../images/home/boy.png" alt="" class="header" width="100%"></div></div>
          <div class="info display-inb">
            <div class="name"><p class="ft-28 ft-444 display-inb text-left">叶问</p><p class="ft-red ft-28 display-inb text-right ft-Arial">50</p></div>
            <p class="ft-24 ft-999"><span>北京大学心理学教授</span><span>儿童教育学专家</span></p> 
            <p class="ft-24 ft-999">擅长：儿童心理问题诊断治疗，帮助建立良好复</p>     
          </div>
        </li>
      </ul>
    </div>
    <div style="width: 100%;overflow:hidden;">
      <canvas id="myCanvas" width="350" height="450"></canvas>
    </div>
    <!-- <div class="mask-common mask2">
      <div class="test1">
        <div class="test2">
          <div class="test3">
            <div class="test4">
              <div class="test5">
                <div class="test6">
                  <div class="test7"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- 0.5px边框 -->
    <div class="custom-border border-color">边框宽度1px</div>
    <div class="scale-border">
      <div class="content" style="">边框宽度0.5px
      </div>
      <div class="border border-color">
      </div>
    </div>
    <div class="bd-t"></div>
    <div class="box">
      <div class="box-son">
        <a href="#">增加</a>
        <a href="#">删除</a>
        <a href="#">修改</a>
      </div>
    </div>
    <input name="file" type="file" accept="image/png,image/gif,image/jpeg" @change="update"/>
    <!-- <img src="../images/banner/banner1.png" alt=""> -->
    <footer-div></footer-div>
  </div>
</template>

<script>
  import $ from 'zepto'
  import {swiper} from '../service/swipeSlide'
  import footerDiv from 'components/footer'
  export default {
    name: 'home',
    data () {
      return {
        obj: $('#slideBanner')
      }
    },
    props: ['token'],
    created () {
      let s = Symbol()
      console.log(typeof s)
      this.$http.get('http://localhost:8888/api/goods').then((response) => {
        // console.log(response)
      })
    },
    mounted () {
      // this.lightCandle()
      var mainCanvas = document.querySelector('#myCanvas')
      var mainContext = mainCanvas.getContext('2d')
      var canvasWidth = mainCanvas.width
      var canvasHeight = mainCanvas.height
      var angle = 0
      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame
      function drawCircle () {
        mainContext.clearRect(0, 0, canvasWidth, canvasHeight)
        mainContext.fillStyle = '#EEEEEE'
        mainContext.fillRect(0, 0, canvasWidth, canvasHeight)
        mainContext.strokeRect(50, 50, 50, 50)
        mainContext.beginPath()
        var radius = 25 + 130 * Math.abs(Math.cos(angle))
        mainContext.arc(175, 225, radius, 0, Math.PI * 2, false)
        mainContext.closePath()
        mainContext.fillStyle = '#006699'
        mainContext.stroke()
        mainContext.fill()
        angle += Math.PI / 64
        requestAnimationFrame(drawCircle)
      }
      drawCircle()
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
      lightCandle () {
        var o = 0.9
        var opacityInteval = setInterval(function () {
          o -= 0.02
          $('.mask2').css({opacity: o})
          if (o <= 0) {
            $('.mask2').css({display: 'none'})
            clearInterval(opacityInteval)
            return
          }
        }, 30)
      },
      update (e) {
        // var self = this
        let file = e.target.files[0]
        /* eslint-disable no-undef */
        let param = new FormData()  // 创建form对象
        param.append('file', file, file.name)  // 通过append向form对象添加数据
        // param.append('chunk', '0') // 添加form表单中其他数据
        // param.append('token', this.token)
        // param.append('category', '7')
        // param.append('fileType', '0')
        // param.append('archiveType', '6')
        // param.append('description', '头像')
        console.log(param)
        console.log(param.get('file')) // FormData私有类对象，访问不到，可以通过get判断值是否传进去
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        // 添加请求头
        this.$http.post('/hongcai/api/v1/siteUser/uploadFile', {
          token: this.token,
          categoryId: 117361,
          category: 7,
          fileType: 0,
          archiveType: 6,
          description: '头像'
        }, config)
        .then(response => {
          if (response.data.code === 0) {
            alert(response.data)
          }
          console.log(response.data)
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
  .box {
    margin: 0 auto;
    width: 100%;
  }
  .box-son {
    margin-left: -10%;
    text-align: center;
    color: #333;
  }
  .box-son a {
    display: inline-block;
    height: 100px;
    width: 20%;
    background-color: #ddd;
    margin-left: 10%;
  }
  .bd-t{
    position:relative;
  }
  .bd-t:after{
    content: " ";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #333;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  /* 0.5px边框 */
  .custom-border{
    width:200px;
    margin:10px auto;
    height:100px;
    border:1px solid #333;
    background-color:#eee;
    padding:10px;
  }
  .scale-border{
    margin:10px auto;
    height:100px;
    position:relative;
    padding:10px;
    width: 200px;
  }
  .border{
    -webkit-transform:scale(0.5);
    transform:scale(0.5);
    position:absolute;
    border:1px solid #333;
    top:-50%;
    right:-50%;
    bottom:-50%;
    left:-50%;
    border-radius: 10px;
    background-color:#eee;
  }
  .content{
    position:relative;
    z-index:2;
  }
  .mask2 {
    background-color: rgba(0,0,0,1);
    background-color: black;
    opacity: .9;
  }
  .test1 {
    width: 96%;
    height: 96%;
    margin: 3% auto;
    padding-top: 5%;
    /* border-radius: 8rem; */
    /* background-color: rgba(0,0,0,.35); */
    background: radial-gradient(ellipse closest-side, rgba(0,0,0,0.3),  rgba(0,0,0,0) 10%, rgba(0,0,0,.6) 50%, rgba(0,0,0,0.9));
  }
  .test2 {
    width: 80%;
    height: 92%;
    margin: 3% auto;
    padding-top: 5%;
    border-radius: 6rem;
    background-color: rgba(0,0,0,.4);
    opacity: .1;
  }
  .test3 {
    width: 80%;
    height: 92%;
    margin: 3% auto;
    padding-top: 5%;
    border-radius: 6rem;
    background-color: rgba(0,0,0,.45);
  }
  .test4 {
    width: 80%;
    height: 92%;
    margin: 3% auto;
    padding-top: 5%;
    border-radius: 6rem;
    background-color: rgba(0,0,0,.5);
  }
  .test5 {
    width: 80%;
    height: 92%;
    margin: 3% auto;
    padding-top: 5%;
    border-radius: 6rem;
    background-color: rgba(0,0,0,.55);
  }
  .test6 {
    width: 80%;
    height: 92%;
    margin: 3% auto;
    padding-top: 5%;
    border-radius: 6rem;
    background-color: rgba(0,0,0,.6);
  }
  .test7 {
    width: 80%;
    height: 92%;
    margin: 3% auto;
    padding-top: 5%;
    border-radius: 6rem;
    background-color: rgba(0,0,0,0.9);
    /* background-color: #fff;
    opacity: 1; */
  }
  .pad-40 {
    padding-left: .4rem;
    padding-right: .4rem;
  }
  .bd-t-eee {
    border-top: 1px solid #eee;
  }
  .bd-b-eee {
    border-bottom: 1px solid #eee;
  }
  /*常见问题*/
  .symptom .title, .expert .title {
    padding-top: .23rem;
    padding-bottom: .22rem;
    display: table;
    width: 100%;
  }
  .title p {
    width: 50%;
    display: table-cell;
  }
  .title .line {
    height: .28rem;
    width: .05rem;
    background-color: #31cfff;
    margin-right: .06rem;
  }
  .symptom-list {
    padding: .2rem .4rem;
  }
  .symptom-list ul li img{
    /*width: 27.5%;*/
    /*margin-right: .022rem;*/
    /*height: 1.95rem;*/
    display: block;
    background-color: pink;
  }
  /*推荐专家*/

  .expert .portrait .portrait-inner {
    width: .98rem;
    height: .98rem;
    border-radius: 50%;
    text-align: left;
  }
  .expert ul li {
    padding-top: .4rem;
    padding-bottom: .4rem;
  }
  .expert .portrait {
    width: 20%;
  }
  .expert .info {
    width: 78%;
    text-align: justify;
  }
  .expert .info .name p {
    width: 50%;
  }
</style>

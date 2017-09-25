<template>
  <div class="home" v-auto-height>
    <br>
    <!-- <div><img src="../images/hc-logo.png" alt="" width="80%"></div> -->
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
    <br>
    <footer-div></footer-div>
  </div>
</template>

<script>
  import footerDiv from 'components/footer'
  export default {
    name: 'home',
    data () {
      return {
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
</style>

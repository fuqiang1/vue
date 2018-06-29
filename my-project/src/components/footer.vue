<template>
    <p style="font-size: .2rem;">
      Copyright&nbsp;&copy;&nbsp;{{author}}{{age}} - 2017 All rights reserved
    </p>
</template>
<script>
  export default {
    name: 'footerDiv',
    data () {
      return {
        age: this.$store.state.age
      }
    },
    computed: {
      author () {
        return this.$store.state.author
      }
    }
  }
</script>


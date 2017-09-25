<template>
    <p style="font-size: .2rem;">
      Copyright&nbsp;&copy;&nbsp;{{author}} - 2017 All rights reserved
    </p>
  </footer>
</template>
<script>
  export default {
    name: 'footerDiv',
    data () {
      return {
      }
    },
    computed: {
      author () {
        return this.$store.state.author
      }
    }
  }
</script>


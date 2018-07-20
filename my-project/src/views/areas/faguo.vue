<template>
  <div>
    faguo
  </div>
</template>

<script>
export default {
  name: "faguo",
  created() {
    function factorial(num) {
      if (num <= 1) {
        return 1;
      } else {
        6;
        return num * factorial(num - 1);
      }
    }
    var anotherFactorial = factorial; 
    // factorial = null;
    alert(anotherFactorial(4)); //出错!
    // this.$router.replace({name: 'SpringFestival', query: {act: '39'}})
  }
};
</script>

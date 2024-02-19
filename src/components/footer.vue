<template>
  <v-footer app class="CurrentVersionColor" rounded="t-lg">
    <div class="text-center w-100">Developed by `Ibrahem Ghanim`</div>
  </v-footer>
</template>
<style scoped>
.CurrentVersionColor {
  color: #fff;
  font-weight: bold;
  background: linear-gradient(119deg, #1565c0, #b92b27);
  background-size: 400% 400%;

  -webkit-animation: gradiantColor 9s ease infinite;
  -moz-animation: gradiantColor 9s ease infinite;
  -o-animation: gradiantColor 9s ease infinite;
  animation: gradiantColor 9s ease infinite;
}
@-webkit-keyframes gradiantColor {
  0% {
    background-position: 0% 27%;
  }
  50% {
    background-position: 100% 74%;
  }
  100% {
    background-position: 0% 27%;
  }
}
@-moz-keyframes gradiantColor {
  0% {
    background-position: 0% 27%;
  }
  50% {
    background-position: 100% 74%;
  }
  100% {
    background-position: 0% 27%;
  }
}
@-o-keyframes gradiantColor {
  0% {
    background-position: 0% 27%;
  }
  50% {
    background-position: 100% 74%;
  }
  100% {
    background-position: 0% 27%;
  }
}
@keyframes gradiantColor {
  0% {
    background-position: 0% 27%;
  }
  50% {
    background-position: 100% 74%;
  }
  100% {
    background-position: 0% 27%;
  }
}
</style>

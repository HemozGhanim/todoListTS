<script setup lang="ts">
import Navigation from "../components/navigation/navigation.vue";
import Footer from "../components/footer.vue";
</script>

<template>
  <Navigation></Navigation>
  <router-view></router-view>
  <Footer></Footer>
</template>

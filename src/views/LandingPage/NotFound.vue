<template>
  <div class="not-found-page">
    <img
      class="not-found-logo"
      src="/img/404.png"
      alt=""
      width="400px"
      height="400px"
    />
    <h1>Halaman tidak ditemukan</h1>
  </div>
  <MainFooter />
</template>

<script>
import MainFooter from "@/components/Footer/MainFooter.vue";
export default {
  components: {
    MainFooter,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.not-found-page {
  background-color: #f0f0f0;
  padding: 50px;
  text-align: center;
  min-height: 50vh; /* Set min-height to 100% of viewport height */
  /* box-sizing: border-box; */
}

.not-found-logo {
  margin-top: 35px;
}
</style>

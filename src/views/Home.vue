<template>
  <div>

  

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// import AppDownloadBanner from "@/components/home/AppDownloadBanner.vue";
// import TopNav from "@/components/home/TopNav.vue";
// import QuickEntry from "@/components/home/QuickEntry.vue";
// import HomeBanner from "@/components/home/HomeBanner.vue";
// import NoticeMarquee from "@/components/home/NoticeMarquee.vue";
// import UserFunctionBar from "@/components/home/UserFunctionBar.vue";
// import JackpotDisplay from "@/components/home/JackpotDisplay.vue";
// import GameList from "@/components/home/GameList.vue";
// import BottomFunctionGrid from "@/components/home/BottomFunctionGrid.vue";
// import AboutSection from "@/components/home/AboutSection.vue";

const showAppBanner = ref(true);

onMounted(() => {
  const hide = localStorage.getItem("hideAppBanner");
  if (hide === "1") {
    showAppBanner.value = false;
  }
});
</script>

<style scoped>
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
}
</style>

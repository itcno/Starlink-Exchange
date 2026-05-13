<template>
  <div v-if="visible" class="app-download-banner">
    <button class="close-btn" @click="closeBanner">✕</button>
    <img class="logo" :src="logoSrc" alt="平台LOGO" />
    <button class="download-btn" @click="downloadApp">立即下载</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import logoSrc from '@/assets/imgs/home/ImageToStl.com_11.avif'

const emit = defineEmits(['close'])
const visible = ref(false)

const closeBanner = () => {
  visible.value = false
  localStorage.setItem('hideAppBanner', '1')
  emit('close')
}

const downloadApp = () => {
  // 触发下载逻辑，比如跳转下载链接
  window.location.href = 'https://yourappdownloadlink.com'
}

onMounted(() => {
  if (localStorage.getItem('hideAppBanner') === '1') {
    visible.value = false
  }
})
</script>

<style lang="scss" scoped>
.app-download-banner {
  width: 100%;
  height: clamp(31.25px, 9vw, 48px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #333;
  position: relative;
  color: #F1C448;
  padding-right: clamp(10px, 3vw, 16px);
  box-sizing: border-box;

  .close-btn {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: clamp(30px, 8vw, 40px);
    background: transparent;
    border: none;
    font-size: clamp(12px, 3.5vw, 16px);
    cursor: pointer;
    color: #F1C448;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
  }

  .logo {
    height: clamp(25px, 6.6vw, 32px);
    margin-left: clamp(32px, 8vw, 44px);
    object-fit: contain;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }

  .download-btn {
    height: clamp(22px, 6vw, 30px);
    min-width: clamp(64px, 18vw, 88px);
    padding: 0 clamp(8px, 2vw, 12px);
    font-size: clamp(10px, 3vw, 13px);
    border-radius: 6px;
    background: #F1C448;
    color: #fff;
    border: none;
    cursor: pointer;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>

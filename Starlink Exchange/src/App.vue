<template>
  <div class="app-container">
    <div v-if="!showSplash" class="app-main">
      <router-view></router-view>

    <!-- 底部导航栏 -->
    <!-- <van-tabbar v-model="active" :route="true">
      <van-tabbar-item to="/" name="home" >
        <template #icon="{ active }">
          <svg class="icon-svg tab-icon" viewBox="0 0 24 24">
            <use :xlink:href="active ? '#icon-home-home2' : '#icon-home-home1'"></use>
          </svg>
        </template>
        首页
      </van-tabbar-item>
      <van-tabbar-item  name="discount"  @click=onTabClick>
        <template #icon="{ active }">
          <svg class="icon-svg tab-icon" viewBox="0 0 24 24">
            <use :xlink:href="active ? '#icon-home-discount' : '#icon-home-discount1'"></use>
          </svg>
        </template>
        优惠
      </van-tabbar-item>
      <van-tabbar-item  name="deposit" @click=onTabClick>
        <template #icon="{ active }">
          <svg class="icon-svg tab-icon" viewBox="0 0 24 24">
            <use :xlink:href="active ? '#icon-home-deposit2' : '#icon-home-deposit1'"></use>
          </svg>
        </template>
        存款
      </van-tabbar-item>
      <van-tabbar-item  name="withdraw" @click=onTabClick>
        <template #icon="{ active }">
          <svg class="icon-svg tab-icon" viewBox="0 0 24 24">
            <use :xlink:href="active ? '#icon-home-withdraw2' : '#icon-home-withdraw1'"></use>
          </svg>
        </template>
        提现
      </van-tabbar-item>
      <van-tabbar-item  name="profile" @click=onTabClick>
        <template #icon="{ active }">
          <svg class="icon-svg tab-icon" viewBox="0 0 24 24">
            <use :xlink:href="active ? '#icon-home-profile2' : '#icon-home-profile1'"></use>
          </svg>
        </template>
        我的
      </van-tabbar-item>
    </van-tabbar> -->
    </div>

    <Transition name="splash-fade">
      <div v-if="showSplash" class="splash-screen" aria-hidden="true">
        <OptimalRouteLoading />
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import OptimalRouteLoading from '@/components/OptimalRouteLoading.vue'

const SPLASH_SCROLL_LOCK_CLASS = 'splash-no-scroll'

/** 到达 99% 后保持「加载中」，不自动进入首页（需进入时再改为 false） */
const showSplash = ref(true)
const active = ref(0)

function setSplashScrollLock(locked) {
  document.documentElement.classList.toggle(SPLASH_SCROLL_LOCK_CLASS, locked)
}

watch(
  showSplash,
  (v) => {
    setSplashScrollLock(v)
  },
  { immediate: true }
)

onUnmounted(() => {
  setSplashScrollLock(false)
})
const onTabClick = (event) => {
    // 什么都不做，阻止 Tabbar 默认切换
    event.stopImmediatePropagation(); // 阻止内部事件
  }
</script>

<style scoped>
.app-container {
  width: 100%;
  min-width: 375px;
  max-width: 525px;
  /* H5 常用宽度限制 */
  margin: 0 auto;
  /* 水平居中 */
  min-height: 100vh;
  min-height: 100dvh;
  background-color: #0a1424;
  background-image: linear-gradient(
    180deg,
    rgba(8, 18, 40, 0.98) 0%,
    rgba(12, 28, 52, 0.98) 100%
  );
  display: flex;
  flex-direction: column;
  position: relative;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.splash-screen {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100000;
  width: min(100vw, 525px);
  max-width: 100%;
  height: 100vh;
  height: 100dvh;
  max-height: 100vh;
  max-height: 100dvh;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  overflow: hidden;
  overscroll-behavior: none;
  touch-action: none;
}

.splash-screen > :deep(.route-loading) {
  flex: 1 1 auto;
  width: 100%;
  min-height: 0;
  height: 100%;
  max-height: 100%;
}

.splash-fade-enter-active,
.splash-fade-leave-active {
  transition: opacity 0.45s ease;
}

.splash-fade-enter-from,
.splash-fade-leave-to {
  opacity: 0;
}

:global(body) {
  user-select: none;
  -webkit-user-select: none;
}

:global(input),
:global(textarea),
:global(select),
:global(option),
:global([contenteditable]),
:global(.allow-select) {
  user-select: auto;
  -webkit-user-select: auto;
}

.tab-icon {
  width: clamp(22px, 6vw, 28px);
  height: clamp(22px, 6vw, 28px);
}

:deep(.van-tabbar-item__text) {
  font-size: clamp(12px, 3.2vw, 16px);
  font-weight: normal;
  line-height: 1;
}

:deep(.van-tabbar-item.van-tabbar-item--active__text) {
  font-weight: normal;
}
</style>

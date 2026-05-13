<template>
  <div class="route-loading" aria-busy="true" aria-live="polite">
    <div
      class="route-loading-bg"
      :style="{ backgroundImage: `url(${bgUrl})` }"
      aria-hidden="true"
    />
    <div class="route-loading-vignette" aria-hidden="true" />
    <div class="route-loading-stack">
      <div class="route-loading-spacer" aria-hidden="true" />
      <div class="route-loading-bottom">
        <p class="route-loading-status">
          <template v-if="phase === 'progress'">正在分配最优线路…</template>
          <template v-else>正在分配最优线路…</template>
        </p>
        <div class="route-loading-meter-row">
          <div ref="meterRef" class="route-loading-meter">
            <img
              class="route-loading-meter-frame"
              :src="barBgUrl"
              alt=""
              @load="measureMeter"
            />
            <div
              class="route-loading-meter-clip"
              :class="{ indeterminate: phase === 'loading' }"
              :style="{ width: fillWidth }"
            >
              <img
                class="route-loading-meter-bar"
                :src="barUrl"
                alt=""
                :style="{ width: meterPx ? `${meterPx}px` : '100%' }"
                draggable="false"
              />
            </div>
          </div>
          <p class="route-loading-percent">{{ displayPercent }}%</p>
        </div>
        <p class="route-loading-foot">{{ currentFootTip }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

/** 与 `src/assets/imgs/home/` 下资源对应，由 Vite 打包 */
const bgUrl = new URL('../assets/imgs/bg.png', import.meta.url).href
const barBgUrl = new URL('../assets/imgs/bar_bg.png', import.meta.url).href
const barUrl = new URL('../assets/imgs/bar.png', import.meta.url).href

/** 从 0% 缓升到 99% 的时长（毫秒） */
const PROGRESS_MS = 5000

const phase = ref('progress')
const progress = ref(0)
const meterRef = ref(null)
const meterPx = ref(0)

/** 底部提示轮换间隔（毫秒） */
const FOOT_TIP_INTERVAL_MS = 3500

const FOOT_TIPS = [
  '正在建立星链网络连接，优化数据路径，提高交易速度',
  '正在同步节点状态，保障连接稳定',
  '正在优选多条链路，降低网络延迟',
  '正在加密传输通道，保护交易安全',
  '正在检测网络波动，智能切换线路',
  '正在校准服务器时钟，提升撮合精度',
]

const footTipIndex = ref(0)
const currentFootTip = computed(
  () => FOOT_TIPS[footTipIndex.value % FOOT_TIPS.length]
)

let footTimer = null
let raf = 0
let start = 0
let ro = null

const displayPercent = computed(() =>
  phase.value === 'loading' ? 99 : Math.min(99, Math.round(progress.value))
)

const fillWidth = computed(() => `${displayPercent.value}%`)

function measureMeter() {
  const el = meterRef.value
  if (!el) return
  meterPx.value = el.offsetWidth
}

function tick(now) {
  const elapsed = now - start
  if (elapsed >= PROGRESS_MS) {
    phase.value = 'loading'
    progress.value = 99
    return
  }
  const t = elapsed / PROGRESS_MS
  const eased = 1 - Math.pow(1 - t, 2)
  progress.value = eased * 99
  raf = requestAnimationFrame(tick)
}

onMounted(async () => {
  start = performance.now()
  raf = requestAnimationFrame(tick)

  await nextTick()
  measureMeter()
  if (typeof ResizeObserver !== 'undefined' && meterRef.value) {
    ro = new ResizeObserver(() => measureMeter())
    ro.observe(meterRef.value)
  }
  window.addEventListener('resize', measureMeter, { passive: true })

  footTimer = window.setInterval(() => {
    footTipIndex.value = (footTipIndex.value + 1) % FOOT_TIPS.length
  }, FOOT_TIP_INTERVAL_MS)
})

onUnmounted(() => {
  if (footTimer != null) {
    clearInterval(footTimer)
    footTimer = null
  }
  if (raf) cancelAnimationFrame(raf)
  window.removeEventListener('resize', measureMeter)
  if (ro) {
    ro.disconnect()
    ro = null
  }
})
</script>

<style scoped>
.route-loading {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  height: 100%;
  max-height: 100vh;
  max-height: 100dvh;
  min-height: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  overflow: hidden;
  overscroll-behavior: none;
  touch-action: none;
  color: #fff;
}

.route-loading-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-color: #050a14;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.route-loading-vignette {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(0, 8, 24, 0.35) 0%,
    transparent 28%,
    transparent 55%,
    rgba(0, 6, 18, 0.55) 100%
  );
}

.route-loading-stack {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: max(10px, env(safe-area-inset-top, 0px));
  padding-left: max(14px, env(safe-area-inset-left, 0px));
  padding-right: max(14px, env(safe-area-inset-right, 0px));
  padding-bottom: max(10px, env(safe-area-inset-bottom, 0px));
}

.route-loading-spacer {
  flex: 1 1 auto;
  min-height: 0;
}

.route-loading-bottom {
  flex: 0 0 auto;
  width: min(100%, 22rem);
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(10px, 2.6vmin, 16px);
  padding-bottom: clamp(8px, 2vmin, 16px);
}

.route-loading-status {
  margin: 0;
  text-align: center;
  font-size: clamp(14px, 3.8vw, 17px);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-shadow: 0 0 14px rgba(0, 200, 255, 0.35);
}

.route-loading-meter-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: min(92vw, 348px);
  max-width: 100%;
  gap: clamp(6px, 1.6vw, 10px);
}

.route-loading-meter {
  position: relative;
  flex: 1 1 auto;
  min-width: 0;
  width: 0;
  line-height: 0;
  isolation: isolate;
}

.route-loading-meter-frame {
  display: block;
  width: 100%;
  height: auto;
  user-select: none;
  pointer-events: none;
}

.route-loading-meter-clip {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  overflow: hidden;
  border-radius: inherit;
  transition: width 0.12s ease-out;
}

.route-loading-meter-clip.indeterminate::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.35),
    transparent
  );
  animation: route-shimmer 1.1s ease-in-out infinite;
}

.route-loading-meter-bar {
  display: block;
  height: 100%;
  width: 100%;
  max-width: none;
  object-fit: cover;
  object-position: left center;
  user-select: none;
  pointer-events: none;
}

.route-loading-foot {
  margin: 0;
  max-width: 100%;
  padding: 0 0.25rem;
  text-align: center;
  font-size: clamp(10px, 2.7vw, 12px);
  line-height: 1.55;
  color: rgba(200, 220, 240, 0.72);
  letter-spacing: 0.02em;
}

.route-loading-percent {
  flex: 0 0 auto;
  margin: 0;
  font-variant-numeric: tabular-nums;
  font-size: clamp(12px, 3.1vw, 15px);
  font-weight: 600;
  line-height: 1;
  letter-spacing: 0.02em;
  color: rgba(180, 225, 255, 0.55);
  text-shadow: 0 0 8px rgba(0, 180, 255, 0.2);
  white-space: nowrap;
}

@keyframes route-shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .route-loading-meter-clip.indeterminate::after {
    animation: none;
  }
}
</style>

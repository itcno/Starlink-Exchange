<template>
  <div class="marquee-box" ref="marqueeBoxRef" @mouseenter="pause" @mouseleave="play">
    <img :src="iconImg" alt="" class="icon" />

    <div class="marquee" ref="marqueeContainerRef">
      <div class="marquee-text" ref="marqueeTextRef" :style="textStyle" @animationend="onAnimationEnd">
        {{ currentMessage }}
      </div>
    </div>

    <div class="mail" >
      <img :src="mailIcon" alt="" class="mail-icon" />
      <span v-if="unread > 0" class="badge">{{ unread }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import iconImg from "@/assets/imgs/home/icon_dt_pmd.webp";
import mailIcon from "@/assets/imgs/home/Icon_Home_08.avif";

const router = useRouter();

const messages = [
  "欢迎进入游戏，祝您游戏愉快，赢钱多多！",
  "欢迎进入游戏，祝您游戏愉快，赢钱多多！",
  "欢迎进入游戏，祝您游戏愉快，赢钱多多！",
  "欢迎进入游戏，祝您游戏愉快，赢钱多多！",
];

const unread = ref(3);
const currentIndex = ref(0);
const marqueeBoxRef = ref(null);
const marqueeContainerRef = ref(null);
const marqueeTextRef = ref(null);
const containerWidth = ref(300);
const textWidth = ref(0);
const isPaused = ref(false);
const animPhase = ref('idle'); // 'idle' | 'enter' | 'scroll'

const currentMessage = computed(() => messages[currentIndex.value]);

// 计算动画样式
const textStyle = computed(() => {
  const width = containerWidth.value || 300;
  const tw = textWidth.value || 0;
  const scrollSpeed = 100; // 每秒滚动像素数

  // 弹入时间：固定 0.3 秒快速弹入
  const enterDuration = 0.5;

  // 滚动距离：文字完全滚出左边
  const scrollDuration = Math.max(tw / scrollSpeed, 2);

  if (animPhase.value === 'enter') {
    return {
      '--container-width': `${width}px`,
      animation: `marquee-enter ${enterDuration}s ease-out forwards`,
    };
  } else if (animPhase.value === 'scroll') {
    return {
      '--text-width': `${tw}px`,
      animation: `marquee-scroll ${scrollDuration}s linear forwards`,
    };
  } else {
    return {
      transform: `translateX(${width}px)`,
    };
  }
});

// 动画结束处理
const onAnimationEnd = (e) => {
  if (isPaused.value) return;

  if (animPhase.value === 'enter') {
    // 弹入完成，开始滚动
    animPhase.value = 'scroll';
  } else if (animPhase.value === 'scroll') {
    // 滚动完成，切换下一条
    currentIndex.value = (currentIndex.value + 1) % messages.length;
    animPhase.value = 'idle';

    // 等待 DOM 更新后重新开始动画
    nextTick(() => {
      measureTextWidth();
      startAnimation();
    });
  }
};

// 测量文本宽度
const measureTextWidth = () => {
  if (marqueeTextRef.value) {
    textWidth.value = marqueeTextRef.value.scrollWidth;
  }
};

// 测量容器宽度
const measureContainerWidth = () => {
  if (marqueeContainerRef.value) {
    containerWidth.value = marqueeContainerRef.value.offsetWidth;
  }
};

// 开始动画
const startAnimation = () => {
  if (isPaused.value) return;

  // 强制重排后开始动画
  if (marqueeTextRef.value) {
    marqueeTextRef.value.style.animation = 'none';
    void marqueeTextRef.value.offsetWidth;
  }
  animPhase.value = 'enter';
};

// 暂停
const pause = () => {
  isPaused.value = true;
  if (marqueeTextRef.value) {
    marqueeTextRef.value.style.animationPlayState = 'paused';
  }
};

// 继续
const play = () => {
  isPaused.value = false;
  if (marqueeTextRef.value) {
    marqueeTextRef.value.style.animationPlayState = 'running';
  }
};

const goMessage = () => router.push("/message");

onMounted(() => {
  measureContainerWidth();

  // 等待 DOM 渲染后测量文本宽度并开始动画
  nextTick(() => {
    measureTextWidth();
    startAnimation();
  });

  // 监听窗口大小变化
  const handleResize = () => {
    measureContainerWidth();
    measureTextWidth();
  };

  window.addEventListener('resize', handleResize);

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
  });
});
</script>

<style scoped>
.marquee-box {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  user-select: none;
  position: relative;
  overflow: hidden;
}

.icon {
  margin-right: 4px;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.marquee {
  flex: 1;
  height: 24px;
  overflow: hidden;
  position: relative;
}

.marquee-text {
  position: absolute;
  white-space: nowrap;
  line-height: 24px;
  font-size: clamp(12px, 3.2vw, 14px);
  color: #757575;
  top: 0;
  left: 0;
  /* GPU 加速和文字渲染优化 */
  will-change: transform;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  backface-visibility: hidden;
}

.mail {
  position: relative;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.mail-icon {
  width: 28px;
  height: 24px;
  object-fit: contain;
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: red;
  color: white;
  border-radius: 50%;
  padding: 2px 5px;
  font-size: 10px;
  user-select: none;
}
</style>

<style>
/* 弹入动画 - 从右侧快速弹入到左边缘 */
@keyframes marquee-enter {
  0% {
    transform: translateX(var(--container-width, 300px));
  }

  100% {
    transform: translateX(0);
  }
}

/* 滚动动画 - 从左边缘匀速滚动到完全消失 */
@keyframes marquee-scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-1 * var(--text-width, 300px)));
  }
}
</style>
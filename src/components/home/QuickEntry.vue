<template>
  <div class="quick-entry" :class="{ dragging: isDragging }" ref="scrollRef" @mousedown="onMouseDown"
    @mouseup="onMouseUp" @mousemove="onMouseMove">
    <div class="scroll">
      <div v-for="item in list" :key="item.id" class="entry-item">
        <img :src="images[item.icon]" alt="" draggable="false" />
        <p :style="{ background: item.bgcolor }">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue';
import icon1 from '@/assets/imgs/home/Icon_Home1.avif';
import icon2 from '@/assets/imgs/home/Icon_Home2.avif';
import icon3 from '@/assets/imgs/home/Icon_Home3.avif';
import icon4 from '@/assets/imgs/home/Icon_Home4.avif';
import icon5 from '@/assets/imgs/home/Icon_Home5.avif';
import icon6 from '@/assets/imgs/home/icon_rwzx1.avif';
import icon7 from '@/assets/imgs/home/icon_xrfl1.avif';
import icon8 from '@/assets/imgs/home/icon_ssfs1.avif';


const images = {
  icon1: icon1,
  icon2: icon2,
  icon3: icon3,
  icon4: icon4,
  icon5: icon5,
  icon6: icon6,
  icon7: icon7,
  icon8: icon8,
};

const list = [
  { id: 1, name: "任务中心", icon: "icon1", bgcolor: "#FF6B6B" },
  { id: 2, name: "龙虎榜", icon: "icon2", bgcolor: "#4ECDC4" },
  { id: 3, name: "每日捕鳄", icon: "icon3", bgcolor: "#45B7D1" },
  { id: 4, name: "实时返水", icon: "icon4", bgcolor: "#FFA07A" },
  { id: 5, name: "红包雨", icon: "icon5", bgcolor: "#98D8C8" },
  { id: 6, name: "分享赚钱", icon: "icon6", bgcolor: "#F7DC6F" },
  { id: 7, name: "VIP", icon: "icon7", bgcolor: "#BB8FCE" },
  { id: 8, name: "神秘彩金", icon: "icon8", bgcolor: "#85C1E2" },
];

const scrollRef = ref(null);
const isDragging = ref(false);
let startX = 0;
let scrollLeft = 0;

const addDocListeners = () => {
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
  window.addEventListener('blur', stopDrag);
};

const removeDocListeners = () => {
  window.removeEventListener('mousemove', onMouseMove);
  window.removeEventListener('mouseup', onMouseUp);
  window.removeEventListener('blur', stopDrag);
};

const onMouseDown = (e) => {
  if (!scrollRef.value) return;
  isDragging.value = true;
  startX = e.pageX;
  scrollLeft = scrollRef.value.scrollLeft;
  addDocListeners();
};

const stopDrag = () => {
  isDragging.value = false;
  removeDocListeners();
};

const onMouseUp = () => stopDrag();
const onMouseMove = (e) => {
  if (!isDragging.value || !scrollRef.value) return;
  e.preventDefault();
  const walk = e.pageX - startX;
  scrollRef.value.scrollLeft = scrollLeft - walk;
};

onBeforeUnmount(() => {
  removeDocListeners();
});
</script>

<style scoped lang="scss">
.quick-entry {
  width: 100%;
  height: clamp(66px, 18vw, 90px);
  overflow-x: auto;
  overflow-y: hidden;
  display: flex; // 让 quick-entry 成为 flex 容器
  align-items: center; // 垂直居中内容
  padding: 0 clamp(10px, 3vw, 16px); // 添加左右内边距
  box-sizing: border-box;
  user-select: none;
  -webkit-user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: pan-x;
  cursor: grab;

  /* 隐藏滚动条（各浏览器兼容） */
  -ms-overflow-style: none;
  /* IE、Edge */
  scrollbar-width: none;
  /* Firefox */

  &::-webkit-scrollbar {
    display: none;
    /* Chrome、Safari */
  }


  .scroll {
    display: flex;
    flex-wrap: nowrap;
    scroll-behavior: smooth;
    width: max-content; // 确保内容能撑开滚动
  }

  .entry-item {
    position: relative;
    width: clamp(60px, 16vw, 84px);
    flex-shrink: 0; // 防止被压缩
    text-align: center;

    display: flex;
    align-items: center;
    /* 垂直居中 */
    justify-content: center;
    /* 水平居中 */
  }

  &:active {
    cursor: grabbing;
  }

  &.dragging {
    cursor: grabbing;
  }

  .entry-item img {
    width: clamp(60px, 16vw, 80px);
    height: auto;
    aspect-ratio: 53/54;
    display: block;
    object-fit: contain;
    -webkit-user-drag: none;
    user-select: none;
    -webkit-user-select: none;
  }

  .entry-item p {
    width: clamp(51px, 13.6vw, 66px);
    height: clamp(15px, 4vw, 18px);
    position: absolute;
    bottom: 5px;
    font-size: clamp(10.5px, 2.8vw, 13px);
    color: #fff;
    word-break: break-word;
    border-radius: clamp(6px, 2vw, 10px);
    margin: 0;
    padding: 0;
    display: grid;
    place-items: center;
  }
}
</style>

<template>
  <Teleport to="body">
    <div v-if="modelValue" ref="menuRef" class="more-menu" :style="menuStyle">
      <div class="menu-grid">
        <div v-for="item in menuItems" :key="item.id" class="menu-item" @click="handleClick(item)">
          <van-icon :name="item.icon" :color="item.color" class="menu-icon" />
          <span>{{ item.label }}</span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick, onBeforeUnmount } from 'vue';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  triggerRect: { type: Object, default: () => ({}) }
});

const emit = defineEmits(["update:modelValue"]);

const menuRef = ref(null);
const menuTop = ref(null);
const menuRight = ref(null);

const menuItems = [
  { id: 1, label: '存款', icon: 'card', color: '#333' },
  { id: 2, label: '提款', icon: 'shop', color: '#333' },
  { id: 3, label: '红利', icon: 'gift', color: '#333' },
  { id: 4, label: '活动', icon: 'fire', color: '#333' },
  { id: 5, label: '排行', icon: 'cluster', color: '#333' },
  { id: 6, label: '账户', icon: 'contact', color: '#333' },
  { id: 7, label: '设置', icon: 'setting', color: '#333' },
  { id: 8, label: '帮助', icon: 'question', color: '#333' },
  { id: 9, label: '反馈', icon: 'comment', color: '#333' },
  { id: 10, label: '分享', icon: 'share', color: '#333' },
  { id: 11, label: '邀请', icon: 'manager', color: '#333' },
  { id: 12, label: '任务', icon: 'label', color: '#333' },
  { id: 13, label: '消息', icon: 'chat', color: '#333' },
  { id: 14, label: '直播', icon: 'video', color: '#333' },
  { id: 15, label: '签到', icon: 'eye', color: '#333' },
  { id: 16, label: '游戏', icon: 'play', color: '#333' },
  { id: 17, label: '充值', icon: 'shopping-cart', color: '#333' },
  { id: 18, label: '提现', icon: 'bag', color: '#333' },
  { id: 19, label: '转账', icon: 'exchange', color: '#333' },
  { id: 20, label: '我的', icon: 'new', color: '#333' }
];

let rafId = null;

function scheduleRecalc() {
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    recalcPosition();
  });
}

const recalcPosition = async () => {
  await nextTick();
  const rect = props.triggerRect || {};
  const padding = 8;

  // 弹窗在触发按钮下方
  // 使用 absolute 定位，需要加上页面滚动高度，使其相对于文档定位
  let top = (rect.bottom != null) ? (rect.bottom + 8 + window.scrollY) : (60 + window.scrollY);

  // 始终向下展开，移除向上翻转逻辑
  /*
  // 如果下方空间不足，显示在上方
  const el = menuRef.value;
  if (el && rect.top != null) {
    const menuH = el.offsetHeight;
    if ((top + menuH + padding) > viewportH) {
      top = rect.top - menuH - 8;
      if (top < padding) top = padding;
    }
  }
  */

  // 右对齐：弹窗右边贴紧触发按钮的右边
  // 使用 window.innerWidth - rect.right 计算出距离屏幕右侧的距离
  let right = padding;
  if (rect.right != null) {
    right = window.innerWidth - rect.right;
  }

  menuTop.value = Math.round(top);
  menuRight.value = Math.round(right);
};

function close() {
  emit('update:modelValue', false);
}

function handleClick(item) {
  emit('update:modelValue', false);
}

const handleClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    close();
  }
};

watch(() => props.modelValue, (open) => {
  if (open) {
    scheduleRecalc();
    // 移除 scroll 监听，确保位置固定不随页面滚动更新
    window.addEventListener('resize', scheduleRecalc, { passive: true });
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside);
    }, 0);
  } else {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
    window.removeEventListener('resize', scheduleRecalc);
    document.removeEventListener('click', handleClickOutside);
    menuTop.value = null;
    menuRight.value = null;
  }
});

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId);
  window.removeEventListener('resize', scheduleRecalc);
  document.removeEventListener('click', handleClickOutside);
});

const menuStyle = computed(() => {
  const base = {
    position: 'absolute',
    zIndex: 999
  };
  if (menuTop.value != null) base.top = `${menuTop.value}px`;
  if (menuRight.value != null) base.right = `${menuRight.value}px`;
  return base;
});
</script>

<style scoped>
.more-menu {
  background: #fff;
  border-radius: clamp(8px, 2vw, 12px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  padding: clamp(12px, 3vw, 20px);
  box-sizing: border-box;
  animation: fadeSlideDown 160ms ease-out;
  width: max-content;
  min-width: 300px;
  max-width: 94vw;
  z-index: 2000;
}

@keyframes fadeSlideDown {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(50px, 1fr));
  gap: clamp(10px, 2.5vw, 20px);
}

@media (max-width: 480px) {
  .menu-grid {
    grid-template-columns: repeat(5, minmax(45px, 1fr));
  }
}

@media (max-width: 360px) {
  .menu-grid {
    grid-template-columns: repeat(4, minmax(50px, 1fr));
  }
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: clamp(6px, 1.5vw, 10px);
  padding: clamp(8px, 2vw, 12px) clamp(4px, 1.5vw, 8px);
  border-radius: clamp(8px, 1.5vw, 12px);
  cursor: pointer;
  min-width: 0;
}

.menu-item:hover {
  background: #fafafa;
}

.menu-icon {
  font-size: clamp(28px, 5.5vw, 40px) !important;
}

.menu-item span {
  font-size: clamp(12px, 2.5vw, 14px);
  color: #999;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}
</style>

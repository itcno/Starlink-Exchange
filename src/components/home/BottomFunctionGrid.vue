<template>
  <div class="bottom-grid">
    <div v-for="category in categories" :key="category.id" class="column">
      <div class="column-title">{{ category.title }}</div>
      <div class="button-group">
        <button v-for="btn in category.buttons" :key="btn.id" class="text-btn">
          {{ btn.text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const categories = [
  {
    id: 1,
    title: '娱乐城',
    buttons: [
      { id: 1, text: '任务' },
      { id: 2, text: 'VIP' },
      { id: 3, text: '分享赚钱' },
      { id: 4, text: '活动' },
      { id: 5, text: '返水' },
    ]
  },
  {
    id: 2,
    title: '游戏',
    buttons: [
      { id: 1, text: '热门' },
      { id: 2, text: '电子' },
      { id: 3, text: '捕鱼' },
      { id: 4, text: '真人' },
      { id: 5, text: '棋牌' },
      { id: 6, text: '体育' },
      { id: 7, text: '彩票' },
      { id: 8, text: '斗鸡' },
      { id: 9, text: '区块链' },
    ]
  },
  {
    id: 3,
    title: '支持',
    buttons: [
      { id: 1, text: '帮助中心' },
    ]
  }
];
</script>

<style scoped>
.bottom-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(8px, 2vw, 16px) clamp(12px, 3vw, 20px);
  background: #f8f8f8;
  padding: clamp(10px, 3vw, 18px) clamp(12px, 4vw, 24px);
}

.column {
  padding: 0 clamp(4px, 1vw, 10px);
}

.column-title {
  font-size: clamp(13px, 3.4vw, 18px);
  color: #999999;
  margin-bottom: 10px;
}

.button-group {
  display: grid;
  grid-auto-rows: minmax(18px, auto);
  gap: clamp(6px, 1.4vw, 10px);
}

.text-btn {
  padding: 0;
  background: none;
  border: none;
  font-size: clamp(12px, 3vw, 16px);
  color: #666;
  cursor: pointer;
  text-align: left;
  transition: color 0.2s ease;
}

/* .text-btn:hover {
  color: #ff6b00;
} */
</style>

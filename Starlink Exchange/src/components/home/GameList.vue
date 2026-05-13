<template>
  <div class="game-list" ref="gameListRef">

    <!-- 左侧分类栏 -->
    <div class="category-bar" ref="categoryBarRef">
      <div v-for="c in categories" :key="c.id" class="category-item" :class="{ active: c.id === activeCat }"
        @click="scrollTo(c.id)">
        <img :src="c.icon" :alt="c.name" class="category-icon" />
        <span>{{ c.name }}</span>
      </div>
    </div>

    <!-- 右侧内容 -->
    <div class="content">

      <!-- tab -->
      <div class="tabs">
        <span v-for="t in tabs" :key="t.key" :class="{ active: t.key === activeTab }" @click="activeTab = t.key">
          {{ t.name }}
        </span>
      </div>

      <!-- 游戏内容 -->
      <div class="game-content" ref="contentRef">
        <div v-for="c in categories" :key="c.id" :ref="el => catRefs[c.id] = el" class="group">
          <div class="group-title" v-if="c.id !== 1">
            <span class="group-title-left">
              <img :src="c.icon" :alt="c.name" class="group-icon" />
              {{ c.id === 1 ? firstGroupTitle : `${c.name}游戏` }}
            </span>
            <button class="group-title-btn">全部</button>
          </div>

          <div v-if="c.id === 1" class="grid-wrap" :style="{ height: trackHeight }">
            <div class="grid-track" :style="trackStyle">
              <div v-for="tab in tabs" :key="tab.key" class="grid-slide" :ref="el => tabRefs[tab.key] = el">
                <div class="grid">
                  <div v-if="getGamesForTab(tab.key).length === 0" class="empty-state">
                    <div class="empty-icon" />
                    <p>暂无游戏</p>
                  </div>
                  <div v-else v-for="g in displayedGamesForTab(tab.key)" :key="g.id" class="game-item">
                    <img :src="g.icon" />
                    <p>{{ g.name }}</p>
                  </div>
                </div>

                <template v-if="hasMoreForTab(tab.key)">
                  <p class="game-info">
                    正在显示 {{ displayedGamesForTab(tab.key).length }} 款游戏中的 {{ getGamesForTab(tab.key).length }} 款
                  </p>
                  <button class="more-btn" @click="loadMoreForTab(tab.key)">加载更多
                    <svg width="10px" height="10px" fill="currentColor" class=""
                      style="width: inherit; height: inherit;" viewBox="0 0 11.996 12.008">
                      <path id="7b5aba40a3ed19db01202235ccc10e36-comm_icon_jzgd"
                        d="M18645,17402a.534.534,0,0,1-.389-.141l-5.473-5.65a.5.5,0,0,1,0-.691.453.453,0,0,1,.67,0l5.191,5.34,5.182-5.34a.451.451,0,0,1,.668,0,.485.485,0,0,1,0,.691l-5.467,5.65a.549.549,0,0,1-.354.141Zm0-5.373a.479.479,0,0,1-.389-.15l-5.473-5.641a.5.5,0,0,1,0-.7.463.463,0,0,1,.67,0l5.191,5.34,5.182-5.34a.46.46,0,0,1,.668,0,.492.492,0,0,1,0,.7l-5.467,5.641a.489.489,0,0,1-.342.152Z"
                        transform="translate(-18639 -17389.996)"></path>
                    </svg></button>
                </template>
                <p v-else-if="shouldShowDoneForTab(tab.key)" class="game-info done">加载完成</p>
              </div>
            </div>
          </div>
          <div v-else class="grid">
            <div v-if="displayedGames(c).length === 0" class="empty-state">
              <div class="empty-icon" />
              <p>暂无游戏</p>
            </div>
            <div v-else v-for="g in displayedGames(c)" :key="g.id" class="game-item">
              <img :src="g.icon" />
              <p>{{ g.name }}</p>
            </div>
          </div>

          <template v-if="c.id !== 1 && hasMore(c)">
            <p class="game-info">
              正在显示 {{ displayedGames(c).length }} 款游戏中的 {{ getGamesForCategory(c).length }} 款
            </p>
            <button class="more-btn" @click="loadMore(c)">加载更多
              <svg width="10px" height="10px" fill="currentColor" class="" style="width: inherit; height: inherit;"
                viewBox="0 0 11.996 12.008">
                <path id="7b5aba40a3ed19db01202235ccc10e36-comm_icon_jzgd"
                  d="M18645,17402a.534.534,0,0,1-.389-.141l-5.473-5.65a.5.5,0,0,1,0-.691.453.453,0,0,1,.67,0l5.191,5.34,5.182-5.34a.451.451,0,0,1,.668,0,.485.485,0,0,1,0,.691l-5.467,5.65a.549.549,0,0,1-.354.141Zm0-5.373a.479.479,0,0,1-.389-.15l-5.473-5.641a.5.5,0,0,1,0-.7.463.463,0,0,1,.67,0l5.191,5.34,5.182-5.34a.46.46,0,0,1,.668,0,.492.492,0,0,1,0,.7l-5.467,5.641a.489.489,0,0,1-.342.152Z"
                  transform="translate(-18639 -17389.996)"></path>
              </svg></button>
          </template>
          <p v-else-if="c.id !== 1 && shouldShowDone(c)" class="game-info done">加载完成</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import defaultIcon from "@/assets/imgs/home/default.avif";
import defaultIcon98 from "@/assets/imgs/home/imgi_98_default.avif";
import defaultIcon102 from "@/assets/imgs/home/imgi_102_default.avif";
import defaultIcon103 from "@/assets/imgs/home/imgi_103_default.avif";
import defaultIcon104 from "@/assets/imgs/home/imgi_104_default.avif";
import defaultIcon106 from "@/assets/imgs/home/imgi_106_default.avif";
import defaultIcon110 from "@/assets/imgs/home/imgi_110_default.avif";
import defaultIcon111 from "@/assets/imgs/home/imgi_111_default.avif";
import defaultIcon112 from "@/assets/imgs/home/imgi_112_default.avif";
import defaultIcon113 from "@/assets/imgs/home/imgi_113_default.avif";

import categoryIcon32 from "@/assets/imgs/home/Icon_Home_32.avif";
import categoryIcon33 from "@/assets/imgs/home/Icon_Home_33.avif";
import categoryIcon34 from "@/assets/imgs/home/Icon_Home_34.avif";
import categoryIcon35 from "@/assets/imgs/home/Icon_Home_35.avif";
import categoryIcon36 from "@/assets/imgs/home/Icon_Home_36.avif";
import categoryIcon49 from "@/assets/imgs/home/Icon_Home_49.avif";
import categoryIcon50 from "@/assets/imgs/home/Icon_Home_50.avif";
import categoryIcon51 from "@/assets/imgs/home/Icon_Home_51.avif";
import categoryIcon52 from "@/assets/imgs/home/Icon_Home_52.avif";


const activeCat = ref(1);
const activeTab = ref("hot");
const prevTab = ref("hot");
const swipeDir = ref(1); // 1 表示向左滑（新内容从右入），-1 表示向右滑
const gameListRef = ref(null);
const categoryBarRef = ref(null);
const hasTabbed = ref(false);
const INITIAL_VISIBLE = 9;
const LOAD_STEP = 9;
const visibleCounts = reactive({});
const tabVisibleCounts = reactive({
  hot: INITIAL_VISIBLE,
  recent: INITIAL_VISIBLE,
  fav: INITIAL_VISIBLE
});
const tabRefs = reactive({});
const trackHeight = ref('auto');
let resizeObserver = null;

const tabs = [
  { key: "hot", name: "热门" },
  { key: "recent", name: "最近" },
  { key: "fav", name: "收藏" },
];

const hotGames = [
  { id: 101, name: "麻将胡了", icon: defaultIcon98 },
  { id: 102, name: "彩金狂欢", icon: defaultIcon102 },
  { id: 103, name: "麻将胡了2", icon: defaultIcon103 },
  { id: 104, name: "艺伎之刃", icon: defaultIcon104 },
  { id: 105, name: "炸金花", icon: defaultIcon106 },
  { id: 106, name: "龙虎斗", icon: defaultIcon110 },
  { id: 107, name: "捕鱼大亨", icon: defaultIcon111 },
  { id: 108, name: "疯狂老鼠", icon: defaultIcon112 },
  { id: 109, name: "幸运转盘", icon: defaultIcon113 },
  { id: 110, name: "彩金狂欢", icon: defaultIcon },
  { id: 111, name: "水果机", icon: defaultIcon },
  { id: 112, name: "百家乐", icon: defaultIcon },
  { id: 113, name: "炸金花", icon: defaultIcon },
  { id: 114, name: "龙虎斗", icon: defaultIcon },
  { id: 115, name: "捕鱼大亨", icon: defaultIcon },
  { id: 116, name: "疯狂老鼠", icon: defaultIcon },
  { id: 117, name: "幸运转盘", icon: defaultIcon },
  { id: 118, name: "彩金狂欢", icon: defaultIcon },
  { id: 119, name: "水果机", icon: defaultIcon98 },
  { id: 120, name: "百家乐", icon: defaultIcon102 },
  { id: 121, name: "炸金花", icon: defaultIcon103 },
  { id: 122, name: "龙虎斗", icon: defaultIcon104 },
  { id: 123, name: "捕鱼大亨", icon: defaultIcon106 },
  { id: 124, name: "疯狂老鼠", icon: defaultIcon112 },
  { id: 125, name: "幸运转盘", icon: defaultIcon113 },
  { id: 126, name: "彩金狂欢", icon: defaultIcon },
  { id: 127, name: "水果机", icon: defaultIcon103 },
  { id: 128, name: "百家乐", icon: defaultIcon102 },
  { id: 129, name: "炸金花", icon: defaultIcon103 },
  { id: 130, name: "龙虎斗", icon: defaultIcon104 },
  { id: 131, name: "捕鱼大亨", icon: defaultIcon106 },
  { id: 132, name: "疯狂老鼠", icon: defaultIcon112 },
];

const recentGames = [
  { id: 201, name: "玫瑰爱情", icon: defaultIcon },
  { id: 202, name: "欢乐捕鱼", icon: defaultIcon },
];

const favGames = [
];

const categories = reactive([
  {
    id: 1,
    name: "热门",
    icon: categoryIcon32,
    games: hotGames
  },
  {
    id: 2,
    name: "电子",
    icon: categoryIcon33,
    games: [
      { id: 201, name: "麻将胡了", icon: defaultIcon98 },
      { id: 202, name: "赏金女王", icon: defaultIcon102 },
      { id: 203, name: "麻将胡了2", icon: defaultIcon103 },
      { id: 204, name: "艺伎之刃", icon: defaultIcon104 },
      { id: 205, name: "魔法森林", icon: defaultIcon106 },
      { id: 206, name: "拳击玫瑰", icon: defaultIcon110 },
      { id: 207, name: "热带风暴", icon: defaultIcon111 },
      { id: 208, name: "金牌杂技", icon: defaultIcon112 },
    ]
  },
  {
    id: 3,
    name: "捕鱼",
    icon: categoryIcon35,
    games: [
      { id: 301, name: "爆爆鱼", icon: defaultIcon102 },
      { id: 302, name: "金币捕鱼", icon: defaultIcon103 },
      { id: 303, name: "龙王捕鱼", icon: defaultIcon104 },
      { id: 304, name: "深海捕鱼", icon: defaultIcon106 },
      { id: 305, name: "炮台捕鱼", icon: defaultIcon110 },
      { id: 306, name: "欢乐捕鱼", icon: defaultIcon111 },
      { id: 307, name: "千炮捕鱼", icon: defaultIcon112 },
      { id: 308, name: "牛魔王捕鱼", icon: defaultIcon113 },
    ]
  },
  {
    id: 4,
    name: "真人",
    icon: categoryIcon34,
    games: [
      { id: 401, name: "真人百家乐", icon: defaultIcon102 },
      { id: 402, name: "真人龙虎", icon: defaultIcon103 },
      { id: 403, name: "真人轮盘", icon: defaultIcon104 },
      { id: 404, name: "真人骰宝", icon: defaultIcon106 },
      { id: 405, name: "真人牌九", icon: defaultIcon110 },
      { id: 406, name: "真人二八杠", icon: defaultIcon111 },
      { id: 407, name: "真人斗牛", icon: defaultIcon112 },
      { id: 408, name: "真人三公", icon: defaultIcon113 },
    ]
  },
  {
    id: 5,
    name: "棋牌",
    icon: categoryIcon36,
    games: [
      { id: 501, name: "赏金女王", icon: defaultIcon102 },
      { id: 502, name: "麻将胡了2", icon: defaultIcon103 },
      { id: 503, name: "艺伎之刃", icon: defaultIcon104 },
      { id: 504, name: "象棋", icon: defaultIcon106 },
      { id: 505, name: "宝藏大冒险", icon: defaultIcon111 },
      { id: 506, name: "狂暴少女", icon: defaultIcon112 },
      { id: 507, name: "斗地主", icon: defaultIcon113 },
      { id: 508, name: "麻将胡了", icon: defaultIcon98 },
    ]
  },
  {
    id: 6,
    name: "体育",
    icon: categoryIcon49,
    games: [
      { id: 501, name: "麻将胡了", icon: defaultIcon98 },
      { id: 502, name: "宝藏大冒险", icon: defaultIcon111 },
    ]
  },
  {
    id: 7,
    name: "彩票",
    icon: categoryIcon51,
    games: [
      { id: 501, name: "赏金女王", icon: defaultIcon102 },
      { id: 502, name: "麻将胡了2", icon: defaultIcon103 },
    ]
  },
  {
    id: 8,
    name: "斗鸡",
    icon: categoryIcon50,
    games: [
      { id: 504, name: "象棋", icon: defaultIcon106 },
      { id: 505, name: "围棋", icon: defaultIcon111 },
    ]
  },
  {
    id: 9,
    name: "区块链",
    icon: categoryIcon52,
    games: [
      { id: 504, name: "象棋", icon: defaultIcon113 },
      { id: 505, name: "围棋", icon: defaultIcon98 },
    ]
  }
]);

const tabNameMap = {
  hot: "热门",
  recent: "最近",
  fav: "收藏",
};

const firstGroupTitle = computed(() => `${tabNameMap[activeTab.value] || "热门"}游戏`);

const tabOrder = ["hot", "recent", "fav"];

const trackStyle = computed(() => {
  const index = tabOrder.indexOf(activeTab.value);
  return {
    transform: `translate3d(${-index * 33.33}%, 0, 0)`
  };
});

const contentRef = ref();
const catRefs = reactive({});

const getGamesForCategory = (c) => c.games;

const getGamesForTab = (key) => {
  if (key === "recent") return recentGames;
  if (key === "fav") return favGames;
  return hotGames;
};

const getVisibleCount = (c) => visibleCounts[c.id] ?? INITIAL_VISIBLE;

const displayedGames = (c) => getGamesForCategory(c).slice(0, getVisibleCount(c));

const displayedGamesForTab = (key) => getGamesForTab(key).slice(0, tabVisibleCounts[key]);

const hasMore = (c) => getVisibleCount(c) < getGamesForCategory(c).length;

const hasMoreForTab = (key) => tabVisibleCounts[key] < getGamesForTab(key).length;

const shouldShowDone = (c) => !hasMore(c) && getGamesForCategory(c).length > INITIAL_VISIBLE;

const shouldShowDoneForTab = (key) => !hasMoreForTab(key) && getGamesForTab(key).length > INITIAL_VISIBLE;

const loadMore = (c) => {
  const total = getGamesForCategory(c).length;
  visibleCounts[c.id] = Math.min(total, getVisibleCount(c) + LOAD_STEP);
};

const loadMoreForTab = (key) => {
  // const total = getGamesForTab(key).length;
  // tabVisibleCounts[key] = Math.min(total, tabVisibleCounts[key] + LOAD_STEP);
  // updateHeight();
};

const resetVisibleCounts = () => {
  categories.forEach((c) => {
    const total = getGamesForCategory(c).length;
    visibleCounts[c.id] = Math.min(total, INITIAL_VISIBLE);
  });
  // 重置 Tab 的可见数量
  Object.keys(tabVisibleCounts).forEach(key => {
    tabVisibleCounts[key] = INITIAL_VISIBLE;
  });
};

const updateHeight = () => {
  nextTick(() => {
    const el = tabRefs[activeTab.value];
    if (el) {
      trackHeight.value = `${el.offsetHeight}px`;
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver.observe(el);
      }
    }
  });
};

// 点击左侧分类 → 滚动到右侧对应内容
const scrollTo = (id) => {
  activeCat.value = id;
  const dom = catRefs[id];
  if (dom) {
    const stickyHeader = document.querySelector('.sticky-header');
    const headerHeight = stickyHeader ? stickyHeader.offsetHeight : 0;
    // 额外往下走一点，避免贴得太紧
    const extraPadding = 0;
    const offset = headerHeight + extraPadding;

    const elementPosition = dom.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
};

watch(activeTab, () => {
  updateHeight();
});

// 动态调整分类栏位置：视窗内不浮动，仅在将被遮挡时浮动
const handleScroll = () => {
  if (!gameListRef.value || !categoryBarRef.value) return;

  const stickyHeader = document.querySelector('.sticky-header');
  const headerHeight = stickyHeader ? stickyHeader.offsetHeight : 0;

  const contentElem = gameListRef.value.querySelector(".content");
  const gameListRect = gameListRef.value.getBoundingClientRect();
  const barHeight = categoryBarRef.value.offsetHeight;

  const gameListTop = gameListRect.top;

  // 视窗内：不浮动
  if (gameListTop >= headerHeight) {
    categoryBarRef.value.style.position = "relative";
    categoryBarRef.value.style.top = "auto";
    categoryBarRef.value.classList.remove("floating");
    if (contentElem) contentElem.classList.remove("floating");
    return;
  }

  // 将被遮挡：切换为 fixed，顶部保持 headerHeight，直到底部边界
  categoryBarRef.value.style.position = "fixed";
  categoryBarRef.value.classList.add("floating");
  if (contentElem) contentElem.classList.add("floating");

  const bottomLimit = gameListRect.bottom - barHeight;
  const targetTop = Math.min(headerHeight, bottomLimit); // 常态 headerHeight，接近底部时上推
  categoryBarRef.value.style.top = `${targetTop}px`;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  // 初始状态：相对定位（不浮动）
  if (categoryBarRef.value) {
    categoryBarRef.value.style.position = "relative";
    categoryBarRef.value.classList.remove("floating");
  }
  resetVisibleCounts();

  resizeObserver = new ResizeObserver(() => {
    const el = tabRefs[activeTab.value];
    if (el) {
      trackHeight.value = `${el.offsetHeight}px`;
    }
  });

  updateHeight();
}); onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  if (resizeObserver) resizeObserver.disconnect();
});
</script>

<style scoped>
.game-list {
  --bar-width: clamp(78px, 22vw, 108px);
  display: flex;
  margin-top: 12px;
  position: relative;
}

.category-bar {
  width: var(--bar-width);
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 50;
  flex-shrink: 0;
  position: relative;
  padding: 0 6px;
  box-sizing: border-box;
}

.category-bar.floating {
  position: fixed;
}

.category-item {
  width: 100%;
  min-height: clamp(35px, 9vw, 49px);
  font-size: clamp(12px, 2.8vw, 16px);
  color: #9C9C9B;
  cursor: pointer;
  text-align: center;
  border-left: 3px solid transparent;
  transition: all 0.3s ease;
  border: 0.1px solid #f0f0f0;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
  margin: clamp(10px, 3vw, 14px) 0;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  justify-content: center;
  box-sizing: border-box;
}

.category-icon {
  width: clamp(25px, 5vw, 35px);
  height: clamp(20px, 5vw, 25px);
  object-fit: contain;
}

/* .category-item:hover {
  background: #2a2929c4;
  color: #D1AE52;
} */

.category-item.active {
  background: linear-gradient(to bottom, #8d8a7f, #191816);
  color: #D1AE52;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content.floating {
  margin-left: var(--bar-width);
  width: calc(100% - var(--bar-width));
}

.tabs {
  position: sticky;
  top: 0;
  display: flex;
  padding: 12px 16px;
  justify-content: space-evenly;
  border-bottom: 1px solid #f0f0f0;
  gap: 34px;
  z-index: 10;
}

.tabs span {
  font-size: clamp(14px, 3.5vw, 18px);
  color: #333;
  cursor: pointer;
  transition: color 0.3s ease;
  position: relative;
}

/* .tabs span:hover {
  color: #666;
} */

.tabs .active {
  color: #FFAA09;
}

.tabs .active::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 0;
  right: 0;
  height: 3px;
  background: #FFAA09;
  border-radius: 1px;
}

.game-content {
  flex: 1;
  overflow-y: auto;
}

.group {
  padding: 10px 0 10px;
  border-bottom: 1px solid #f0f0f0;
}

.group-title {
  font-size: clamp(16px, 3.5vw, 18px);
  color: #000000;
  margin: 0 8px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.group-title-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.group-title-btn {
  border: none;
  background: none;
  color: #999;
  font-size: clamp(14px, 3vw, 16px);
  cursor: pointer;
  padding: 0;
  transition: opacity 0.3s ease;
}

.group-title-btn:active {
  opacity: 0.7;
}

.group-icon {
  width: clamp(26px, 5vw, 36px);
  height: clamp(20px, 3vw, 28px);
  object-fit: contain;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(6px, 2vw, 10px);
  padding: 0 clamp(2px, 1.5vw, 6px);
}

.empty-state {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 22px 12px;
  /* gap: 10px; */
  color: #999;
  font-size: 13px;
}

.empty-icon {
  width: clamp(60px, 20vw, 72px);
  height: clamp(60px, 20vw, 72px);
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Cg fill='none' stroke='%23d0d0d0' stroke-width='4' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='14' y='20' width='68' height='52' rx='8' ry='8'/%3E%3Cpath d='M14 32h68M32 44h16M32 56h32'/%3E%3Ccircle cx='72' cy='52' r='4'/%3E%3C/g%3E%3C/svg%3E") center/contain no-repeat;
  opacity: 0.85;
}

.grid-wrap {
  position: relative;
  overflow: hidden;
  transition: height 0.3s ease;
}

.grid-track {
  display: flex;
  width: 300%;
  transition: transform 0.3s ease;
  align-items: flex-start;
}

.grid-slide {
  width: 33.33%;
  flex-shrink: 0;
}

.game-info {
  font-size: clamp(12px, 3vw, 14px);
  color: #999999;
  text-align: center;
  margin: clamp(8px, 2vw, 10px) 0 0;
}

.game-info.done {
  color: #666666;
}

.game-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  transition: transform 0.2s ease;
  position: relative;
}

/* .game-item:hover {
  transform: translateY(-2px);
} */

.game-item img {
  width: 100%;
  height: auto;
  max-width: clamp(90px, 30vw, 120px);
  max-height: clamp(120px, 40vw, 160px);
  object-fit: cover;
  border-radius: 8px;
  background: #f5f5f5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.2s ease;
}

.game-item:hover img {
  box-shadow: 0 4px 12px rgba(255, 107, 0, 0.15);
}

.game-item p {
  position: absolute;
  bottom: -6px;
  font-size: clamp(10px, 2.6vw, 13px);
  color: #fff;
  text-align: center;
  word-break: break-word;
  line-height: 1.3;
  width: 100%;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.more-btn {
  display: block;
  width: fit-content;
  margin: 0 auto;
  padding-top: clamp(6px, 1.5vw, 8px);
  border: none;
  background: none;
  color: #666666;
  font-size: clamp(12px, 3.2vw, 14px);
  cursor: pointer;
  transition: all 0.3s ease;
}

.game-item:hover img {
  box-shadow: 0 4px 12px rgba(255, 107, 0, 0.15);
}

/* .more-btn:hover {
  color: #ff8c00;
  transform: scale(1.05);
}

.more-btn:active {
  transform: scale(0.95);
} */
</style>

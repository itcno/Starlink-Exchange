<template>
  <div class="user-func-bar">
    <div class="user-info-box" ref="userBoxRef">
      <div class="user-display" @click="showDropdown = !showDropdown">
        <div class="vip-badge">
          <img :src="iconV" />
          <span>{{ user.vip }}</span>
        </div>
        <span class="arrow" :class="{ open: showDropdown }"><svg class="icon-svg" viewBox="0 0 24 24">
            <use xlink:href="#icon-public-triangle"></use>
          </svg></span>
        <span class="selected-text">{{ displayText }}</span>
        <div class="copy-btn" @click="copy">
          <svg class="icon-svg" viewBox="0 0 24 24">
            <use xlink:href="#icon-public-copy"></use>
          </svg>
        </div>
      </div>

      <div class="user-balance">
        <img :src="iconBalance" class="balance-icon" />
        <span class="balance-num">{{ user.balance }}</span>
      </div>

      <div v-if="showDropdown" class="dropdown-menu">
        <div class="menu-item" @click="selectItem('default'); showDropdown = false">
          <span>默认展示信息</span>
        </div>
        <div class="menu-item" @click="selectItem('account'); showDropdown = false">
          <span>账号 {{ truncateText(user.account, 8) }}</span>
        </div>
        <div class="menu-item" @click="selectItem('id'); showDropdown = false">
          <span>ID {{ user.id }}</span>
        </div>
      </div>
    </div>

    <div class="funcs">
      <div class="func-item">
        <img :src="iconService" alt="客服" class="func-icon" />
        <span>客服</span>
      </div>
      <div class="func-item">
        <img :src="iconVip" alt="VIP" class="func-icon" />
        <span>VIP</span>
      </div>
      <div class="func-item">
        <img :src="iconShare" alt="分享" class="func-icon" />
        <span>分享</span>
      </div>
      <div class="func-item" ref="moreBtnRef" @click="handleMoreClick">
        <img :src="iconMore" alt="更多" class="func-icon" />
        <span>更多</span>
      </div>
    </div>

    <MoreDialog v-model="showMore" :trigger-rect="moreTriggerRect" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import MoreDialog from "./MoreDialog.vue";
import iconService from "@/assets/imgs/home/Icon_Home_10.avif";
import iconVip from "@/assets/imgs/home/Icon_Home_57.avif";
import iconShare from "@/assets/imgs/home/Icon_Home_11.avif";
import iconMore from "@/assets/imgs/home/Icon_Home_12.avif";
import iconBalance from "@/assets/imgs/home/Icon_Home_31.avif";
import iconV from "@/assets/imgs/home/img_vip_v.avif";

const user = { vip: 2, id: 189956, account: "user12345678901234", balance: "88.88" };

const showMore = ref(false);
const showDropdown = ref(false);
const selectedType = ref("default");
const userBoxRef = ref(null);
const moreBtnRef = ref(null);
const moreTriggerRect = ref({});

const displayText = ref("189956");

const truncateText = (value, maxLen) => {
  if (value === undefined || value === null) return "";
  const text = String(value);
  return text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
};

const selectItem = (type) => {
  selectedType.value = type;
  if (type === "default") {
    displayText.value = "默认展示信息";
  } else if (type === "account") {
    displayText.value = truncateText(user.account, 8);
  } else if (type === "id") {
    displayText.value = `${user.id}`;
  }
};

const copy = () => {
  let textToCopy = "";
  if (selectedType.value === "default") {
    textToCopy = "默认展示信息";
  } else if (selectedType.value === "account") {
    textToCopy = user.account;
  } else if (selectedType.value === "id") {
    textToCopy = user.id.toString();
  }
  navigator.clipboard.writeText(textToCopy);
  showDropdown.value = false;
};

const handleMoreClick = () => {
  showDropdown.value = false; // 先关闭下拉菜单
  if (moreBtnRef.value) {
    const rect = moreBtnRef.value.getBoundingClientRect();
    moreTriggerRect.value = {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
      width: rect.width,
      height: rect.height,
    };
  }
  showMore.value = true;
};

// 点击外部关闭下拉菜单
const handleClickOutside = (e) => {
  if (userBoxRef.value && !userBoxRef.value.contains(e.target)) {
    showDropdown.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.user-func-bar {
  display: flex;
  width: 100%;
  height: clamp(50px, 13.33vw, 60px);
  justify-content: space-between;
  align-items: center;
  font-size: clamp(10px, 2.67vw, 12px);
}

.user-info-box {
  position: relative;
  flex: 0 0 auto;
  max-width: 50%;
}

.user-display {
  display: flex;
  align-items: center;
  gap: 4px;
  padding-left: clamp(8px, 2.13vw, 12px);
  cursor: pointer;
  user-select: none;
}

.arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
  min-width: 14px;
  flex-shrink: 0;
  transform-origin: center;
}

.arrow svg {
  width: clamp(14px, 3.73vw, 16.94px);
  height: clamp(14px, 3.73vw, 16.23px);
}

.arrow.open {
  transform: rotate(180deg);
}

.vip-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(36, 178, 153);
  border-radius: 6px 0 6px 0;
  padding: 0 3px;
  height: clamp(16px, 4.27vw, 18px);
  margin-right: 4px;
  flex-shrink: 0;
}

.vip-badge img {
  width: clamp(12px, 3.2vw, 14px);
  height: clamp(12px, 3.2vw, 14px);
  object-fit: contain;
}

.vip-badge span {
  font-size: clamp(12px, 3.2vw, 14px);
  font-weight: 600;
  font-style: italic;
  background: linear-gradient(to bottom, #f7ea94, #e5b952 51%, #ce9510);
  background-clip: text;
  color: transparent;
}

.selected-text {
  flex: 1;
  color: #3d3d3d;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: clamp(12px, 3.2vw, 14px);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
  background: #fff;
}

.menu-item {
  padding: 10px 12px;
  color: #333;
  cursor: pointer;
  transition: background 0.2s;
}

/* .menu-item:hover {
  background: #f5f5f5;
} */

.menu-item:last-child {
  border-bottom: none;
}

.copy-btn {
  cursor: pointer;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.copy-btn svg {
  width: clamp(14px, 3.73vw, 16.94px);
  height: clamp(13px, 3.73vw, 16.23px);
}

.copy-btn:hover {
  color: #ff6b00;
}

.funcs {
  display: flex;
  gap: clamp(24px, 6.4vw, 30px);
  margin-left: auto;
  padding-right: 12px;
}

.func-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  color: #666;
  font-size: clamp(10px, 2.88vw, 16px);
  transition: color 0.2s;
  line-height: 1;
}

/* .func-item:hover {
  color: #ff6b00;
} */

.func-icon {
  width: clamp(28px, 6.4vw, 38px);
  height: clamp(28px, 6.4vw, 38px);
  object-fit: contain;
  object-position: center;
}

.user-balance {
  width: fit-content;
  min-width: 60px;
  height: clamp(20px, 5.33vw, 22px);
  display: flex;
  align-items: center;
  margin-left: clamp(12px, 2.13vw, 18px);
  padding: 0 4px;
  font-size: clamp(12px, 2.88vw, 16px);
  color: #FFAA09;
  border: 1px solid #E3E3E3;
  border-radius: 12px;
  margin-top: 8px;
}

.balance-icon {
  width: clamp(14px, 3.73vw, 17px);
  height: clamp(14px, 3.73vw, 17px);
  margin-right: 4px;
}

.balance-num {
  color: #FFAA09;
}
</style>

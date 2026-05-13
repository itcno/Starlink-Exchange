<template>
  <div class="top-user-card-container">
    <div class="header-box">
      <div class="spacer"></div>
      <header class="header-btn-wrapper">
        <div class="btn-container header-item" @click="handleMessageClick">
          <div class="ui-badge__wrapper">
            <van-badge :content="messageCount" class="lobby-icon">
              <template #default>
                <svg
                  width="15.62px"
                  height="15.62px"
                  fill="currentColor"
                  viewBox="0 0 15.62 15.62"
                >
                  <use xlink:href="#icon-mine-message"></use>
                </svg>
              </template>
            </van-badge>
          </div>
        </div>
      </header>
    </div>

    <div class="user-info">
      <div class="avatar-wrapper" @click="handleAvatarClick">
        <van-image
          round
          width="100%"
          height="100%"
          fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
          alt="用户头像"
        />
      </div>
      <div class="info-content">
        <div class="row-1">
          <span class="username">richkory</span>
          <svg
            class="icon-svg copy-icon"
            viewBox="0 0 24 24"
            width="11.46"
            height="13.54"
            @click="handleCopyUsername"
          >
            <use xlink:href="#icon-public-copy"></use>
          </svg>
        </div>
        <div class="row-2">
          <span class="label">昵称: </span>
          <span class="value placeholder">{{ nickname }}</span>
          <svg
            class="icon-svg edit-icon"
            viewBox="0 0 24 24"
            width="13.23"
            height="13.23"
            @click="handleEditNickname"
          >
            <use xlink:href="#icon-public-write"></use>
          </svg>
        </div>
        <div class="row-3">
          <span class="id-text">ID: 666666</span>
          <svg
            class="icon-svg copy-icon"
            viewBox="0 0 24 24"
            width="11.46"
            height="13.54"
            @click="handleCopyId"
          >
            <use xlink:href="#icon-public-copy"></use>
          </svg>
          <span class="divider">|</span>
          <div class="balance-box">
            <div class="coin-icon">
              <img
                class="logo"
                :src="CoinImg"
                width="100%"
                height="100%"
                alt="金币ICON"
              />
            </div>
            <span class="balance-num">{{ balance }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Toast } from "vant";
import CoinImg from "@/assets/imgs/mine/Icon_Home_31.avif";

// 响应式数据
const messageCount = ref(8);
const nickname = ref("请输入昵称");
const balance = ref("8.88");

// 1. 消息按钮点击
const handleMessageClick = () => {
  Toast("点击消息了");
};

// 2. 头像点击
const handleAvatarClick = () => {
  Toast("点击头像");
};

// 3. 复制用户名
const handleCopyUsername = () => {
  const username = "richkory";
  copyToClipboard(username);
};

// 4. 编辑昵称（随机6个字母）
const handleEditNickname = () => {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomNickname = "";
  for (let i = 0; i < 6; i++) {
    randomNickname += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  nickname.value = randomNickname;
  Toast("修改昵称");
};

// 5. 复制ID
const handleCopyId = () => {
  const userId = "666666";
  copyToClipboard(userId);
};

// 复制到剪贴板的通用方法
const copyToClipboard = (text) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        Toast("复制成功");
      })
      .catch(() => {
        fallbackCopy(text);
      });
  } else {
    fallbackCopy(text);
  }
};

// 降级复制方案
const fallbackCopy = (text) => {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
    Toast("复制成功");
  } catch (e) {
    Toast("复制失败");
  }
  document.body.removeChild(textarea);
};
</script>

<style scoped lang="scss">
.top-user-card-container {
  width: 100%;
  position: relative;
  z-index: 1;
}

.header-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 4vw;
  height: clamp(40px, 10vw, 44px);
}

.spacer {
  flex: 1;
}

.header-btn-wrapper {
  display: flex;
  align-items: center;
  gap: clamp(12px, 3vw, 16px);
}

.header-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  cursor: pointer;

  svg {
    width: clamp(18px, 5vw, 20px);
    height: clamp(18px, 5vw, 20px);
  }
}

.lobby-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(20px, 5vw, 24px);
  line-height: 1;
}

.ui-badge__wrapper {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
}

:deep(.van-badge__wrapper) .van-badge {
  background-color: #ff3b30 !important;
  color: #fff;
  font-size: clamp(9px, 2.5vw, 10px);
  height: clamp(12px, 3.5vw, 14px);
  min-width: clamp(12px, 3.5vw, 14px);
  padding: 0 clamp(3px, 1vw, 4px);
  border-radius: 10px;
  border: 1px solid #fff;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(40%, -40%);
  transform-origin: 100% 0%;
}

.user-info {
  display: flex;
  align-items: center;
  margin-top: clamp(8px, 2.5vw, 10px);
  padding: 0 5vw;

  .avatar-wrapper {
    width: clamp(55.21px, 15vw, 64px);
    height: clamp(55.21px, 15vw, 64px);
    flex-shrink: 0;
    margin-right: clamp(12px, 3.5vw, 16px);
    border: 2px solid #fff;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .info-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 0;
    padding: 0 2vw;

    .row-1 {
      display: flex;
      align-items: center;
      margin-bottom: clamp(3px, 1vw, 4px);

      .username {
        font-size: clamp(11px, 4.5vw, 18px);
        // font-weight: bold;
        color: #3d3d3d;
        margin-right: clamp(4px, 1.5vw, 6px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .copy-icon {
        flex-shrink: 0;
        width: clamp(14px, 4vw, 16px);
        height: clamp(14px, 4vw, 16px);
        color: #d4a760;
        cursor: pointer;
      }
    }

    .row-2 {
      display: flex;
      align-items: center;
      font-size: clamp(11px, 3vw, 12px);
      color: #666;
      margin-bottom: clamp(4px, 1.5vw, 6px);

      .label {
        flex-shrink: 0;
      }

      .value.placeholder {
        color: #999;
        margin: 0 clamp(3px, 1vw, 4px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .edit-icon {
        flex-shrink: 0;
        width: clamp(12px, 3.5vw, 14px);
        height: clamp(12px, 3.5vw, 14px);
        color: #d4a760;
        margin-left: clamp(3px, 1vw, 4px);
        cursor: pointer;
      }
    }

    .row-3 {
      display: flex;
      align-items: center;
      font-size: clamp(12px, 3.5vw, 14px);
      color: #333;
      flex-wrap: wrap;
      gap: clamp(4px, 1vw, 8px);

      .id-text {
        font-family: monospace;
        font-size: clamp(11px, 3vw, 14px);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 120px;
      }

      .copy-icon {
        flex-shrink: 0;
        width: clamp(14px, 4vw, 16px);
        height: clamp(14px, 4vw, 16px);
        color: #d4a760;
        cursor: pointer;
      }

      .divider {
        color: #dadfe6;
        flex-shrink: 0;
        padding: 0 1vw;
      }

      .balance-box {
        display: flex;
        align-items: center;
        flex-shrink: 0;

        .coin-icon {
          width: clamp(16px, 4.5vw, 18px);
          height: clamp(16px, 4.5vw, 18px);
          // background: #20cfa8;
          // color: #fff;
          border-radius: 50%;
          font-size: clamp(10px, 3vw, 12px);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: clamp(3px, 1vw, 4px);
          font-weight: bold;
        }

        .balance-num {
          // font-weight: bold;
          font-size: clamp(14px, 3.8vw, 15px);
        }
      }
    }
  }
}

/* 小屏幕优化 (宽度 < 360px) */
@media (max-width: 359px) {
  .header-box {
    padding: 5px 12px;
  }

  .user-info {
    padding: 0 12px;

    .info-content .row-3 {
      .id-text {
        max-width: 90px;
      }
    }
  }
}

/* 中等屏幕 (360px - 480px) */
@media (min-width: 360px) and (max-width: 480px) {
  .user-info .info-content .row-3 .id-text {
    max-width: 140px;
  }
}

/* 大屏幕优化 (宽度 > 768px) */
@media (min-width: 768px) {
  .header-box {
    padding: 5px 24px;
    max-width: 1200px;
    margin: 0 auto;
  }

  .user-info {
    padding: 0 24px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;

    .avatar-wrapper {
      width: 80px;
      height: 80px;
      margin-right: 20px;
    }

    .info-content {
      .row-1 .username {
        font-size: 20px;
      }

      .row-2 {
        font-size: 13px;
      }

      .row-3 {
        font-size: 15px;

        .id-text {
          max-width: 200px;
        }
      }
    }
  }
}

/* 超大屏幕 (宽度 > 1024px) */
@media (min-width: 1024px) {
  .user-info {
    .avatar-wrapper {
      width: 88px;
      height: 88px;
    }
  }
}
</style>

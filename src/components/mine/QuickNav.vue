<template>
  <!-- 快捷功能入口 -->
  <div class="quick-actions">
    <div class="action-item">
      <div class="icon-bg">
        <!-- SVG: 提现 (Card) -->
        <svg
          class="icon-svg"
          viewBox="0 0 24 24"
          width="22.4"
          height="18.23"
          color="#d4a760"
        >
          <use xlink:href="#icon-public-withdraw"></use>
        </svg>
      </div>
      <span>提现</span>
    </div>
    <div class="action-item">
      <div class="icon-bg">
        <!-- SVG: 充值 (Wallet) -->
        <svg
          class="icon-svg"
          viewBox="0 0 24 24"
          width="22.4"
          height="18.23"
          color="#d4a760"
        >
          <use xlink:href="#icon-public-recharge"></use>
        </svg>
      </div>
      <span>充值</span>
    </div>
    <div class="action-item">
      <div class="icon-bg">
        <!-- SVG: 客服 (Service) -->
        <svg
          class="icon-svg"
          viewBox="0 0 24 24"
          width="22.4"
          height="19.79"
          color="#d4a760"
        >
          <use xlink:href="#icon-public-kefu"></use>
        </svg>
      </div>
      <span>客服</span>
    </div>
  </div>

  <!-- VIP 卡片区域 -->
  <div class="vip-section">
    <div class="vip-card">
      <div class="vip-header">
        <div class="vip-status">
          <div class="vip-tag-placeholder"></div>
          <span class="vip-tips"
            >距离 <span style="color: #ffffff">VIP2</span> 还需投注
            <span style="color: #ffffff">500</span></span
          >
        </div>
        <!-- SVG: 右箭头 -->
        <svg
          class="icon-svg"
          viewBox="0 0 12.5 7.81"
          width="12.5px"
          height="7.81px"
          color="#F9E09F"
          fill="currentColor"
          style="transform: rotate(180deg)"
        >
          <use xlink:href="#icon-public-back"></use>
        </svg>
      </div>
      <div class="vip-line1">
        <div class="vip-line2"></div>
      </div>
      <div class="vip-body">
        <div class="vip-badge-icon">
          <img class="img" :src="VipColor1" alt="VIP" />
          <img class="img" :src="VipStyle2" alt="VIP" />
          <span class="badge-num">2</span>
        </div>
        <div class="progress-area">
          <span class="progress-label">晋级需再投注</span>
          <div class="progress-container">
            <span class="progress-value">500/1,000</span>
            <div class="custom-progress">
              <div class="progress-bar" style="width: 50%"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import VipColor1 from "@/assets/imgs/vip/style_2_vip_color1.avif";

import VipStyle2 from "@/assets/imgs/vip/style_2_vip_style2.avif";
</script>

<style scoped lang="scss">
/* --- 快捷操作 --- */
.quick-actions {
  display: flex;
  justify-content: space-around;
  margin-top: clamp(16px, 4vw, 20px);
  padding: 0 4vw;
  background-color: transparent;

  .action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    z-index: 1;

    .icon-bg {
      margin-bottom: clamp(2px, 0.5vw, 4px);
      display: flex;
      align-items: center;
      justify-content: center;

      .icon-svg {
        width: clamp(24px, 6.5vw, 28px);
        height: clamp(24px, 6.5vw, 28px);
      }
    }

    span {
      font-size: clamp(11px, 3vw, 13px);
      color: #333;
      line-height: 1.5;
    }
  }
}

/* --- VIP 卡片 --- */
.vip-section {
  padding: clamp(10px, 2.5vw, 12px) 5vw;
  margin-bottom: clamp(16px, 4vw, 20px);
}

.vip-card {
  background: #d1ae52;
  border-radius: clamp(10px, 2.5vw, 14px);
  padding: clamp(12px, 3vw, 16px);
  color: #fff;
  box-shadow: 0 4px 12px rgba(196, 159, 80, 0.3);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.16);

  .vip-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: clamp(12px, 3vw, 16px);

    .vip-status {
      display: flex;
      align-items: center;

      .vip-tag-placeholder {
        width: clamp(39.58px, 5.5vw, 26px);
        height: clamp(16.67px, 2.8vw, 13px);
        background-color: #20cfa8;
        border-radius: 7px 0 7px 0; /* 左上 右上 右下 左下 */
        margin-right: clamp(6px, 1.5vw, 8px);
      }

      .vip-tips {
        font-size: clamp(12px, 3.2vw, 14px);
        // opacity: 0.9;
        color: #eedba9;
      }
    }

    .icon-svg {
      width: clamp(18px, 4.5vw, 22px);
      height: clamp(18px, 4.5vw, 22px);
      flex-shrink: 0;
    }
  }
  .vip-line1 {
    width: 100%;
    height: 2px;
    background-color: #dabe75;
    margin: 0 auto;
    .vip-line2 {
      width: 100%;
      height: 1px;
      background-color: #bc9c4a;
      margin: 0 auto;
    }
  }

  .vip-body {
    display: flex;
    align-items: center;

    .vip-badge-icon {
      position: relative; /* 作为定位参考容器 */
      width: clamp(42.71px, 9.5vw, 44px);
      height: clamp(41.15px, 9.5vw, 44px);
      margin-right: clamp(10px, 2.5vw, 14px);
      flex-shrink: 0;

      .img {
        position: absolute;
        inset: 0; /* 等价于 top/right/bottom/left 全 0，铺满容器 */
        width: 100%;
        height: 100%;
      }
      .badge-num {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: clamp(15px, 4vw, 18px);
        font-weight: bold;
        line-height: 1;
        color: #fff; /* 根据你卡片设计调整颜色 */
        text-shadow: 0.01rem rgba(0, 0, 0, 0.4);
      }
    }

    .progress-area {
      flex: 1;
      min-width: 0;
      display: flex;
      align-items: center;
      gap: clamp(8px, 2vw, 12px);

      .progress-label {
        font-size: clamp(11px, 3vw, 13px);
        opacity: 0.9;
        white-space: nowrap;
        flex-shrink: 0;
        color: #FFE5A1;
        line-height: 1;
        display: flex;
        align-items: center;
      }

      .progress-container {
        flex: 1;
        min-width: 0;
        position: relative;
        display: flex;
        align-items: center;

        .progress-value {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(10px, 2.8vw, 12px);
          opacity: 0.9;
          z-index: 1;
          white-space: nowrap;
        }

        .custom-progress {
          width: 100%;
          height: clamp(8px, 2vw, 12px);
          background-color: #C1A04C;
          border-radius: clamp(14px, 1vw, 5px);
          box-shadow: 0px 0.5px 0.25px 0.25px rgba(227, 203, 143, 0.8);
          overflow: hidden;
          position: relative;

          .progress-bar {
            height: 100%;
            background-color: #04BE02;
            border-radius: clamp(3px, 1vw, 5px);
            transition: width 0.3s ease;
          }
        }
      }
    }
  }
}

/* 小屏幕优化 (宽度 < 360px) */
@media (max-width: 359px) {
  .quick-actions {
    padding: 0 12px;
    margin-top: 14px;

    .action-item {
      .icon-bg .icon-svg {
        width: 22px;
        height: 22px;
      }

      span {
        font-size: 10px;
      }
    }
  }

  .vip-section {
    padding: 10px 12px;
  }

  .vip-card {
    padding: 10px 12px;

    .vip-header {
      margin-bottom: 10px;

      .vip-status .vip-tips {
        font-size: 11px;
      }
    }

    .vip-body {
      .vip-badge-icon {
        width: 36px;
        height: 36px;
        margin-right: 8px;

        .badge-num {
          font-size: 14px;
        }
      }

      .progress-area {
        gap: 6px;

        .progress-label {
          font-size: 10px;
        }

        .progress-container {
          .progress-value {
            font-size: 9px;
          }

          .custom-progress {
            height: 14px;
          }
        }
      }
    }
  }
}

/* 中等屏幕 (360px - 480px) */
@media (min-width: 360px) and (max-width: 480px) {
  .quick-actions {
    padding: 0 16px;
  }

  .vip-section {
    padding: 10px 16px;
  }
}

/* 大屏幕优化 (宽度 > 768px) */
@media (min-width: 768px) {
  .quick-actions {
    padding: 0 24px;
    margin-top: 24px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;

    .action-item {
      .icon-bg .icon-svg {
        width: 30px;
        height: 30px;
      }

      span {
        font-size: 14px;
      }
    }
  }

  .vip-section {
    padding: 12px 24px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }

  .vip-card {
    padding: 16px 20px;
    border-radius: 16px;

    .vip-header {
      margin-bottom: 18px;

      .vip-status .vip-tips {
        font-size: 15px;
      }

      .icon-svg {
        width: 24px;
        height: 24px;
      }
    }

    .vip-body {
      .vip-badge-icon {
        width: 48px;
        height: 48px;
        margin-right: 16px;

        .badge-num {
          font-size: 20px;
        }

        .badge-text {
          font-size: 10px;
        }
      }

      .progress-area {
        gap: 14px;

        .progress-label {
          font-size: 14px;
        }

        .progress-container {
          .progress-value {
            font-size: 13px;
          }

          .custom-progress {
            height: 14px;
          }
        }
      }
    }
  }
}

/* 超大屏幕 (宽度 > 1024px) */
@media (min-width: 1024px) {
  .quick-actions {
    .action-item {
      .icon-bg .icon-svg {
        width: 32px;
        height: 32px;
      }

      span {
        font-size: 15px;
      }
    }
  }

  .vip-card {
    .vip-body {
      .vip-badge-icon {
        width: 52px;
        height: 52px;

        .badge-num {
          font-size: 22px;
        }
      }

      .progress-area {
        gap: 16px;

        .progress-label {
          font-size: 15px;
        }

        .progress-container {
          .progress-value {
            font-size: 14px;
          }

          .custom-progress {
            height: 14px;
          }
        }
      }
    }
  }
  
}
</style>

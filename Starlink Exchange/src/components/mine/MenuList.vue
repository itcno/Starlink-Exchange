<template>
  <!-- 菜单列表组 1 -->
  <div class="menu-group">
    <van-cell title="账户明细" is-link :border="false">
      <template #icon>
        <!-- SVG: 订单 (List) -->
        <svg
          class="icon-svg menu-icon"
          viewBox="0 0 24 24"
          color="#ff976a"
        >
          <use xlink:href="#icon-mine-account"></use>
        </svg>
      </template>
    </van-cell>
    <van-cell title="投注记录" is-link :border="false">
      <template #icon>
        <!-- SVG: 金币 (Coin) -->
        <svg
          class="icon-svg menu-icon"
          viewBox="0 0 24 24"
          color="#07c160"
        >
          <use xlink:href="#icon-mine-record"></use>
        </svg>
      </template>
    </van-cell>
    <van-cell title="提现管理" is-link :border="false">
      <template #icon>
        <!-- SVG: 设置 (Settings) -->
        <svg
          class="icon-svg menu-icon"
          viewBox="0 0 24 24"
          color="#f44336"
        >
          <use xlink:href="#icon-mine-withdraw"></use>
        </svg>
      </template>
    </van-cell>
  </div>
  <div class="line"></div>
  <!-- 菜单列表组 2 -->
  <div class="menu-group">
    <van-cell
      title="分享赚钱"
      is-link
      value="月入百万"
      value-class="highlight-text"
      :border="false"
    >
      <template #icon>
        <!-- SVG: 分享 (Friends) -->
        <svg
          class="icon-svg menu-icon"
          viewBox="0 0 24 24"
          color="#d4a760"
        >
          <use xlink:href="#icon-mine-share"></use>
        </svg>
      </template>
    </van-cell>

    <van-cell title="安全退出" is-link :border="false">
      <template #icon>
        <!-- SVG: 退出 (Close/Exit) -->
        <svg
          class="icon-svg menu-icon"
          viewBox="0 0 24 24"
          color="#d4a760"
        >
          <use xlink:href="#icon-mine-exit"></use>
        </svg>
      </template>
    </van-cell>
    <van-cell title="版本号" is-link value="1.0.0" value-class="highlight-text" :border="false">
      <template #icon>
        <!-- SVG: 版本号 (Version) -->
        <svg
          class="icon-svg menu-icon"
          viewBox="0 0 24 24"
          color="#d4a760"
        >
          <use xlink:href="#icon-mine-version"></use>
        </svg>
      </template>
    </van-cell>
  </div>
</template>

<script setup></script>

<style scoped>
/* --- 菜单列表 --- */
.menu-group {
  margin-left: 5.33vw; /* 20px / 375px (设计稿宽度) * 100 */
  margin-right: 5.33vw;
  margin-top: 5.33vw;
  background: #fff;
  border-radius: 2.67vw; /* 添加圆角使其更现代 */

  .menu-icon {
    /* 响应式 SVG 图标尺寸 */
    width: clamp(20px, 5.87vw, 24px); /* 最小20px，最大24px */
    height: clamp(20px, 5.87vw, 24px);
    margin-right: 2.67vw; /* 10px */
    flex-shrink: 0; /* 防止图标被压缩 */
    display: block; /* 确保尺寸正确应用 */
  }

  :deep(.van-cell) {
    align-items: center;
    padding: 4.27vw; /* 16px */
  }

  :deep(.van-cell__title) {
    font-size: clamp(14px, 4vw, 16px); /* 响应式字体，最小14px，最大16px */
    color: #3D3D3D;
    margin-left: 1.6vw; /* 6px */
  }
  
  :deep(.van-cell__value) {
    font-size: clamp(12px, 3.47vw, 14px); /* 响应式字体，最小12px，最大14px */
    color: #D1AE52;
    margin-right: 1.6vw; /* 6px */
  }
  
  :deep(.van-icon) {
    font-size: clamp(16px, 4.27vw, 18px); /* 响应式图标大小 */
  }

  .highlight-text {
    color: #d4a760;
    font-size: clamp(12px, 3.47vw, 14px); /* 响应式字体 */
  }
}

.line {
  width: 100%;
  height: clamp(10px, 2.67vw, 14px); /* 10px */
  background-color: #F8F8F8;
  margin-top: clamp(12px, 5.33vw, 14px); /* 20px */
}

/* 针对小屏幕设备的媒体查询 */
@media screen and (max-width: 320px) {
  .menu-group {
    margin-left: 4vw;
    margin-right: 4vw;
    margin-top: 4vw;
    
    .menu-icon {
      width: 18px;
      height: 18px;
    }
  }
}

/* 针对大屏幕设备的媒体查询 */
@media screen and (min-width: 768px) {
  .menu-group {
    max-width: 600px; /* 限制最大宽度 */
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    padding: 0 20px;
    
    .menu-icon {
      width: 24px;
      height: 24px;
      margin-right: 12px;
    }
  }
  
  .line {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>

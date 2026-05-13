<!-- <template>
  <div class="top-nav">
    <img class="logo" :src="logoSrc" />

    <button class="search-btn" @click="goSearch">
      <img class="search-icon" :src="searchIconSrc" alt="搜索" />
      <span class="search-text">搜索</span>
    </button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import logoSrc from '@/assets/imgs/home/BOLAI0DAE3.avif';
import searchIconSrc from '@/assets/imgs/home/Icon_Home_01.avif';

const router = useRouter();

// 搜索按钮点击跳转到搜索页面
const goSearch = () => router.push('/');
</script>

<style scoped>
.top-nav {
  height: clamp(44px, 12vw, 56px);
  display: flex;
  align-items: center;
  padding: 0 clamp(9px, 2.4vw, 12.6px);
  background: #fff;
  border-bottom: 1px solid #e5e5e5;
}

.logo {
  height: clamp(32px, 8.5vw, 40px);
  width: auto;
  max-width: 50%;
  object-fit: contain;
}

.search-btn {
  display: flex;
  /* 让图标和文字并排 */
  align-items: center;
  /* 垂直居中对齐 */
  margin-left: auto;
  /* 将按钮推到右边 */
  background: transparent;
  border: none;
  color: #666666;
  /* 按钮文字颜色 */
  font-size: clamp(10px, 2.5vw, 12px);
  /* 调整文字大小 */
  cursor: pointer;
  flex-direction: column;
  gap: 2px;
  padding: 0;
}

.search-text {
  font-size: clamp(10px, 2.5vw, 12px);
  line-height: 1;
}

.search-icon {
  width: clamp(28px, 7vw, 36px);
  height: clamp(24px, 7vw, 32px);
  object-fit: contain;
}
</style> -->

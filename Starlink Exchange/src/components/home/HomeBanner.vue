<template>
  <swiper :modules="modules" :loop="true" :autoplay="{ delay: 1000, disableOnInteraction: false }"
    :pagination="{ clickable: true }" :speed="600" class="banner-swiper">
    <swiper-slide v-for="b in banners" :key="b.id">
      <img :src="b.img" class="banner-img" />
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';

const modules = [Autoplay, Pagination];

import banner1 from '@/assets/imgs/home/Banner1.avif';
import banner2 from '@/assets/imgs/home/Banner2.avif';
import banner3 from '@/assets/imgs/home/Banner3.avif';

const banners = [
  { id: 1, img: banner1 },
  { id: 2, img: banner2 },
  { id: 3, img: banner3 },
  { id: 4, img: banner1 },
  { id: 5, img: banner2 },
  { id: 6, img: banner3 },
  { id: 7, img: banner1 },
  { id: 8, img: banner2 },
  { id: 9, img: banner3 },
  { id: 10, img: banner1 },
  { id: 11, img: banner2 },
  { id: 12, img: banner3 },
];
</script>

<style scoped>
/* 基础样式 */
.banner-swiper {
  width: calc(100% - 24px);
  margin: 0 auto;
  aspect-ratio: 358 / 104;
  position: relative;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* 使用深度选择器穿透 scoped */
.banner-swiper :deep(.swiper-pagination) {
  bottom: -18px !important;
}

.banner-swiper :deep(.swiper-pagination-bullet) {
  width: 5px;
  height: 5px;
  background: rgba(255, 255, 255, 0.6);
  opacity: 1;
  border-radius: 50%;
  margin: 0 4px !important;
  transition: all 0.3s ease;
}

.banner-swiper :deep(.swiper-pagination-bullet-active) {
  width: 12px;
  height: 4px;
  border-radius: 2px;
  background: #fff !important;
}
</style>

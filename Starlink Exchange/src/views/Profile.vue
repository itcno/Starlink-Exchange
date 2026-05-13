 <template>
  <!-- <div>
    <div class="user-top-bg">
      <img :src="UserTopBg" alt="用户顶部背景" />
    </div>
    <section class="section-box">
      <UserHeader />
    </section>
    <section class="section-box">
      <QuickNav />
    </section>
    <section class="section-box">
      <MenuList />
    </section>
  </div>
  <div class="back_btn" @click="handleBack">
    <svg
      width="1em"
      height="1em"
      color="#666666"
      class=""
      style="
        display: inline-flex;
        justify-content: center;
        align-items: center;
        transition: transform 0.3s linear;
      "
    >
      <use xlink:href="#icon-public-back"></use>
    </svg>
  </div> -->
   <!-- 底部垫高,防止被 Tabbar 遮挡 -->
   <!-- <div class="bottom-spacer"></div> -->
</template>

<script setup>
// import { useRouter } from 'vue-router';
// import UserHeader from "@/components/mine/UserHeader.vue";
// import QuickNav from "@/components/mine/QuickNav.vue";
// import MenuList from "@/components/mine/MenuList.vue";

// import UserTopBg from "@/assets/imgs/mine/style_1_topbg.avif";

// const router = useRouter();

// 返回上一页
const handleBack = () => {
  router.back();
  // 或者使用浏览器原生方法: window.history.back();
};
</script>

<style>
.back_btn {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.16rem 0.14rem;
  width: 0.16rem;
  height: 0.16rem;
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--skin__neutral_1);
  font-size: 0.16rem;
  z-index: 2;
  cursor: pointer;
}

.user-top-bg {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.user-top-bg img {
  width: 100%;
  height: auto;
  display: block;
}
.bottom-spacer {
  height: 60px; /* 这里的 60px 对应你 Tabbar 的高度 */
}
</style> -->
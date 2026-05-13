<template>
  <section class="about-section">
    <!-- <div class="contact-card">
      <div class="contact-title">官方频道</div>
      <ul class="contact-list channel-list">
        <li v-for="ch in officialChannels" :key="ch.id" class="contact-item">
          <img :src="ch.icon" :alt="ch.label" />
          <span>{{ ch.label }}</span>
        </li>
      </ul>
    </div>

    <div class="contact-card">
      <div class="contact-title">联系我们</div>
      <ul class="contact-list">
        <li v-for="contact in contacts" :key="contact.id" class="contact-item">
          <img :src="contact.icon" :alt="contact.label" />
          <span>{{ contact.label }}</span>
        </li>
      </ul>
    </div> -->

    <div class="about-text">
      <p class="about-name">星链交易所</p>
      <p class="about-content">
        星链交易所是国际最知名的线上博彩运营公司，提供刺激好玩的真人荷官娱乐城、棋牌、电子、捕鱼、彩票、体育等全品类游戏。由柬埔寨政府授权和监管，发放营业执照，并根据颁发给 Antillephone 的
        8048/JAZ号许可证运营。已通过所有合规性审查，并获得合法授权，可进行所有机会与投注游戏的游戏操作。
      </p>
    </div>

    <div class="logo-grid">
      <img v-for="logo in brandLogos" :key="logo" :src="logo" alt="品牌合作" />
    </div>

    <div class="license-grid">
      <img v-for="license in licenseLogos" :key="license" :src="license" alt="监管许可" />
    </div>

    <div class="about-footer">
      <p>— 铂莱国际酒店直营 —</p>
      <p>官方频道:@xxxxxxx</p>
    </div>
  </section>
</template>

<script setup>
const brandLogos = [
  "https://wh1pry-1033-ppp.oss-accelerate.aliyuncs.com/siteadmin/template/img_footer_jdb.png",
  "https://wh1pry-1033-ppp.oss-accelerate.aliyuncs.com/siteadmin/template/img_footer_ky.png",
  "https://wh1pry-1033-ppp.oss-accelerate.aliyuncs.com/siteadmin/upload/img/1804197493776265217.png",
  "https://wh1pry-1033-ppp.oss-accelerate.aliyuncs.com/siteadmin/template/img_footer_bg.png",
];

const licenseLogos = [
  "https://wh1pry-1033-ppp.oss-accelerate.aliyuncs.com/siteadmin/template/img_license_plate2.png",
  "https://wh1pry-1033-ppp.oss-accelerate.aliyuncs.com/siteadmin/template/img_license_plate3.png",
  "https://wh1pry-1033-ppp.oss-accelerate.aliyuncs.com/siteadmin/template/img_license_plate4.png",
  "https://wh1pry-1033-ppp.oss-accelerate.aliyuncs.com/siteadmin/template/img_license_plate1.png",
];

const officialChannels = [
  {
    id: 1,
    label: '官方频道-电报群',
    icon: 'https://hhbl1.cc/siteadmin/upload/img/telegram.avif',
  },
];

const contacts = [
  {
    id: 1,
    label: '星链交易所客服@hhkf',
    icon: 'https://hhbl1.cc/siteadmin/upload/img/telegram.avif',
  },
  {
    id: 2,
    label: '星链交易所全网招商',
    icon: 'https://hhbl1.cc/siteadmin/upload/img/telegram.avif',
  },
  {
    id: 3,
    label: '星链交易所管理(投诉、合作)',
    icon: 'https://hhbl1.cc/siteadmin/upload/img/telegram.avif',
  },
];
</script>

<style scoped>
.about-section {
  width: 100%;
  padding: clamp(16px, 5vw, 18px) clamp(14px, 5vw, 32px);
  box-sizing: border-box;
  border-top: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: clamp(14px, 4vw, 22px);
  align-items: center;
  background: #f8f8f8;
}

.about-text {
  text-align: center;
  max-width: 720px;
  color: #666666;
  font-size: clamp(12px, 3.2vw, 16px);
  line-height: 1.75;
  padding: 0 clamp(2px, 0.6vw, 6px);
}

.about-name {
  font-size: clamp(12px, 3.2vw, 16px);
  color: #666666;
  margin: 0 auto;
}

.about-content {
  margin: 0;
}

.logo-grid,
.license-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, minmax(40px, 1fr));
  justify-items: center;
}

.logo-grid img,
.license-grid img {
  max-width: 100%;
  width: clamp(40px, 18vw, 80px);
  height: auto;
  object-fit: contain;
}

.about-footer {
  text-align: center;
  color: #999;
  font-size: clamp(10px, 2.6vw, 12px);
  line-height: 1.5;
}

.about-footer p {
  margin: 4px 0;
}

.contact-card {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}

.contact-title {
  font-size: 14px;
  color: #999;
  margin: 0 0 12px;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
}

.channel-list {
  gap: 10px 14px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
}

.contact-item img {
  width: clamp(32px, 6vw, 44px);
  height: clamp(32px, 6vw, 44px);
  object-fit: contain;
}

.contact-item span {
  font-size: 13px;
  color: #333;
  line-height: 1.4;
}
</style>

import { createApp } from "vue";
import App from "./App.vue";

// 引入路由
import router from "./router";

// 引入 Pinia（如果使用状态管理）
import { createPinia } from "pinia";

// 引入 Vant 图标组件（如果需要使用图标）
import { Icon } from 'vant';

// 引入全局样式
import "./assets/styles/style.scss";

// 引入 Vant UI 组件库
import "vant/lib/index.css"; // 引入 Vant 样式
import { Tabbar, TabbarItem, Badge, Image as VanImage, Cell } from "vant"; // 按需引入组件

import 'virtual:svg-icons-register'  // icon-svg

// 创建应用
const app = createApp(App);

// 使用 Pinia
app.use(createPinia());

// 使用路由
app.use(router);

// 使用 Vant 的 Tabbar 组件
app.use(Tabbar);
app.use(TabbarItem);

// 使用 Vant 的 Icon 组件
app.use(Icon);

// Badge 徽标
app.use(Badge);
// Image 图片
app.use(VanImage);
// Cell 单元格
app.use(Cell);
// 挂载到 DOM
app.mount("#app");

// src/main.js
function setRem() {
	const docEl = document.documentElement;
	const clientWidth = docEl.clientWidth;
	if (!clientWidth) return;

	// 这里的7.5是设计稿750宽度除以100，1rem=100px的换算比例
	const fontSize = clientWidth / 3.75;

	// 限制最大字体大小，防止超大屏幕字体太大
	const maxFontSize = 100; // 100px相当于设计稿100px
	docEl.style.fontSize =
		(fontSize > maxFontSize ? maxFontSize : fontSize) + "px";
}

// 初始化执行
setRem();

// 窗口大小改变时重新计算
window.addEventListener("resize", setRem);
window.addEventListener("orientationchange", setRem);

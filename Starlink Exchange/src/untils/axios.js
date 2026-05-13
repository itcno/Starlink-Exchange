// src/utils/request.js
import axios from "axios";
import { ElMessage } from "element-plus";
import router from "@/router";

const baseURL = import.meta.env.VITE_API_URL || "";

const service = axios.create({
	baseURL,
	timeout: 20000,
});

let isRedirecting = false;

service.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("token");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}

		const permission = config.headers["X-Permission"] || getPermission();
		if (permission) {
			config.headers["X-Permission"] = permission;
		}

		return config;
	},
	(error) => Promise.reject(error)
);

service.interceptors.response.use(
	(response) => {
		const res = response.data;
		// Blob 下载响应
		if (response.request?.responseType === "blob") {
			return response;
		}
		// code 判断
		if (res.code === 200) {
			return res;
		}

		if (res.code === 401) {
			handle401();
			return Promise.reject(res);
		} else if (res.code === 400) {
			showError(res.msg || "请求失败");
		} else {
			showError(res.msg || "未知错误");
		}
		return Promise.reject(res);
	},
	(error) => {
		const status = error.response?.status;
		if (status === 401) {
			handle401();
		} else if (status === 403) {
			showError("无权限访问");
		} else if (status === 404) {
			showError("接口不存在");
		} else if (status === 500) {
			showError("服务器错误");
		} else {
			showError(error.message || "网络错误");
		}
		return Promise.reject(error);
	}
);

function getPermission() {
	const current = router.currentRoute.value;
	return current?.meta?.code || null;
}

function showError(msg) {
	ElMessage.error(msg);
}

function handle401() {
	if (!isRedirecting) {
		isRedirecting = true;
		showError("登录状态已失效，请重新登录");
		router.push("/login");
		setTimeout(() => (isRedirecting = false), 1000);
	}
}

export default service;

# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

开发环境：
pnpm -v && node -v && nvm -v && npm -v
10.11.0
v20.19.5
0.40.1
10.8.2

框架初始化：
pnpm install

本地调试：
pnpm dev

打包：
pnpm build --mode 环境（eg：test、production）

### iOS（Capacitor）

1. 导出 Web 并同步到 Xcode 工程：`pnpm cap:ios:sync`（或 `pnpm cap:sync` 同步所有平台）。
2. 在 **macOS** 上安装 [Xcode](https://developer.apple.com/xcode/) 与 [CocoaPods](https://cocoapods.org/)，在 `ios/App` 目录执行 `pod install`，用 Xcode 打开 **`ios/App/App.xcworkspace`**（不要直接打开 `.xcodeproj`）。
3. 选择真机或 Any iOS Device，菜单 **Product → Archive** 归档，再在 Organizer 里分发 TestFlight / App Store 或导出 IPA。

说明：当前仓库若在 Windows 上执行同步，会提示跳过 `pod install`，属正常现象；上架打包必须在 Mac 上完成。

开发分支：local
测试分支：test
线上分支：master

⚠️注意：正常开发选用local分支，有自己的问题修复时新建自己的fix分支，再合并到dev分支
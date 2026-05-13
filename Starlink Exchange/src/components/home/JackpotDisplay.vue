<template>
  <div class="jackpot-box">
    <div class="bg" :style="{ backgroundImage: `url(${jackpotBg})` }"></div>

    <p class="text-content">
      <span class="count">
        <!-- 每一位数字包裹在容器中 -->
        <div v-for="(item, index) in digits" :key="index" class="digit-wrapper">
          <!-- 滚动的长条容器 -->
          <div class="digit-scroll" :style="item.style">
            <i v-for="(char, i) in item.list" :key="i" class="jackpot-value"
              :style="{ backgroundImage: `url(${fontSprite})`, backgroundPosition: getSpritePosition(char) }"></i>
          </div>
        </div>
      </span>
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";

import jackpotBg from '@/assets/imgs/home/Img_Home_02.avif';
import fontSprite from '@/assets/imgs/home/Word_Home_04.png';

const displayValue = ref(154321012.34);
let timer = null;

// 精灵图数据：204×26，12个字符：0123456789,.
const TOTAL_CHARACTERS = 12;
const spriteChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '.'];

// 使用百分比定位
const spriteMap = spriteChars.reduce((map, char, index) => {
  const percent = (index / (TOTAL_CHARACTERS - 1)) * 100;
  map[char] = `${percent.toFixed(2)}%`;
  return map;
}, {});

const getSpritePosition = (char) => {
  const offset = spriteMap[char] || spriteMap['0'];
  return `${offset} center`;
};

// 每一位的状态
const digits = ref([]);

const format = (val) => {
  return val.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
};

// 初始化 digits
const initDigits = () => {
  const chars = format(displayValue.value).split('');
  digits.value = chars.map(char => ({
    current: char,
    list: [char],
    style: { transform: 'translateY(0)' }
  }));
};

watch(displayValue, (newVal, oldVal) => {
  const newStr = format(newVal);
  const oldStr = format(oldVal || newVal);
  const newChars = newStr.split('');

  // 确保 digits 长度足够 (通常金额长度只会增加)
  while (digits.value.length < newChars.length) {
    digits.value.unshift({ current: '0', list: ['0'], style: { transform: 'translateY(0)' } });
  }

  // 从右向左对比，处理每一位
  // 注意：由于 unshift 可能会改变索引对应关系，这里简化处理，假设长度不变或只在左侧增加
  // 实际上 toLocaleString 会自动处理千分位，导致逗号位置变化，这比较复杂。
  // 为了简化且稳健，我们直接重新映射，只对“数字位”做动画。

  // 重新对齐：从右往左对齐
  const len = newChars.length;
  const oldLen = digits.value.length; // 此时应该已经 >= len

  for (let i = 0; i < len; i++) {
    const char = newChars[len - 1 - i]; // 倒序取
    const digitIndex = digits.value.length - 1 - i;
    const digitState = digits.value[digitIndex];

    const oldChar = digitState.current;

    if (char !== oldChar && /[0-9]/.test(char) && /[0-9]/.test(oldChar)) {
      // 数字变化，生成滚动序列
      const start = parseInt(oldChar);
      const end = parseInt(char);

      let sequence = [oldChar];
      let curr = (start + 1) % 10;

      // 至少滚一圈 (10个) 以实现“快速滚动”效果，或者根据差值
      // 调整：只在原位置滚动，不额外多滚一圈
      const dist = (end - start + 10) % 10;
      // 如果 dist 为 0（即 start === end），理论上不会进入此 if，但为了保险设为 10（滚一圈）
      const totalSteps = dist === 0 ? 10 : dist;

      for (let k = 0; k < totalSteps; k++) {
        sequence.push(curr.toString());
        curr = (curr + 1) % 10;
      }
      // 确保最后是目标值 (上面的循环逻辑应该能保证，但为了保险)
      if (sequence[sequence.length - 1] !== char) {
        sequence.push(char);
      }

      digitState.list = sequence;
      digitState.current = char;

      // 重置位置到 0
      digitState.style = { transition: 'none', transform: 'translateY(0)' };

      // 触发动画
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // 计算移动百分比：(目标索引 / 总数量) * 100
          const total = sequence.length;
          const percent = ((total - 1) / total) * 100;

          // 动态调整动画时间：
          // 如果只是单步跳变（sequence.length <= 2），时间要短（0.4s），干脆利落
          // 如果是滚动（sequence.length > 2），则根据位数增加延迟感
          let duration;
          if (sequence.length <= 2) {
            duration = 0.4;
          } else {
            duration = Math.min(1.5, 0.5 + i * 0.15);
          }

          digitState.style = {
            transition: `transform ${duration}s cubic-bezier(0.45, 0.05, 0.55, 0.95)`,
            transform: `translateY(-${percent}%)`
          };
        });
      });
    } else {
      // 非数字或未变，直接更新
      digitState.current = char;
      digitState.list = [char];
      digitState.style = { transition: 'none', transform: 'translateY(0)' };
    }
  }
});

onMounted(() => {
  initDigits();
  // 模拟奖池自动增长
  timer = setInterval(() => {
    // 每3秒增加一定金额
    const increment = 100 + Math.random() * 500000;
    displayValue.value += increment;
  }, 3000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.jackpot-box {
  display: grid;
  grid-template-rows: 1fr auto;
  align-items: center;
  width: 100%;
  aspect-ratio: 16 / 9;
  max-height: clamp(84px, 20vw, 118px);
  position: relative;
  overflow: visible;
  border-radius: clamp(6px, 2vw, 12px);
}

.bg {
  grid-row: 1 / -1;
  grid-column: 1;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

.text-content {
  grid-row: 1 / -1;
  grid-column: 1;
  z-index: 1;
  width: 100%;
  height: 100%;
  margin: 0;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: clamp(6px, 3.8vw, 24px);
}

.count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0;
}

.digit-wrapper {
  position: relative;
  width: clamp(0.17rem, 4.5vw, 0.23rem);
  height: clamp(0.26rem, 6.9vw, 0.35rem);
  overflow: hidden;
  display: inline-block;
}

.digit-scroll {
  display: flex;
  flex-direction: column;
  width: 100%;
  /* 初始不偏移 */
  transform: translateY(0);
  /* 确保子元素高度撑开容器 */
}

.jackpot-value {
  /* position: absolute; 删除绝对定位，改为流式布局 */
  display: block;
  width: 100%;
  height: clamp(0.26rem, 6.9vw, 0.35rem);
  /* 必须显式指定高度，与 wrapper 一致 */
  background-size: 1200% 100%;
  background-repeat: no-repeat;
  flex-shrink: 0;
}

/* 删除旧的 transition 样式 */
</style>

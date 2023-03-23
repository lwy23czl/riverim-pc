<template>
  <div class="gradient-bg" :style="{ background: bgGradient }"></div>
</template>
<script>
export default {
  data() {
    return {
      bgGradient: 'linear-gradient(to bottom, #4CAF50, #8BC34A)'
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const windowHeight = window.innerHeight
      const fullHeight = document.documentElement.scrollHeight
      const ratio = scrollTop / (fullHeight - windowHeight)
      const color1 = [76, 175, 80] // 绿色系的起始颜色
      const color2 = [139, 195, 74] // 绿色系的结束颜色
      const color = color1.map((c1, i) => Math.round(c1 + (color2[i] - c1) * ratio))
      this.bgGradient = `linear-gradient(to bottom, rgb(${color.join(',')}), #fff)`
    }
  }
}
</script>
<style scoped>
.gradient-bg {
  width: 100%;
  height: 100vh;
}
</style>

<template>
  <div>
    首頁
    <nuxt-link to="/">首頁</nuxt-link>
    <nuxt-link to="/player/2">球員資料</nuxt-link>
    <nuxt-link to="/team">球隊介紹</nuxt-link>
    <nuxt-link to="/team/pref">球員數據</nuxt-link>
    <nuxt-link to="/404">404</nuxt-link>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data: () => ({}),
}
</script>

<style lang="scss" scoped>
</style>
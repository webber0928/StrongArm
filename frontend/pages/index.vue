<template>
  <div>首頁</div>
</template>

<script>
export default {
  async asyncData({ $axios, $api }) {
    const aaa = await $api.home.list({ page: 99 })
    // .then(res => {
    //   return res
    // })
    return {
      aaa
    }
    // const ip = await $axios.$get('http://icanhazip.com')
    // return { ip }
  },
  methods: {
    async templateCallStore() {
      await this.$store.dispatch('app/setLoading', { test:true })
    }
  }
}
</script>
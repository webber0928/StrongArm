<template>
  <div>
    <!-- <Carousel style="width: 100%;background: #f4f4f4"/> -->
    <div class="mt-10">
      首頁<v-btn @click="templateCallStore">測試store</v-btn><br/>
      <br/>
      <!-- 測試 i18n {{ $t('starter.banner_subtitle') }} -->
    </div>
    <v-row>
      <v-col><v-btn @click="switchLang('zh')">中文</v-btn></v-col>
      <v-col><v-btn @click="switchLang('en')">英文</v-btn></v-col>
    </v-row>
    <v-row class="px-3">
      <v-col sm="4" cols="12" v-for="index in 3" :key="index">
        <ProductCard
          :flat="false"
          :rating="3"
          :price="20"
          img="https://source.unsplash.com/random"
          title="優利升級方案"
          desc="截止時間： 2021/10/05 23:59"
          orientation="portrait"
          type="round"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
// import Carousel from "@/components/Slider/Carousel.vue"
import ProductCard from "@/components/Cards/ProductCard.vue"
export default {
  components: { ProductCard },
  layout: 'default',
  // async asyncData({ $axios, $api }) {
  //   // const aaa = await $api.home.list({ page: 99 })
  //   // // .then(res => {
  //   // //   return res
  //   // // })
  //   // return {
  //   //   aaa
  //   // }
  //   // const ip = await $axios.$get('http://icanhazip.com')
  //   // return { ip }
  // },
  methods: {
    async templateCallStore() {
      await this.$store.dispatch('app/setLoading', { test:true })
    },
    switchLang(lang) {
      console.log(lang, 'L30 語言')
      this.$i18n.setLocale(lang)
    }
  }
}
</script>
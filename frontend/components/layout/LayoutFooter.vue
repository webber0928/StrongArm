<template>
  <v-footer dark class="px-0 py-0">
    <v-card flat tile class="accent white--text text-center">
      <v-card-text>
        <v-btn
          v-for="(icon, i) in icons"
          :key="i"
          class="mx-4 white--text"
          :href="icon.link"
          target="_blank"
          icon
        >
          <v-icon size="24px">{{ icon.text }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0"> 強壯左手網站 </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        {{ new Date().getFullYear() }} — <strong> © 由 Webber 設計</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
export default {
  data() {
    return {
      fixed: false,
      icons: [
        {
          text: 'mdi-facebook',
          link: '',
        },
        {
          text: 'mdi-twitter',
          link: '',
        },
        {
          text: 'mdi-linkedin',
          link: '',
        },
        {
          text: 'mdi-instagram',
          link: 'https://www.google.com',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.v-card {
  width: 100%;
}
</style>

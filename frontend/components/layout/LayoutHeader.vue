<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      hide-overlay
      transition="fade-transition"
      right
      :style="{ zIndex: 6, width: '100%' }"
    >
      <v-list dense>
        <div class="text-right">
          <v-btn
            v-if="isXs"
            :class="[drawer ? 'is-active' : '', 'mt-2', 'mr-4']"
            class="hamburger hamburger--spin mobile-menu"
            icon
            small
            @click.stop="drawer = !drawer"
          >
            <span class="hamburger-box">
              <span class="bar hamburger-inner" />
            </span>
          </v-btn>
        </div>
        <v-row
          align="center"
          justify="center"
          no-gutters
        >
          <v-col cols="3" sm="3" align="center" justify="center">
            <v-avatar>
              <img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
              >
            </v-avatar>
          </v-col>
          <v-col cols="9" sm="9">
            <v-row no-gutters>
              <v-col cols="12" sm="12">
                <v-select
                  class="customLanguageSelect"
                  style="width:150px"
                  v-model="selectLanguage"
                  :items="selectLanguageItems"
                  item-text="langText"
                  item-value="lang"
                  filled
                  height="32"
                  @change="changeLanguage"
                ></v-select>
                <v-btn
                  depressed
                  rounded
                  class="ml-1"
                >
                  <v-icon
                    left
                    class="mr-0"
                  >
                    mdi-account
                  </v-icon>
                  未驗證
                </v-btn>
              </v-col>
              <v-col cols="12" sm="12">r29447737@gmail.com</v-col>
            </v-row>
          </v-col>
        </v-row>
        <v-divider class="mt-5 mb-5"></v-divider>
        <v-list-item
          v-for="([icon, text, link], i) in navItems"
          :key="i"
          @click="redirect(link)"
        >
          <v-list-item-content>
            <v-list-item-title class="subtitile">{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              產品
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      flat
      class="px-3 white"
      elevation="1"
    >
      <v-toolbar-title class="mainLogo d-flex justify-center align-center">
        <nuxt-link to="/">
          <img src="@/assets/img/logo.png" />
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        v-if="isXs"
        :class="{ 'is-active': drawer }"
        class="hamburger hamburger--spin mobile-menu"
        icon
        small
        @click.stop="drawer = !drawer"
      >
        <span class="hamburger-box">
          <span class="bar hamburger-inner" />
        </span>
      </v-btn>
      <div v-else>
        <v-btn text @click="redirect('/login')">
          <span class="mr-2">登入</span>
        </v-btn>
      </div>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      links: [
        '最新消息',
        '產品',
        '服務',
        '幫助',
        '關於',
      ],
      drawer: false,
      isXs: false,
      items: [
        ["mdi-wallet", this.$t('sidebar.sidebar_wallet'), "/wallet"],
        ["mdi-format-list-bulleted", this.$t('sidebar.sidebar_orders'), "/orders"],
        ["mdi-settings", this.$t('sidebar.sidebar_settings'), "/settings"],
        ["mdi-login", this.$t('sidebar.sidebar_login'), "/login"],
        ["mdi-login", this.$t('sidebar.sidebar_register'), "/register"]
      ],
      selectLanguageItems: [{ langText: '繁體中文', lang: 'tw' },{ langText: '簡體中文', lang: 'cn' },{ langText: 'English', lang: 'en' }],
      selectLanguage: {}
    }
  },
  methods: {
    onResize() {
      this.isXs = window.innerWidth < 850;
    },
    redirect(link) {
      this.$router.push(`${link}`)
    },
    changeLanguage(lang) {
      this.$i18n.setLocale(lang)
    }
  },
  watch: {
    isXs(value) {
      if (!value) {
        this.drawer = false
      }
    }
  },
  computed: {
    navItems() {
      return [
        ["mdi-wallet", this.$t('sidebar.sidebar_wallet'), "/wallet"],
        ["mdi-format-list-bulleted", this.$t('sidebar.sidebar_orders'), "/orders"],
        ["mdi-settings", this.$t('sidebar.sidebar_settings'), "/settings"],
        ["mdi-login", this.$t('sidebar.sidebar_login'), "/login"],
        ["mdi-login", this.$t('sidebar.sidebar_register'), "/register"]
      ];
    }
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
    this.selectLanguage = this.selectLanguageItems.find(o => o.lang === this.$i18n.locale)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
}
</script>
<style lang="scss" scoped>
.header-style {
  position: fixed;
  z-index: 1;
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
}
.v-toolbar {
  transition: 0.6s;
}
.expand {
  height: 80px !important;
  padding-top: 10px;
}
.mainLogo {
  img {
    max-height: 50px;
  }
}
.v-list-item--dense .v-list-item__title,
.v-list-item--dense .v-list-item__subtitle,
.v-list--dense .v-list-item .v-list-item__title,
.v-list--dense .v-list-item .v-list-item__subtitle {
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2rem;
}
// 修改 v-select 高度
::v-deep .v-text-field--filled > .v-input__control > .v-input__slot, .v-text-field--full-width > .v-input__control > .v-input__slot, .v-text-field--outlined > .v-input__control > .v-input__slot{
  min-height: auto!important;
}
::v-deep .v-input__append-inner {
  margin-top: 0px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .customLanguageSelect {
  display: inline-flex;
  .v-text-field__details {
    display: none;
  }
}
</style>
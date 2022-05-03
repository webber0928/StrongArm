<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      app
      hide-overlay
      :style="{ top: $vuetify.application.top + 'px', zIndex: 6 }"
    >
      <!-- <v-list>
        <v-list-item>
          <v-list-item-avatar>
            LOGO
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="title">企業名稱</v-list-item-title>
            <v-list-item-subtitle>WEB</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider /> -->
      <v-list dense>
        <!-- <v-list-item
          v-for="([icon, text, link], i) in items"
          :key="i"
          link
          @click="$vuetify.goTo(link)"
        > -->
        <v-list-item v-for="([icon, text, link], i) in items" :key="i" link @click="$vuetify.goTo(link)">
          <v-list-item-icon class="justify-center">
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="subtitile-1">{{
              text
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app flat class="px-3 white">
      <v-toolbar-title>
        Logo1 {{ drawer }}
        <!-- <v-img src="@/assets/img/logo.png" max-width="50px" /> -->
      </v-toolbar-title>
      <v-spacer />
      <!-- <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="mr-1"
        v-if="isXs"
      /> -->
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
        <v-btn text @click="$vuetify.goTo('#hero')">
          <span class="mr-2">最新消息</span>
        </v-btn>
        <v-btn text @click="$vuetify.goTo('#features')">
          <span class="mr-2">產品</span>
        </v-btn>
        <v-btn text @click="$vuetify.goTo('#download')">
          <span class="mr-2">服務</span>
        </v-btn>
        <v-btn text @click="$vuetify.goTo('#pricing')">
          <span class="mr-2">幫助</span>
        </v-btn>
        <v-btn rounded outlined text @click="$vuetify.goTo('#contact')">
          <span class="mr-2">關於</span>
        </v-btn>
      </div>
    </v-app-bar>
  </div>
  <!-- <v-app-bar
    app
    color="white"
    flat
  >
    <v-app-bar-nav-icon class="hidden-lg-and-up" @click="$emit('toggleMenu')"></v-app-bar-nav-icon>
    <v-container class="py-0 fill-height">
      <div>LOGO</div>
      <v-btn
        v-for="link in links"
        :key="link"
        text
      >
        {{ link }}
      </v-btn>
      <v-spacer></v-spacer>
    </v-container>
  </v-app-bar> -->
</template>
<script>
export default {
  data() {
    return {
      links: ["最新消息", "產品", "服務", "幫助", "關於"],
      drawer: false,
      isXs: false,
      items: [
        ["mdi-home-outline", "最新消息", "#hero"],
        ["mdi-information-outline", "產品", "#features"],
        ["mdi-download-box-outline", "服務", "#download"],
        ["mdi-currency-usd", "幫助", "#pricing"],
        ["mdi-email-outline", "關於", "#contact"],
      ],
    };
  },
  methods: {
    onResize() {
      this.isXs = window.innerWidth < 850;
    },
  },
  watch: {
    isXs(value) {
      if (!value) {
        if (this.drawer) {
          this.drawer = false;
        }
      }
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },
};
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
</style>

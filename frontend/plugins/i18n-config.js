export default function({ app }) {
    console.log(app.i18n.locale, 'L2 app i18n locale')
    // beforeLanguageSwitch called right before setting a new locale
    if (app.i18n.locale === 'ar') {
      app.head.htmlAttrs.dir = 'rtl'
    } else {
      app.head.htmlAttrs.dir = 'ltr'
    }
    // console.log(app.i18n, 'L111')
    app.i18n.onBeforeLanguageSwitch = (oldLocale, newLocale) => {
      console.log(oldLocale, 'old語言')
      console.log(newLocale, '新語言')
      if (newLocale === 'ar') {
        app.vuetify.framework.rtl = true
        app.head.htmlAttrs.dir = 'rtl'
      } else {
        app.vuetify.framework.rtl = false
        app.head.htmlAttrs.dir = 'ltr'
      }
    }
  }
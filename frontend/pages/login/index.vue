<template>
  <div class="page-wrap">
    <v-container class="inner-wrap">
      <div class="auth-frame">
        <v-row align="center">
          <v-col
            align-self="center"
            md="6"
            lg="4"
            offset-md="3"
            offset-lg="4"
            class="px-sm-6 px-2"
            cols="12"
            align="center"
          >
            <div class="form-box">
              <div class="form-wrap">
                <div>
                  <div class="head">
                    <h3 class="use-text-subtitle">
                      {{ $t('common.login_title') }}
                    </h3>
                  </div>
                  <v-form
                    ref="form"
                    v-model="valid"
                  >
                    <v-row class="spacing3">
                      <v-col cols="12" sm="12" class="px-3">
                        <v-text-field
                          v-model="email"
                          :rules="emailRules"
                          :label="$t('common.login_email')"
                          color="secondary"
                          name="email"
                          required
                        />
                      </v-col>
                      <v-col cols="12" sm="12" class="px-3">
                        <v-text-field
                          v-model="password"
                          :label="$t('common.login_password')"
                          :rules="passwordRules"
                          color="secondary"
                          type="password"
                          name="password"
                          autocomplete
                          required
                        />
                      </v-col>
                    </v-row>
                    <div class="form-helper mt-3">
                      <div class="form-control-label">
                        <v-checkbox
                          v-model="checkbox"
                          :label="$t('common.login_remember')"
                          color="secondary"
                        />
                      </div>
                      <div>
                        <v-btn
                          small
                          class="button-link"
                          text
                          to="/register"
                          nuxt
                        >
                          {{ $t('common.register') }}
                        </v-btn>
                        <v-btn
                          small
                          class="button-link"
                          text
                          to="/"
                          nuxt
                        >
                          {{ $t('common.login_forgot') }}
                        </v-btn>
                      </div>
                    </div>
                    <div class="btn-area">
                      <v-btn
                        large
                        block
                        color="primary"
                        :loading="loading"
                        @click="handleSubmit"
                      >
                        {{ $t('common.login') }}
                      </v-btn>
                    </div>
                  </v-form>
                </div>
              </div>
            </div>
          </v-col>
          <!-- <v-col md="6" class="px-6" cols="12">
            <div class="greeting">
              <h4 class="use-text-title2 pb-2">
                {{ title }}
              </h4>
              <h6 class="use-text-subtitle2">
                {{ subtitle }}
              </h6>
              <div class="img">
              </div>
            </div>
          </v-col> -->
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
</style>

<script>
export default {
  components: {
  },
  data() {
    return {
      valid: true,
      email: null,
      password: null,
      checkbox: false,
      loading: false,
      step: 1,
      emailRules: [
        v => !!v || this.$t('common.login_email_required'),
        v => /.+@.+\..+/.test(v) || this.$t('common.login_eamil_valid')
      ],
      passwordRules: [
        v => !!v || this.$t('common.login_password_required')
      ]
    }
  },
  props: {
    title: {
      type: String,
      default: 'title'
      // required: true
    },
    subtitle: {
      type: String,
      default: 'subtitle'
    },
    type: {
      type: String,
      default: 'type'
    }
  },
  methods: {
    handleSubmit() {
      if (this.$refs.form.validate()) {
        this.loading = true
        console.log(this.email, 'email')
        console.log(this.password, 'password')
        console.log('data submited')
        setTimeout(() => {
          this.loading = false
          this.step = 2
        }, 1000)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.page-wrap {
  min-height: 100%;
  position: relative;
  width: 100%;
  align-items: center;
  a {
    text-transform: none;
    font-size: 16px;
    text-decoration: none;
    font-weight: $font-regular;
  }
}
.full-form-wrap {
  padding-top: $spacing8;
}
.v-card.form-box {
  overflow: hidden;
  background: transparent;
  border: 1px solid $palette-primary-main;
  &.map-form {
  }
}
.desc {
  text-align: center;
  padding: spacing(0, 10);
}
.form {
  position: relative;
  margin-top: $spacing8;
  padding: spacing(0, 8, 10);
}
.form-helper {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 14px;
}
.btn-area {
  justify-content: space-between;
  button.v-btn.v-size--large {
    margin-top: $spacing2;
    min-height: 48px;
    min-width: 180px;
  }
  span {
    a.link {
      text-decoration: none !important;
      color: $palette-secondary-main
    }
  }
  &.flex {
    display: flex;
    justify-content: space-between;
  }
}
.right-icon {
  margin-left: $spacing1;
}
.check {
  svg {
    fill: $palette-secondary-main
  }
}
.auth-frame {
  display: block;
  position: relative;
  .row > div {
    padding: 0
  }
}
.greeting {
  display: flex;
  padding-top: $spacing5;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  text-align: center;
  h6 {
    color: $palette-primary-main;
    font-weight: $font-regular
  }
}
.img {
  margin: spacing(5, 0)
}
.head {
  text-align: center;
  margin-bottom: $spacing5;
  text-transform: capitalize;
}
.form-wrap {
  position: relative;
  padding: $spacing1;
}
.socmed-side-login {
  display: flex;
  justify-content: space-around;
  > * {
    color: $palette-common-white;
    width: 150px;
    padding: $spacing1;
  }
  i {
    color: $palette-common-white;
    margin-right: $spacing1;
  }
}
.blue-btn {
  background: #28aae1 !important;
  &:hover {
    background: darken(#28aae1, 20%) !important
  }
}
.navi-btn {
  background: #3b579d !important;
  &:hover {
    background: darken(#3b579d, 20%) !important
  }
}
.red-btn {
  background: #dd493c !important;
  &:hover {
    background: darken(#dd493c, 20%) !important
  }
}
.separator {
  margin: 40px auto;
  max-width: 300px;
  min-width: 200px;
  text-align: center;
  position: relative;
  p {
  }
  &:before, &:after {
    content: "";
    border-top: 1px solid;
    top: 50%;
    position: absolute;
    width: 20%
  }
  &:before {
    left: 0
  }
  &:after {
    right: 0
  }
}
.form-control-label {
  a {
    position: relative;
    top: -20px
  }
  > div {
    margin-top: 0
  }
}
.map {
  position: relative;
  z-index: 20;
  overflow: hidden;
  color: $light-text-primary;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.4);
  height: 745px;
  ::v-deep .GMap__Wrapper{
    height: 745px;
  }
  &.full {
    height: 952px;
    ::v-deep .GMap__Wrapper{
      height: 952px;
    }
  }
}
.bubel-wrap {
  height: 300px;
  position: relative
}
.icon {
  color: #607D8B;
  font-size: 16px;
}
</style>
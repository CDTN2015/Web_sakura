<template>
  <div class="login">
    <v-container class="mx-16">
      <v-card class="mx-auto" max-width="400" max-height="800" tile color="grey lighten-4">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row align="center" dense>
            <v-col class="ml-16" cols="12" sm="8">
              <div class="blue--text font-weight-black ml-16 my-4" style="font-size: 2rem">用户登录</div>
            </v-col>
            <v-col class="ml-16" cols="12" sm="8">
              <v-text-field v-model="user_name" :rules="[rules.user_name]" label="用户昵称" maxlength="18" counter="18"
                            class="input-group--focused"></v-text-field>
            </v-col>
            <v-col class="ml-16" cols="12" sm="8">
              <v-text-field v-model="password" :append-icon="show_pwd ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.pwd]" maxlength="18" counter="18" :type="show_pwd ? 'text' : 'Password'"
                            label="密码" class="input-group--focused" @click:append="show_pwd = !show_pwd"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-row align="center" dense>
          <v-col class="ml-16" cols="12" sm="12">
            <v-btn rounded @click="verify" color="blue" width="280">
              <v-icon left color="white">login</v-icon>
              <div class="white--text font-weight-black" style="font-size: 1rem">登录</div>
            </v-btn>
          </v-col>
          <v-col class="ml-16" cols="12" sm="12">
            <v-btn rounded @click="verify_admin" color="blue" width="280">
              <v-icon left color="white">admin_panel_settings</v-icon>
              <div class="white--text font-weight-black" style="font-size: 1rem">管理员入口</div>
            </v-btn>
          </v-col>
          <v-col class="ml-16" cols="12" sm="12">
            <v-btn rounded link to="/register" color="grey lighten-2" width="280">
              <v-icon left>assignment</v-icon>
              <div class="font-weight-black" style="font-size: 1rem">注册</div>
            </v-btn>
          </v-col>


          <v-col class="ml-16" cols="12" sm="12">
            <div class="grey--text ml-16" style="font-size: 0.75rem">Build by CDTN2015,
              <a href="https://github.com/CDTN2015">GitHub</a>
            </div>
            <div class="grey--text ml-n10" style="font-size: 0.75rem">Protected by Beijing University of Post and
              Telecommunications.
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      show_pwd: false,
      valid: true,

      user_name: null,
      password: null,

      rules: {
        user_name: value => !!value || '需要用户昵称',
        pwd: value => !!value || '需要密码',
      },
    }
  },
  methods: {
    verify: function () {
      let _this = this
      if (this.$refs.form.validate()) {
        let rasPw = this.$getRsaCode(this.password);
        this.$axios.post('/api/login', {
          'username': this.user_name,
          'password': rasPw,
        })
            .then(function (response) {
              if (response.data.success) {
                console.log(response)
                console.log("用户登录成功")
                let date = new Date()
                let expiresDays = 10
                date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000)
                document.cookie = "username=" + _this.user_name + "; expires=" + date.toUTCString()
                _this.$router.push({path: '/home', name: 'Home'})
              }
            })
            .catch(function (error) {
              console.log(error)
            })
      }
    },
    verify_admin: function () {
      let _this = this
      if (this.$refs.form.validate()) {
        let rasPw = this.$getRsaCode(this.password);
        this.$axios.post('/api/login', {
          'username': this.user_name,
          'password': rasPw,
        })
            .then(function (response) {
              console.log(response)
              if (response.data.success) {
                console.log("管理员登录成功")
                let date = new Date()
                let expiresDays = 10
                date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000)
                document.cookie = "username=" + _this.user_name + "; expires=" + date.toUTCString()
                _this.$router.push({path: '/admin', name: 'Admin'})
              }
            })
            .catch(function (error) {
              console.log(error)
            })
      }
    },
  }
}
</script>

<style scoped>

</style>
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
                            hint="数字，字母，下划线" class="input-group--focused"></v-text-field>
            </v-col>

            <v-col class="ml-16" cols="12" sm="8">
              <v-text-field v-model="password" :append-icon="show_pwd ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.pwd]" maxlength="18" counter="18"
                            :type="show_pwd ? 'text' : 'Password'" label="密码" hint="数字，字母，下划线"
                            class="input-group--focused" @click:append="show_pwd = !show_pwd"></v-text-field>
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
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      ip: 'http://101.200.57.25:5002',

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
      if (this.$refs.form.validate()) {
        let fd = new FormData()
        let url = this.ip + "/api/user/login"
        fd.append('username', this.user_name)
        fd.append('password', this.password)

        this.$router.push({path: '/register'})

        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        axios.post(url, fd, config).then(res => {
          console.log(res)
          if (res.data.code === 200 && res.data.data.role === "manager") {
            console.log("登录成功");
          }
        })
      }
    },
  }
}
</script>

<style scoped>

</style>
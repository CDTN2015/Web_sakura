<template>
  <div class="home">
    <Navbar></Navbar>
    <v-card class="mx-auto" max-width="400" max-height="800" color="grey lighten-4">
      <v-form ref="form" lazy-validation>
        <v-row align="center" dense>
          <v-col class="ml-16" cols="12" sm="8">
            <div class="blue--text font-weight-black ml-16 my-4" style="font-size: 2rem">用户信息</div>
          </v-col>
          <v-col class="ml-16" cols="12" sm="8">
            <v-text-field :value="`${user_info.username}`" label="用户昵称" outlined readonly></v-text-field>
          </v-col>
          <v-col class="ml-16" cols="12" sm="8">
            <v-text-field :value="`${user_info.realName}`" label="真实姓名" outlined readonly></v-text-field>
          </v-col>
          <v-col class="ml-4" cols="12" sm="4">
            <v-text-field :value="`${cards[user_info.creditType].type}`" label="证件类别" outlined readonly></v-text-field>
          </v-col>
          <v-col class="ml-2" cols="12" sm="7">
            <v-text-field :value="`${user_info.creditValue}`" label="证件号码" outlined readonly></v-text-field>
          </v-col>
          <v-col class="ml-16" cols="12" sm="8">
            <v-text-field :value="`${user_info.tel}`" label="电话号码" outlined readonly></v-text-field>
          </v-col>
          <v-col class="ml-16" cols="12" sm="8">
            <v-textarea :value="`${user_info.description}`" label="个人简介" outlined readonly no-resize></v-textarea>
          </v-col>

          <v-col class="ml-2" cols="12" sm="6">
            <v-btn rounded color="blue" width="180" @click="modifyUserInfo">
              <v-icon left color="white">change_circle</v-icon>
              <div class="white--text font-weight-black" style="font-size: 1rem">修改个人信息</div>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="4">
            <v-btn rounded color="red" width="180" @click="dialog_p = true">
              <v-icon left class="white--text">vpn_key</v-icon>
              <div class="font-weight-black white--text" style="font-size: 1rem">修改密码</div>
            </v-btn>
          </v-col>

          <v-dialog v-model="dialog_u" persistent max-width="500">
            <v-card>
              <v-card-title class="headline">修改个人信息</v-card-title>
              <v-form ref="form" v-model="valid_u" lazy-validation>
                  <v-col class="ml-8" cols="12" sm="6">
                    <v-text-field v-model="phone" :rules="[rules.tel]" label="电话号码" counter="11"
                                  maxlength="11" class="input-group--focused"></v-text-field>
                  </v-col>
                  <v-col class="ml-8" cols="12" sm="10">
                    <v-textarea v-model="description" :rules="[rules.description]" label="个人简介" counter
                                maxlength="100" height="80" rows="3" no-resize
                                single-line class="input-group--focused"></v-textarea>
                  </v-col>
              </v-form>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog_u = false">取消</v-btn>
                <v-btn color="green darken-1" text @click="pushUserInfo">修改</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialog_p" persistent max-width="500">
            <v-card>
              <v-card-title class="headline">修改密码</v-card-title>
              <v-form ref="form" v-model="valid_p" lazy-validation>
                  <v-col class="ml-8" cols="12" sm="6">
                    <v-text-field v-model="password" :append-icon="show_pwd ? 'mdi-eye' : 'mdi-eye-off'"
                                  :rules="[rules.pwd]" maxlength="18" counter="18"
                                  :type="show_pwd ? 'text' : 'Password'" label="密码" hint="数字，字母，下划线"
                                  class="input-group--focused" @click:append="show_pwd = !show_pwd"></v-text-field>
                  </v-col>
              </v-form>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog_p = false">取消</v-btn>
                <v-btn color="green darken-1" text @click="modifyPassword">修改</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-col class="ml-2" cols="12" sm="12"></v-col>
        </v-row>
      </v-form>
    </v-card>

  </div>
</template>


<script>
import Navbar from "@/views/user/Navbar"

export default {
  name: "Home",
  created() {
    let _this = this
    this.$axios.post('/api/getUserInfo', {})
        .then(function (response) {
          console.log(response)
          console.log("获取用户信息成功")
          _this.user_info = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
  },
  data() {
    return {
      valid_u: true,
      valid_p: true,
      show_pwd: false,
      dialog_u: false,
      dialog_p: false,

      password: null,
      phone: null,
      description: null,
      user_info: {
        "username": null,
        "realName": null,
        "creditType": 1,
        "creditValue": null,
        "tel": null,
        "description": null,
        "city": null
      },
      cards: [
        {type: '居民身份证', color: 'blue lighten-4', value: '0'},
        {type: '护照', color: 'red lighten-4', value: '1'},
        {type: '军官证', color: 'green lighten-4', value: '2'},
      ],
      rules: {
        pwd: value => {
          if (!value)
            return '需要密码'
          else if (value.length < 8)
            return '不能少于8位'
          else if (!/^\w{8,18}$/.test(value))
            return '只能包含字母、数字、下划线'
          return true
        },
        tel: value => {
          if (!value || value.length < 11)
            return '需要联系方式'
          else if (!/^1[3-9]\d{9}$/.test(value))
            return '只能是数字'
          return true
        },
        description: value => !!value || '需要个人简介',
      },
    }
  },
  components: {Navbar},
  methods: {
    modifyUserInfo: function () {
      this.dialog_u = true
      this.phone = this.user_info.tel
      this.description = this.user_info.description
    },
    pushUserInfo: function () {
      let _this = this
      if(this.$refs.form.validate()){
        this.$axios.post('/api/modifyUserInfo', {
          'tel': this.phone,
          'description': this.description,
        })
            .then(function (response) {
              if (response.data.success) {
                console.log(response)
                console.log("修改用户信息成功")
                _this.user_info.tel = _this.phone
                _this.user_info.description = _this.description
                _this.dialog_u = false
              }
            })
            .catch(function (error) {
              console.log(error)
            })
      }
    },
    modifyPassword: function () {
      let _this = this
      if(this.$refs.form.validate()){
        let rasPw = this.$getRsaCode(this.password);
        this.$axios.post('/api/modifyPassword', {
          'password': rasPw,
        })
            .then(function (response) {
              if (response.data.success) {
                console.log(response)
                console.log("修改用户密码成功")
                _this.dialog_p = false
              }
            })
            .catch(function (error) {
              console.log(error)
            })
      }
    }
  }
}
</script>

<style scoped>

</style>
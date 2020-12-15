<template>
  <div class="register">
    <v-container class="mx-16">
      <v-card class="mx-auto" max-width="400" max-height="800" tile color="grey lighten-4">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row align="center" dense>

            <v-col class="ml-16" cols="12" sm="8">
              <div class="blue--text font-weight-black ml-16 my-4" style="font-size: 2rem">账号注册</div>
            </v-col>

            <v-col class="ml-16" cols="12" sm="8">
              <v-text-field v-model="user_name" :rules="[rules.user_name]" label="用户昵称" maxlength="18" counter="18"
                            hint="数字，字母，下划线" class="input-group--focused"></v-text-field>
            </v-col>
            <v-col class="ml-16" cols="12" sm="8">
              <v-text-field v-model="real_name" :rules="[rules.real_name]" label="真实姓名" hint="请如实填写"
                            counter class="input-group--focused"></v-text-field>
            </v-col>

            <v-col class="ml-16" cols="12" sm="8">
              <v-text-field v-model="password" :append-icon="show_pwd ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.pwd]" maxlength="18" counter="18"
                            :type="show_pwd ? 'text' : 'Password'" label="密码" hint="数字，字母，下划线"
                            class="input-group--focused" @click:append="show_pwd = !show_pwd"></v-text-field>
            </v-col>

            <v-col class="ml-8" cols="12" sm="4">
              <v-select v-model="select_card" :background-color="`${select_card.color}`" :items="cards" item-text="type"
                        label="证件类型" persistent-hint return-object></v-select>
            </v-col>
            <v-col class="ml-2" cols="12" sm="6">
              <v-text-field v-model="card_num" :rules="[rules.card_num(card_num, select_card)]" label="证件编码"
                            hint="支持18位身份证、9位护照"
                            counter="18" maxlength="18" class="input-group--focused"></v-text-field>
            </v-col>

            <v-col class="ml-8" cols="12" sm="6">
              <v-text-field v-model="phone" :rules="[rules.tel]" label="电话号码" counter="11"
                            maxlength="11" class="input-group--focused"></v-text-field>
            </v-col>
            <v-col class="ml-2" cols="12" sm="4">
              <v-select v-model="select_city" :items="cites" item-text="name" label="城市" persistent-hint
                        return-object></v-select>
            </v-col>

            <v-col class="ml-8" cols="12" sm="10">
              <v-textarea v-model="description" :rules="[rules.description]" label="个人简介" counter
                          maxlength="100" height="80" rows="3" no-resize
                          single-line class="input-group--focused"></v-textarea>
            </v-col>
          </v-row>
        </v-form>

        <v-row align="center" dense>
          <v-col class="ml-16" cols="12" sm="12">
            <v-btn rounded @click="verify" color="blue" width="280">
              <v-icon left color="white">assignment</v-icon>
              <div class="white--text font-weight-black" style="font-size: 1rem">注册</div>
            </v-btn>
          </v-col>
          <v-col class="ml-16" cols="12" sm="12">
            <v-btn rounded link to="/login" color="grey lighten-2" width="280">
              <v-icon left>login</v-icon>
              <div class="font-weight-black" style="font-size: 1rem">登录</div>
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
  name: "Register",
  data() {
    return {
      show_pwd: false,
      valid: false,

      user_name: null,
      real_name: null,
      password: null,
      card_num: null,
      phone: null,
      description: null,
      select_card: {type: '居民身份证', color: 'blue lighten-4', value: '0'},
      cards: [
        {type: '居民身份证', color: 'blue lighten-4', value: '0'},
        {type: '护照', color: 'red lighten-4', value: '1'},
        {type: '军官证', color: 'green lighten-4', value: '2'},
      ],
      select_city: {name: '北京'},
      cites: [
        {name: '北京'},
        {name: '上海'},
        {name: '西安'},
        {name: '香港'},
        {name: '台北'},
      ],
      rules: {
        user_name: value => {
          if (!value)
            return '需要用户昵称'
          else if (value.length < 4)
            return '不能少于4位'
          else if (!/^\w{4,18}$/.test(value))
            return '只能包含字母、数字、下划线'
          return true
        },
        real_name: value => !!value || '需要用户真实姓名',
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
            return '不是标准电话号'
          return true
        },
        card_num: function (num, card) {
          if (!num)
            return '需要' + card.type + '号'
          else if (!(/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/).test(num) && card.type === '居民身份证')
            return '不是标准' + card.type + '号'
          else if (!(/^((1[45][0-9]{7})|([PpSs]\d{7})|([SsGg]\d{8})|((Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff)\d{8})|([HhMm]\d{8,10}))$/).test(num) && card.type === '护照')
            return '不是标准' + card.type + '号'
          else if (!(/^[\\u4E00-\\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/).test(num) && card.type === '军官证')
            return '不是标准' + card.type + '号'
          return true
        },
        description: value => !!value || '需要个人简介',
      },
    }
  },
  methods: {
    verify: function () {
      let _this = this
      if(this.$refs.form.validate()){
        let rasPw = this.$getRsaCode(this.password);
        this.$axios.post('/api/register', {
          'username': this.user_name,
          'password': rasPw,
          'realName': this.real_name,
          'creditType': parseInt(this.select_card.value),
          'creditValue': this.card_num,
          'tel': this.phone,
          'description': this.description,
          'city': this.select_city.name,
        })
            .then(function (response) {
              console.log(response)
              console.log("注册成功")
              _this.$router.push({path: '/login'})
            })
            .catch(function (error) {
              console.log(error)
            })
      }

    }
  },
}
</script>

<style scoped>

</style>
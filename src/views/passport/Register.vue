<template>
  <div class="register">
    <v-container class="ma-16">
      <v-card class="mx-auto" max-width="400" max-height="800" tile color="grey lighten-4">
        <v-row align="center" no-gutters>
          <v-col class="ml-16" cols="12" sm="8">
            <div class="blue--text font-weight-black mx-12 my-4" style="font-size: 2rem">REGISTER</div>
          </v-col>

          <v-col class="ml-16" cols="12" sm="8">
            <v-text-field :rules="[rules.required, rules.usr_max, rules.usr_min, rules.username]" label="User Name"
                          hint="Numbers, characters and _" counter="18" class="input-group--focused"></v-text-field>
          </v-col>
          <v-col class="ml-16" cols="12" sm="8">
            <v-text-field :rules="[rules.required]" label="True Name" hint="Type whatever you want"
                          counter class="input-group--focused"></v-text-field>
          </v-col>

          <v-col class="ml-16" cols="12" sm="8">
            <v-text-field :append-icon="show_pwd ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                          :type="show_pwd ? 'text' : 'Password'" label="Password" hint="As complex as you want"
                          class="input-group--focused" @click:append="show_pwd = !show_pwd"></v-text-field>
          </v-col>
          <v-col class="ml-16" cols="12" sm="8">
            <v-text-field :append-icon="show_pwd ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]"
                          :type="show_pwd ? 'text' : 'Password'" label="Password Again"
                          class="input-group--focused" @click:append="show_pwd = !show_pwd"></v-text-field>
          </v-col>

          <v-col class="ml-8" cols="12" sm="4">
            <v-select v-model="select_card" :background-color="`${select_card.color}`" :items="cards" item-text="type"
                      label="Certificates"
                      persistent-hint return-object></v-select>
          </v-col>
          <v-col class="ml-2" cols="12" sm="6">
            <v-text-field :rules="[rules.required, rules.min]" label="Serial Number" hint="Please follow the format"
                          class="input-group--focused"></v-text-field>
          </v-col>

          <v-col class="ml-8" cols="12" sm="6">
            <v-text-field :rules="[rules.required, rules.tel]" label="Phone Number"
                          class="input-group--focused"></v-text-field>
          </v-col>
          <v-col class="ml-2" cols="12" sm="4">
            <v-select v-model="select_city" :items="cites" item-text="name"
                      label="Cites"
                      persistent-hint return-object></v-select>
          </v-col>

          <v-col class="ml-16" cols="12" sm="12">
            <v-btn rounded link to="" color="blue" width="280">
              <v-icon left color="white">assignment</v-icon>
              <div class="white--text">Register</div>
            </v-btn>
          </v-col>
          <v-col class="ml-16" cols="12" sm="12">
            <v-btn rounded link to="/login" color="grey lighten-2" width="280">
              <v-icon left>login</v-icon>
              <div>Login</div>
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
      watch: {},
      rules: {
        required: value => !!value || 'Required.',
        username: value => {
          //4-18 Number, character, _
          const pattern = /^\w{4,18}$/
          return pattern.test(value) || 'Invalid username'
        },
        tel: value => {
          //8-18 Number, character, _
          const pattern = /^\w{8,18}$/
          return pattern.test(value) || 'Invalid password'
        },
        usr_min: value => value.length >= 4 || 'More than 4 characters',
        usr_max: value => value.length <= 18 || 'Less than 18 characters',
        min: v => v.length >= 8 || 'Min 8 characters',
        geshi: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        max: value => (value || '').length <= 20 || 'Max 20 characters',
      },
      certificates: [
        {
          type: 'ID card',
          rule: '^[1-9]\\\\d{5}(18|19|20)\\\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\\\d{3}[0-9Xx]$'
        },
        {
          type: 'Passport',
          rule: '^((1[45][0-9]{7})|([P|p|S|s]\\\\d{7})|([S|s|G|g]\\\\d{8})' + '|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\\\\d{8})|([H|h|M|m]\\\\d{8,10}))$'
        },
        {type: 'Military card', rule: '^[\\\u4E00-\\\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$'},
      ],
      select_card: {type: 'ID card', color: 'blue lighten-4'},
      cards: [
        {type: 'ID card', color: 'blue lighten-4'},
        {type: 'Passport', color: 'red lighten-4'},
        {type: 'Military card', color: 'green lighten-4'},
      ],
      select_city: {name: 'Beijing'},
      cites: [
        {name: 'Beijing'},
        {name: 'Shanghai'},
        {name: 'Xi\'an'},
        {name: 'Hang Kong'},
        {name: 'Taipei'},
      ],
    }
  }
}
</script>

<style scoped>

</style>
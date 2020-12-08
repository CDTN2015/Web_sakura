<template>
  <div class="login">
    <v-container class="ma-16">
      <v-card class="mx-auto" max-width="400" max-height="800" tile color="grey lighten-4">
        <v-row class="ml-4" align="center" dense>
          <v-col class="justify-center ml-16" cols="12" sm="8">
            <div class="blue--text font-weight-black ml-16 my-4" style="font-size: 2rem">LOGIN</div>
          </v-col>
        </v-row>
        <v-row class="ml-0" align="center" dense>
          <v-col class="ml-16" cols="12" sm="8">
            <v-text-field label="User Name" class="input-group--focused"></v-text-field>
          </v-col>

          <v-col class="ml-16" cols="12" sm="8">
            <v-text-field :append-icon="show_pwd ? 'mdi-eye' : 'mdi-eye-off'" :type="show_pwd ? 'text' : 'Password'"
                          label="Password" class="input-group--focused"
                          @click:append="show_pwd = !show_pwd"></v-text-field>
          </v-col>
        </v-row>

        <v-row align="center" dense>
          <v-col class="ml-16" cols="12" sm="12">
            <v-btn rounded link to="" color="blue" width="280">
              <v-icon left color="white">login</v-icon>
              <div class="white--text">Login</div>
            </v-btn>
          </v-col>
          <v-col class="ml-16" cols="12" sm="12">
            <v-btn rounded link to="/register" color="grey lighten-2" width="280">
              <v-icon left>assignment</v-icon>
              <div>Register</div>
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
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <div class="passport">

    <v-container class="ma-16">
      <v-card class="mx-auto" max-width="400" max-height="800" tile color="grey lighten-4">
        <v-row align="center" dense>
          <v-col class="justify-center ml-16" cols="12" sm="8">
            <div class="blue--text font-weight-black ml-16 my-4" style="font-size: 2rem">欢迎访问</div>
          </v-col>

          <v-col class="ml-15" cols="12" sm="12">
            <v-btn rounded link to="/register" color="blue" width="280">
              <v-icon left color="white">assignment</v-icon>
              <div class="white--text font-weight-black" style="font-size: 1rem">没有账号？</div>
            </v-btn>
          </v-col>
          <v-col class="ml-15" cols="12" sm="12">
            <v-btn rounded link to="/login" color="grey lighten-2" width="280">
              <v-icon left>login</v-icon>
              <div class="font-weight-black" style="font-size: 1rem">已有账号？</div>
            </v-btn>
          </v-col>

          <v-col class="ml-16" cols="12" sm="12">
            <div class="grey--text ml-16" style="font-size: 0.75rem">Build by CDTN2015,
              <a href="https://github.com/CDTN2015">GitHub</a>.
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
  name: "Passport",
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>

</style>
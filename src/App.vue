<template>
  <v-app class="grey light-4">
    <v-img id="skins" src="https://raw.githubusercontent.com/CDTN2015/sources/master/img/arknigths2.jpg">
      <nav>
        <v-toolbar style="background-color: #66ccff">
          <v-toolbar-title class="text--uppercase white--text">
            <span class="font-weight-bold" style="font-size: 3rem">召集令</span>
            <span class="font-weight-medium" style="font-size: 2rem">Calls</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="blue" href="https://github.com/YuHover/Reward">
            <span class="white--text font-weight-black">联系我们</span>
            <v-icon right class="white--text">contact_page</v-icon>
          </v-btn>
        </v-toolbar>
      </nav>
      <v-main class="ma-4">
        <router-view></router-view>
      </v-main>
    </v-img>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {}
  },
}

</script>

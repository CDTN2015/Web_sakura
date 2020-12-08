<template>
  <v-app class="grey light-4">
    <v-img id="skins" src="./views/sources/images/hibiki.png" alt="hibiki" max-height="937px">
      <nav>
        <v-toolbar flat app style="background-color: #66ccff">
          <v-toolbar-title class="text--uppercase white--text">
            <span class="font-weight-bold" style="font-size: 4rem">C</span>
            <span class="font-weight-medium" style="font-size: 3rem">alls</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn flat color="blue" href="https://github.com/YuHover/Reward">
            <span class="white--text">Contact US</span>
            <v-icon right class="white--text">contact_page</v-icon>
          </v-btn>
        </v-toolbar>
      </nav>
      <v-content class="ma-4">
        <router-view></router-view>
      </v-content>
    </v-img>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data() {
    return {
      images: [
        {name: 'hibiki', src: './sources/images/hibiki.png'},
        {name: 'amiya', src: './sources/images/amiya.jpg'},
      ]
    }
  },

  methods: {
    change: function (){
      //let temp = document.getElementById('skins');

    }
  }
}

</script>

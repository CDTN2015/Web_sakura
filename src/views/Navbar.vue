<template>
    <v-navigation-drawer app right class="my-16" expand-on-hover height="270px">
      <v-divider></v-divider>
      <v-list-item style="background-color: #66ccff">
        <v-icon left class="white--text">account_box</v-icon>
        <v-list-item-title class="white--text">{{ user_name }}</v-list-item-title>
      </v-list-item>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link :to="{path: item.link,name: item.name, params: {username: user_name}}">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
  name: "Navbar",
  created() {
    /*console.log(typeof this.$route.params.username)
    if(typeof this.$route.params.username === 'undefined'){
      this.$router.push({path: '/'})
    }
   else{
      this.user_name = this.$route.params.username
      console.log(this.user_name)
    }*/
  },
  data() {
    return {
      //user_name: null,
      user_name: "CDTN2015",
      items: [
        {title: '用户信息管理', icon: 'home', link: '/home', name: 'Home'},
        {title: '召集令信息查询', icon: 'find_in_page', link: '/find', name: 'Find'},
        {title: '我是令主', icon: 'add_task', link: '/call', name: 'Call'},
        {title: '我要接令', icon: 'fact_check', link: '/response', name: 'Response'},
        {title: '统计报表', icon: 'timeline', link: '/report', name: 'Report'},
      ],
    }
  }
}
</script>

<style scoped>

</style>
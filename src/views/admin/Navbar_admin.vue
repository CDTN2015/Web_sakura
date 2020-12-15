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
  name: "Navbar_admin",
  created() {
    let str_cookie = document.cookie
    let arr_cookie = str_cookie.split("; ")
    let temp = arr_cookie[0].split("=")
    if(typeof temp[1] === 'undefined'){
      console.log("用户未登录")
      this.$router.push({path: '/'})
    }
    else{
      console.log("检测到保存的用户数据")
      this.user_name = temp[1]
    }
  },
  data() {
    return {
      user_name: null,
      items: [
        {title: '召集令信息查询', icon: 'find_in_page', link: '/admin', name: 'Admin'},
        {title: '统计报表', icon: 'timeline', link: '/report', name: 'Report'},
      ],
    }
  }
}
</script>

<style scoped>

</style>
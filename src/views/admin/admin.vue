<template>
  <div class="admin">
    <Navbar_admin></Navbar_admin>
    <v-card class="mx-auto" tile color="grey lighten-4" max-width="800">
      <v-card-title class="headline">召集令列表</v-card-title>
      <v-row dense>
        <v-col class="ml-8" cols="8" sm="3">
          <v-text-field label="召集令名称" v-model="name"
                        hint="模糊查询" class="input-group--focused"></v-text-field>
        </v-col>

        <v-col class="ml-8" cols="8" sm="2">
          <v-select v-model="select_card" :items="cards" item-text="type"
                    label="召集令类型" persistent-hint return-object></v-select>
        </v-col>
        <v-col class="ml-8" cols="8" sm="3">
          <v-checkbox v-model="checkbox" :label="`查询策略:${checkbox? '仅有效信息' : '仅查询无效信息'}`"></v-checkbox>
        </v-col>
        <v-col class="ml-8 my-4" cols="8" sm="1">
          <v-btn @click="find" color="blue">
            <v-icon left color="white">assignment</v-icon>
            <div class="font-weight-black white--text">查询</div>
          </v-btn>
        </v-col>
      </v-row>
      <v-card flat class="pa-6" color="grey lighten-4" v-for="item in list" :key="item.id" @click="detail(item)">
        <v-layout row wrap :class="`mx-4 item ${status[item.status].name}`">
          <v-row>
            <v-col clos="12" sm="2">
              <v-avatar class="mx-4">
                <img alt="avatar" :src="`${ item.image }`">
              </v-avatar>
            </v-col>
            <v-col clos="12" sm="4">
              <div class="caption grey--text">名称</div>
              <div>{{ item.name }}</div>
            </v-col>
            <v-col clos="12" sm="2">
              <div class="caption grey--text">发起人</div>
              <div>{{ item.ownerName }}</div>
            </v-col>
            <v-col clos="12" sm="2">
              <div class="caption grey--text">类型</div>
              <div>{{ cards[item.type + 1].type }}</div>
            </v-col>
            <v-col clos="12" sm="2">
              <v-chip small :class="`${status[item.status].name} white--text caption my-2`">{{
                  status[item.status].type
                }}
              </v-chip>
            </v-col>
          </v-row>
        </v-layout>
      </v-card>
    </v-card>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">
            {{ detail_card.name }}
          </v-card-title>
          <v-layout row wrap class="mx-4 item">
            <v-row>
              <v-col clos="12" sm="6">
                <v-avatar class="mx-4" size="100" tile>
                  <img alt="avatar" :src="`${ detail_card.image }`">
                </v-avatar>
              </v-col>
              <v-col clos="12" sm="6">
                <div class="caption grey--text">发起人</div>
                <div>{{ detail_card.ownerName }}</div>
              </v-col>
              <v-col clos="12" sm="4">
                <div class="caption grey--text">类型</div>
                <div>{{ cards[detail_card.type + 1].type }}</div>
              </v-col>
              <v-col clos="12" sm="4">
                <div class="caption grey--text">容量</div>
                <div>{{ detail_card.capacity }}</div>
              </v-col>
              <v-col clos="12" sm="4">
                <v-chip small :class="`${status[detail_card.status].name} white--text caption my-2`">{{
                    status[detail_card.status].type
                  }}
                </v-chip>
              </v-col>
              <v-col clos="12" sm="12">
                <div class="caption grey--text">描述</div>
                <div>{{ detail_card.description }}</div>
              </v-col>
              <v-col clos="12" sm="4">
                <div class="caption grey--text">发起时间</div>
                <div>{{ detail_card.createTime.substr(0, 10) }}</div>
                <div>{{ detail_card.createTime.substr(10, 9) }}</div>
              </v-col>
              <v-col clos="12" sm="4">
                <div class="caption grey--text">截止时间</div>
                <div>{{ detail_card.deadline.substr(0, 10) }}</div>
                <div>{{ detail_card.deadline.substr(10, 9) }}</div>
              </v-col>
              <v-col clos="12" sm="4">
                <div class="caption grey--text">上次修改时间</div>
                <div>{{ detail_card.lastModifyTime.substr(0, 10) }}</div>
                <div>{{ detail_card.lastModifyTime.substr(10, 9) }}</div>
              </v-col>
            </v-row>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">再看看</v-btn>
          </v-card-actions>
        </v-card>

      </v-dialog>
    </v-row>

    <!--用户信息表-->
    <v-card class="mx-auto" tile color="grey lighten-4" max-width="800">
      <v-card-title class="headline">用户列表</v-card-title>
      <v-card flat class="pa-6" color="grey lighten-4" v-for="item in info_list" :key="item.index">

        <v-row dense>

          <v-col clos="12" sm="4">
            <div class="caption grey--text">用户昵称</div>
            <div>{{ item.username }}</div>
          </v-col>
          <v-col clos="12" sm="4">
            <div class="caption grey--text">真实姓名</div>
            <div>{{ item.realName }}</div>
          </v-col>
          <v-col clos="12" sm="4">
            <div class="caption grey--text">所在城市</div>
            <div>{{ item.city }}</div>
          </v-col>
          <v-col clos="12" sm="4">
            <div class="caption grey--text">个人简介</div>
            <div>{{ item.description }}</div>
          </v-col>
          <v-col clos="12" sm="4">
            <div class="caption grey--text">联系方式</div>
            <div>{{ item.tel.substr(0, 3) }}-XXXX-{{ item.tel.substr(7, 4) }}</div>
          </v-col>
          <v-col clos="12" sm="4">
            <div class="caption grey--text">用户等级</div>
            <div>{{ item.userLevel }}</div>
          </v-col>
          <v-col clos="12" sm="4">
            <div class="caption grey--text">注册时间</div>
            <div>{{ item.registrationTime.substr(0, 10) }}{{ item.registrationTime.substr(10, 9) }}</div>
          </v-col>
          <v-col clos="12" sm="4">
            <div class="caption grey--text">证件类别</div>
            <div>{{ user_cards[item.creditType].type }}</div>
          </v-col>
          <v-col clos="12" sm="4">
            <div class="caption grey--text">证件号码</div>
            <div>{{ item.creditValue.substr(0, 4) }}**********{{ item.creditValue.substr(12, 4) }}**</div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
      </v-card>
    </v-card>
  </div>
</template>

<script>
import Navbar_admin from "@/views/admin/Navbar_admin"
export default {
  name: "admin",
  components: {Navbar_admin},
  created() {
    let _this = this
    this.$axios.post('/api/getSpecificCallsMeta', {
      'from': 0,
      'to': 100,
      'onlyMine': false
    })
        .then(function (response) {
          console.log(response)
          for (let i = 0; i < response.data.calls.length; i++) {
            _this.list.push(response.data.calls[i])
          }
          console.log("召集令初始化成功")
        })
        .catch(function (error) {
          console.log(error)
        })
    this.$axios.get('/api/getAllUserInfo', {})
        .then(function (response) {
          console.log(response)
          for (let i = 0; i < response.data.allUserInfo.length; i++) {
            response.data.allUserInfo[i].lastModifyTime = new Date(response.data.allUserInfo[i].lastModifyTime).toLocaleDateString().replace(/\//g, "-") + " " + new Date(response.data.allUserInfo[i].lastModifyTime).toTimeString().substr(0, 8)
            response.data.allUserInfo[i].registrationTime = new Date(response.data.allUserInfo[i].registrationTime).toLocaleDateString().replace(/\//g, "-") + " " + new Date(response.data.allUserInfo[i].registrationTime).toTimeString().substr(0, 8)
            _this.info_list.push(response.data.allUserInfo[i])
          }
          console.log("用户信息获取成功")
        })
        .catch(function (error) {
          console.log(error)
        })
  },
  data() {
    return {
      checkbox: false,
      dialog: false,

      name: null,
      list: [],
      info_list: [],
      select_card: {type: '（空）', color: 'green lighten-4', value: '-1'},
      detail_card: {
        "id": null,
        "ownerName": null,
        "type": 1,
        "name": null,
        "description": null,
        "capacity": 1,
        "deadline": "1535374762785",
        "image": null,
        "createTime": "1535374762785",
        "lastModifyTime": "1535374762785",
        "status": 2,
        "isMine": false
      },
      cards: [
        {type: '（空）', value: '-1'},
        {type: '技术交流', value: '0'},
        {type: '学业探讨', value: '1'},
        {type: '社会实践', value: '2'},
        {type: '公益志愿者', value: '3'},
        {type: '游玩', value: '4'},
      ],
      status: [
        {type: '无人', value: '0', name: 'waiting'},
        {type: '缺人', value: '1', name: 'active'},
        {type: '完成', value: '2', name: 'completed'},
        {type: '取消', value: '3', name: 'canceled'},
        {type: '失败', value: '4', name: 'failed'},
      ],
      user_cards: [
        {type: '居民身份证', color: 'blue lighten-4', value: '0'},
        {type: '护照', color: 'red lighten-4', value: '1'},
        {type: '军官证', color: 'green lighten-4', value: '2'},
      ],
    }
  },
  methods: {
    detail: function (value) {
      this.dialog = true
      let _this = this
      this.$axios.post('/api/getCallDetails', {
        id: value.id
      })
          .then(function (response) {
            console.log(response)
            _this.detail_card.id = response.data.id
            _this.detail_card.ownerName = response.data.ownerName
            _this.detail_card.type = response.data.type
            _this.detail_card.name = response.data.name
            _this.detail_card.description = response.data.description
            _this.detail_card.capacity = response.data.capacity
            _this.detail_card.deadline = new Date(response.data.deadline).toLocaleDateString().replace(/\//g, "-") + " " + new Date(response.data.deadline).toTimeString().substr(0, 8)
            _this.detail_card.image = response.data.image
            _this.detail_card.createTime = new Date(response.data.createTime).toLocaleDateString().replace(/\//g, "-") + " " + new Date(response.data.createTime).toTimeString().substr(0, 8)
            _this.detail_card.lastModifyTime = new Date(response.data.lastModifyTime).toLocaleDateString().replace(/\//g, "-") + " " + new Date(response.data.lastModifyTime).toTimeString().substr(0, 8)
            _this.detail_card.status = response.data.status
            _this.detail_card.isMine = response.data.isMine
            _this.dialog_r = _this.detail_card.status === 1 || _this.detail_card.status === 0
            console.log("召集令详情获取成功")
          })
          .catch(function (error) {
            console.log(error)
          })
    },
    find: function () {
      let _this = this
      let data = {
        'from': 0,
        'to': 100,
        'onlyMine': false,
        'active': this.checkbox
      }
      if (this.select_card.value !== '-1') {
        data.type = parseInt(this.select_card.value)
      }
      if (this.name) {
        data.namePattern = this.name
      }
      console.log(data)
      this.$axios.post('/api/getSpecificCallsMeta', data)
          .then(function (response) {
            console.log(response)
            for (let i = _this.list.length; i >= 0; i--) {
              delete _this.list[i]
            }
            _this.list.length = 0
            for (let i = 0; i < response.data.calls.length; i++) {
              _this.list.push(response.data.calls[i])
            }
            console.log("查找成功")
          })
          .catch(function (error) {
            console.log(error)
          })
    },
  }
}
</script>

<style scoped>
.item.waiting {
  border-left: 4px solid green;
}

.item.active {
  border-left: 4px solid seagreen;
}

.item.completed {
  border-left: 4px solid blue;
}

.item.canceled {
  border-left: 4px solid orange;
}

.item.failed {
  border-left: 4px solid red;
}

.v-chip.waiting {
  background: green;
}

.v-chip.active {
  background: seagreen;
}

.v-chip.completed {
  background: blue;
}

.v-chip.canceled {
  background: orange;
}

.v-chip.failed {
  background: red;
}
</style>
<template>
  <div class="call">
    <Navbar></Navbar>
    <v-card class="mx-auto" tile color="grey lighten-4" max-width="800">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row dense>
          <v-col class="ml-8" cols="8" sm="3">
            <v-text-field label="召集令名称" v-model="find_name"
                          hint="模糊查询" class="input-group--focused"></v-text-field>
          </v-col>

          <v-col class="ml-8" cols="8" sm="2">
            <v-select v-model="select_card" :items="cards" item-text="type"
                      label="召集令类型" persistent-hint return-object></v-select>
          </v-col>
          <v-col class="ml-8 my-4" cols="8" sm="1">
            <v-btn @click="find" color="blue">
              <v-icon left color="white">assignment</v-icon>
              <div class="font-weight-black white--text">查询</div>
            </v-btn>
          </v-col>
          <v-col class="my-4" cols="8" sm="1"></v-col>
          <v-col class="ml-8 my-4" cols="8" sm="3">
            <v-btn @click="find" color="red">
              <v-icon left color="white">add_task</v-icon>
              <div class="font-weight-black white--text">发起新的召集令</div>
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
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

    <!--查看召集令详情-->
    <v-row justify="center">
      <v-dialog v-model="dialog_d" persistent max-width="500">
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
                <div>{{ detail_card.createTime }}</div>
              </v-col>
              <v-col clos="12" sm="4">
                <div class="caption grey--text">截止时间</div>
                <div>{{ detail_card.deadline }}</div>
              </v-col>
              <v-col clos="12" sm="4">
                <div class="caption grey--text">上次修改时间</div>
                <div>{{ detail_card.lastModifyTime }}</div>
              </v-col>
            </v-row>
          </v-layout>
          <v-card-actions>
            <v-btn color="red" text @click="del_call">删除</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="blue" text @click="modi_call">修改</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="green" text @click="dialog_d = false">取消</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>


    <!--修改召集令详情--->
    <v-row justify="center">
      <v-dialog v-model="dialog_m" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">修改召集令</v-card-title>
          <v-layout row wrap class="mx-4 item">
            <v-row>
              <v-col clos="12" sm="6">
                <v-text-field v-model="image" :value="`${ detail_card.image }`" label="描述图片地址"></v-text-field>
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
                <div>{{ detail_card.createTime }}</div>
              </v-col>
              <v-col clos="12" sm="4">
                <div class="caption grey--text">截止时间</div>
                <div>{{ detail_card.deadline }}</div>
              </v-col>
              <v-col clos="12" sm="4">
                <div class="caption grey--text">上次修改时间</div>
                <div>{{ detail_card.lastModifyTime }}</div>
              </v-col>
            </v-row>
          </v-layout>
          <v-card-actions>
            <v-btn color="blue" text @click="push_modi_call">修改</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="green" text @click="dialog_m = false">取消</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

  </div>
</template>

<script>
import Navbar from "@/views/Navbar"

export default {
  name: "Call",
  created() {
  },
  data() {
    return {
      valid: false,
      dialog_p: false,
      dialog_m: false,
      dialog_d: false,

      capsule: 20,
      find_name: null,
      id: null,
      ownerName: null,
      type: null,
      name: null,
      description: null,
      capacity: null,
      deadline: null,
      image: null,
      createTime: null,
      lastModifyTime: null,
      status_m: null,
      isMine: null,

      select_card: {type: '（空）', color: 'green lighten-4', value: '-1'},
      detail_card: {
        "id": "kjuykjykyuky",
        "ownerName": "Ceobe",
        "type": 2,
        "name": "罗德岛伙食调研",
        "description": "管管傻狗，救救食堂",
        "capacity": 20,
        "deadline": "2021-09-10T12:30:00Z",
        "image": "https://raw.githubusercontent.com/CDTN2015/sources/master/img/Arknights_avatar/80143041_8.jpg",
        "createTime": "2021-07-01T07:10:30Z",
        "lastModifyTime": "2021-07-03T09:12:23Z",
        "status": 2,
        "isMine": false
      },
      list: [
        {
          "id": "kjuykjykyuky",
          "ownerName": "Ceobe",
          "type": 2,
          "name": "罗德岛伙食调研",
          "image": "https://raw.githubusercontent.com/CDTN2015/sources/master/img/Arknights_avatar/80143041_8.jpg",
          "status": 2
        },
        {
          "id": "dsadasdasdsad",
          "ownerName": "Eyjafjalla",
          "type": 0,
          "name": "汐斯塔火山研究",
          "image": "https://raw.githubusercontent.com/CDTN2015/sources/master/img/Arknights_avatar/78949689_7.jpg",
          "status": 3
        },
        {
          "id": "ggfsbhgfi",
          "ownerName": "Bagpipe",
          "type": 1,
          "name": "哥伦比亚校区交流",
          "image": "https://raw.githubusercontent.com/CDTN2015/sources/master/img/Arknights_avatar/82368676_2.jpg",
          "status": 1
        },
        {
          "id": "iensdiefnskshnfak",
          "ownerName": "Puretream",
          "type": 3,
          "name": "维多利亚河流清洁",
          "image": "https://raw.githubusercontent.com/CDTN2015/sources/master/img/Arknights_avatar/80143041_4.jpg",
          "status": 4
        },
        {
          "id": "limghuhynf",
          "ownerName": "Swire",
          "type": 4,
          "name": "龙门市区一日游",
          "image": " https://raw.githubusercontent.com/CDTN2015/sources/master/img/Arknights_avatar/79074291_8.jpg",
          "status": 0
        },
      ],
      total: 0,
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
    }
  },
  components: {Navbar},
  methods: {
    detail: function (value) {
      this.dialog_d = true
      this.detail_card.id = value.id
      this.detail_card.ownerName = value.ownerName
      this.detail_card.type = value.type
      this.detail_card.name = value.name
      this.detail_card.image = value.image
      this.detail_card.status = value.status
      // let timestamp= new Date(1472025255555)
      // console.log(timestamp)
      // let date2 = timestamp.toLocaleDateString().replace(/\//g, "-")+ " " + timestamp.toTimeString().substr(0, 8);
      // console.log(date2)
    },
    del_call: function () {
      console.log("删令")
      //console.log(this.detail_card.name)
    },
    modi_call: function () {
      //let _this = this
      console.log("改令")
      this.dialog_m = true
      this.image = this.detail_card.image
      //this.detail_card.image = this.image
      ///console.log(this.detail_card.image)

    },
    push_modi_call: function () {
      //let _this = this
      console.log("提交改令")
      this.dialog_m = false
      this.detail_card.image = this.image
      console.log(this.detail_card.image)

    },
    find: function () {
      //let _this = this
      console.log(this.name)
      console.log(this.select_card.value)
      let data = {
        'from': 0,
        'to': this.capsule,
        'onlyMine': false,
        'active': false
      }
      if (this.select_card.value !== '-1') {
        data.type = this.select_card.value
      }
      if (this.name) {
        data.namePattern = this.name
      }
      console.log(data)
      this.$axios.post('/api' + "/login", data)
          .then(function (response) {
            if (response.data.success) {
              console.log(response)
              //_this.$router.push({path: '/home', name: 'Home', params: {username: _this.user_name}})
            }
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
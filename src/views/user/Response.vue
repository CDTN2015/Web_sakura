<template>
  <div class="response">
    <Navbar></Navbar>
    <v-card class="mx-auto" tile color="grey lighten-4" max-width="800">
      <v-card-title class="headline">我的发令</v-card-title>
      <v-card flat class="pa-6" color="grey lighten-4" v-for="item in call_list" :key="item.id + '1'" @click="detail_call(item)">
        <v-layout row wrap :class="`mx-4 item ${call_status[item.status].name}`">
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
              <v-chip small :class="`${call_status[item.status].name} white--text caption my-2`">{{
                  call_status[item.status].type
                }}
              </v-chip>
            </v-col>
          </v-row>
        </v-layout>
      </v-card>

      <v-card-title class="headline">我的接令</v-card-title>
      <v-card flat class="pa-6" color="grey lighten-4" v-for="item in response_list" :key="item.callId" @click="detail_response(item)">
        <v-layout row wrap :class="`mx-4 item ${response_status[item.status].name}`">
          <v-row>
            <v-col clos="12" sm="2"></v-col>
            <v-col clos="12" sm="4">
              <div class="caption grey--text">名称</div>
              <div>{{ item.callName }}</div>
            </v-col>
            <v-col clos="12" sm="4">
              <div class="caption grey--text">申请信息</div>
              <div>{{ item.description }}</div>
            </v-col>
            <v-col clos="12" sm="2">
              <v-chip small :class="`${response_status[item.status].name} white--text caption my-2`">{{
                  response_status[item.status].type
                }}
              </v-chip>
            </v-col>
          </v-row>
        </v-layout>
      </v-card>
<!--
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
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field v-show="dialog_r&&!this.detail_card.isMine" :rules="[rules.no_empty]" label="申请信息" v-model="description" class="input-group--focused"></v-text-field>
              </v-form>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">再看看</v-btn>
              <v-btn v-show="dialog_r&&!this.detail_card.isMine" color="green darken-1" text @click="callResponse(detail_card)">接令</v-btn>
            </v-card-actions>
          </v-card>

        </v-dialog>
      </v-row>
-->
    </v-card>
  </div>
</template>

<script>
import Navbar from "@/views/Navbar"

export default {
  name: "Response",
  components: {Navbar},
  created() {
    let _this = this
    this.$axios.post('/api/getSpecificCallsMeta', {
      'from': 0,
      'to': 100,
      'onlyMine': true
    })
        .then(function (response) {
          console.log(response)
          for (let i = 0; i < response.data.calls.length; i++) {
            _this.call_list.push(response.data.calls[i])
          }
          console.log("用户发令初始化成功")
        })
        .catch(function (error) {
          console.log(error)
        })
    this.$axios.get('/api/getOwnedCallResponses', {})
        .then(function (response) {
          console.log(response)
          for (let i = 0; i < response.data.callResponses.length; i++) {
            _this.response_list.push(response.data.callResponses[i])
          }
          console.log("用户接令初始化成功")
        })
        .catch(function (error) {
          console.log(error)
        })
  },
  data() {
    return {
      call_detail: [],
      response_detail: [],
      dialog_c: false,
      dialog_r: false,

      call_list: [],
      response_list: [],
      applicant_list: [],

      cards: [
        {type: '（空）', value: '-1'},
        {type: '技术交流', value: '0'},
        {type: '学业探讨', value: '1'},
        {type: '社会实践', value: '2'},
        {type: '公益志愿者', value: '3'},
        {type: '游玩', value: '4'},
      ],
      call_status: [
        {type: '无人', value: '0', name: 'waiting'},
        {type: '缺人', value: '1', name: 'active'},
        {type: '完成', value: '2', name: 'completed'},
        {type: '取消', value: '3', name: 'canceled'},
        {type: '失败', value: '4', name: 'failed'},
      ],
      response_status:  [
        {type: '等待', value: '0', name: 'waiting'},
        {type: '接受', value: '1', name: 'completed'},
        {type: '拒绝', value: '2', name: 'failed'},
        {type: '过期', value: '3', name: 'canceled'},
      ],
    }
  },
  methods: {
    detail_call: function (value) {
      this.dialog_c = true
      let _this = this
      this.$axios.post('/api/getSpecificCallResponses', {
        "callId": value.id
            })
          .then(function (response) {
            console.log(response)
            for (let i = _this.applicant_list.length; i >= 0; i--) {
              delete _this.applicant_list[i]
            }
            for(let i = 0;i < response.data.callResponses.length;i ++){
              _this.applicant_list.push(response.data.callResponses[i])
            }
            console.log(_this.applicant_list)
            console.log("召集令详情获取成功")
          })
          .catch(function (error) {
            console.log(error)
          })
      // this.dialog_d = true
      // let _this = this
      // console.log(value.id)
      // this.$axios.post('/api' + "/getCallDetails", {
      //   id: value.id
      // })
      //     .then(function (response) {
      //       console.log(response)
      //       _this.detail_card.id = response.data.id
      //       _this.detail_card.ownerName = response.data.ownerName
      //       _this.detail_card.type = response.data.type
      //       _this.detail_card.name = response.data.name
      //       _this.detail_card.description = response.data.description
      //       _this.detail_card.capacity = response.data.capacity
      //       _this.detail_card.deadline = new Date(response.data.deadline).toLocaleDateString().replace(/\//g, "-") + " " + new Date(response.data.deadline).toTimeString().substr(0, 8)
      //       _this.detail_card.image = response.data.image
      //       _this.detail_card.createTime = new Date(response.data.createTime).toLocaleDateString().replace(/\//g, "-") + " " + new Date(response.data.createTime).toTimeString().substr(0, 8)
      //       _this.detail_card.lastModifyTime = new Date(response.data.lastModifyTime).toLocaleDateString().replace(/\//g, "-") + " " + new Date(response.data.lastModifyTime).toTimeString().substr(0, 8)
      //       _this.detail_card.status = response.data.status
      //       _this.detail_card.isMine = response.data.isMine
      //       _this.dialog_r = _this.detail_card.status === 1 || _this.detail_card.status === 0
      //       console.log("召集令详情获取成功")
      //     })
      //     .catch(function (error) {
      //       console.log(error)
      //     })
    },
    detail_response: function (value){
      console.log(value.callId)

    }
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
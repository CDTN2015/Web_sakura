<template>
  <div class="response">
    <Navbar></Navbar>
    <v-card class="mx-auto" tile color="grey lighten-4" max-width="800">
      <v-card-title class="headline">我的召集</v-card-title>
      <v-card flat class="pa-6" color="grey lighten-4" v-for="item in call_list" :key="item.id + '1'"
              @click="detail_call(item.id)">
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

      <v-card-title class="headline">我的申请</v-card-title>
      <v-card flat class="pa-6" color="grey lighten-4" v-for="item in response_list" :key="item.callId"
              @click="detail_response(item)">
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

      <!--显示申请人-->
      <v-dialog v-model="dialog_c" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">当前申请接令者</v-card-title>
          <v-card v-for="item in applicant_list" :key="item.ownerName">
            <v-layout row wrap class="mx-4 item">
              <v-row>
                <v-col clos="12" sm="4">
                  <div class="caption grey--text">申请者</div>
                  <div>{{ item.ownerName }}</div>
                </v-col>
                <v-col clos="12" sm="6">
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
            <v-card-actions v-show="response_status[item.status].value === '0'">
              <v-btn color="blue" text @click="accept(item, true)">接受</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="red" text @click="accept(item, false)">拒绝</v-btn>
            </v-card-actions>
          </v-card>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog_c = false">退出</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!--申请状态-->
      <v-dialog v-model="dialog_r" persistent max-width="500">
        <v-card>
          <v-card-title class="headline">当前申请状态</v-card-title>
          <v-layout row wrap class="mx-4 item">
            <v-row>
              <v-col clos="12" sm="1"></v-col>
              <v-col clos="12" sm="3">
                <div class="caption grey--text">名称</div>
                <div>{{ response.callName }}</div>
              </v-col>
              <v-col clos="12" sm="6">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field :rules="[rules.no_empty]" label="申请信息" v-model="description"
                                class="input-group--focused"></v-text-field>
                </v-form>
              </v-col>
              <v-col clos="12" sm="2">
                <v-chip small :class="`${response_status[response.status].name} white--text caption my-2`">{{
                    response_status[response.status].type
                  }}
                </v-chip>
              </v-col>
            </v-row>
          </v-layout>
          <v-card-actions>
            <v-btn color="red" text @click="del" v-show="response_status[response.status].value === '0'">删除</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="blue" text @click="modify" v-show="response_status[response.status].value === '0'">修改</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog_r = false">退出</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


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
      valid: false,

      description: null,
      response: {
        callId: null,
        callName: null,
        createTime: null,
        description: null,
        id: null,
        modifyTime: null,
        status: 0,
      },
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
      response_status: [
        {type: '等待', value: '0', name: 'waiting'},
        {type: '接受', value: '1', name: 'completed'},
        {type: '拒绝', value: '2', name: 'failed'},
        {type: '过期', value: '3', name: 'canceled'},
      ],
      rules: {
        no_empty: value => !!value || '不能为空',
      }
    }
  },
  methods: {
    detail_call: function (value) {
      this.dialog_c = true
      let _this = this
      this.$axios.post('/api/getSpecificCallResponses', {
        "callId": value
      })
          .then(function (response) {
            console.log(response)
            for (let i = _this.applicant_list.length; i >= 0; i--) {
              delete _this.applicant_list[i]
            }
            _this.applicant_list.length = 0
            for (let i = 0; i < response.data.callResponses.length; i++) {
              _this.applicant_list.push(response.data.callResponses[i])
            }
            //console.log(_this.applicant_list)
            console.log("召集令详情获取成功")
          })
          .catch(function (error) {
            console.log(error)
          })
    },
    accept: function (value, acc) {
      //let _this = this
      this.$axios.post('/api/respondToCallResponse', {
        "id": value.id,
        "accept": acc
      })
          .then(function (response) {
            console.log(response)
            console.log(acc ? "已接受申请" : "已婉拒申请")
            location.reload()
          })
          .catch(function (error) {
            console.log(error)
          })
    },
    detail_response: function (value) {
      this.dialog_r = true
      this.response = value
      this.description = this.response.description
      //console.log(this.response)
    },
    del: function () {
      let _this = this
      this.$axios.post('/api/cancelCallResponse', {
        "id": this.response.id
      })
          .then(function (response) {
            console.log(response)
            console.log(" 召集令申请取消成功")
            _this.dialog_r = false
            location.reload()
          })
          .catch(function (error) {
            console.log(error)
          })
    },
    modify: function () {
      let _this = this
      if (this.$refs.form.validate()) {
        this.$axios.post('/api/modifyCallResponse', {
          "id": this.response.id,
          "description": this.description
        })
            .then(function (response) {
              console.log(response)
              console.log(" 召集令申请修改成功")
              _this.dialog_r = false
              location.reload()
            })
            .catch(function (error) {
              console.log(error)
            })
      }
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
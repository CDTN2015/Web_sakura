<template>
  <div class="call">
    <Navbar></Navbar>
    <v-card class="mx-auto" tile color="grey lighten-4" max-width="800">
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
          <v-btn @click="dialog_p = true" color="red">
            <v-icon left color="white">add_task</v-icon>
            <div class="font-weight-black white--text">发起新的召集令</div>
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

    <!--发布新的召集令--->
    <v-row justify="center">
      <v-dialog v-model="dialog_p" persistent max-width="500">
        <v-card>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-title class="headline">发起新召集令</v-card-title>
            <v-layout row wrap class="mx-4 item">
              <v-row class="ml-1" dense>
                <v-col clos="12" sm="8">
                  <v-text-field v-model="add_card.name" :rules="[rules.no_empty]" label="名称"></v-text-field>
                </v-col>
                <v-col clos="12" sm="4">
                  <v-text-field v-model="add_card.capacity" :rules="[rules.no_empty, rules.is_num]"
                                label="容量"></v-text-field>
                </v-col>
                <v-col clos="12" sm="12">
                  <v-textarea v-model="add_card.description" :rules="[rules.no_empty]" no-resize rows="3" label="描述"
                              single-line></v-textarea>
                </v-col>
                <v-col clos="12" sm="12">
                  <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                          transition="scale-transition" offset-y min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="date" label="指定召集令截止时间，默认第二天0时到期" prepend-icon="mdi-calendar" readonly
                                    v-bind="attrs"
                                    v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">取消</v-btn>
                      <v-btn text color="primary" @click="$refs.menu.save(date)">确定</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col clos="12" sm="4">
                  <v-select v-model="add_select_card" :items="cards.slice(1)"
                            item-text="type" label="召集令类型" persistent-hint
                            return-object></v-select>
                </v-col>
                <v-col clos="12" sm="8">
                  <v-text-field v-model="add_card.image" :rules="[rules.no_empty]" label="图片链接"></v-text-field>
                </v-col>

              </v-row>
            </v-layout>
            <v-card-actions>
              <v-btn color="blue" text @click="add">发布</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="green" text @click="dialog_p = false">取消</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
    </v-row>

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
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-card-title class="headline">修改召集令</v-card-title>
            <v-layout row wrap class="mx-4 item">
              <v-row>
                <v-col clos="12" sm="8">
                  <v-text-field v-model="change_card.name" :rules="[rules.no_empty]" label="名称"></v-text-field>
                </v-col>
                <v-col clos="12" sm="4">
                  <v-text-field v-model="change_card.capacity" :rules="[rules.no_empty, rules.is_num]"
                                label="容量"></v-text-field>
                </v-col>
                <v-col clos="12" sm="12">
                  <v-textarea v-model="change_card.description" :rules="[rules.no_empty]" no-resize rows="3" label="描述"
                              single-line></v-textarea>
                </v-col>
                <v-col clos="12" sm="12">
                  <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                          transition="scale-transition" offset-y min-width="290px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="date" label="指定召集令截止时间，默认第二天0时到期" prepend-icon="mdi-calendar" readonly
                                    v-bind="attrs"
                                    v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">取消</v-btn>
                      <v-btn text color="primary" @click="$refs.menu.save(date)">确定</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col clos="12" sm="4">
                  <v-select v-model="add_select_card" :items="cards.slice(1)"
                            item-text="type" label="召集令类型" persistent-hint
                            return-object></v-select>
                </v-col>
                <v-col clos="12" sm="8">
                  <v-text-field v-model="change_card.image" :rules="[rules.no_empty]" label="图片链接"></v-text-field>
                </v-col>
              </v-row>
            </v-layout>
            <v-card-actions>
              <v-btn color="blue" text @click="push_modi_call">修改</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="green" text @click="dialog_m = false">取消</v-btn>
            </v-card-actions>
          </v-form>
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
    let _this = this
    this.$axios.post('/api/getSpecificCallsMeta', {
      'from': 0,
      'to': 100,
      'onlyMine': true
    })
        .then(function (response) {
          console.log(response)
          for (let i = 0; i < response.data.calls.length; i++) {
            _this.list.push(response.data.calls[i])
          }
          console.log("发令初始化成功")
        })
        .catch(function (error) {
          console.log(error)
        })
  },
  data() {
    return {
      valid: false,
      dialog_p: false,//发布
      dialog_m: false,//修改
      dialog_d: false,//删除
      menu: false,
      modal: false,
      menu2: false,

      date: new Date().toLocaleDateString().replace(/\//g, "-"),
      find_name: null,
      add_card: {
        "type": 1,
        "name": null,
        "description": null,
        "capacity": null,
        "deadline": null,
        "image": null,
      },
      add_select_card: {type: '技术交流', value: '0'},
      select_card: {type: '（空）', color: 'green lighten-4', value: '-1'},
      change_card: {
        "id": null,
        "type": 1,
        "name": null,
        "description": null,
        "capacity": null,
        "deadline": null,
        "image": null,
      },
      detail_card: {
        "id": null,
        "ownerName": null,
        "type": 1,
        "name": null,
        "description": null,
        "capacity": null,
        "deadline": null,
        "image": null,
        "createTime": null,
        "lastModifyTime": null,
        "status": 1,
        "isMine": false
      },
      list: [],
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
      rules: {
        no_empty: value => !!value || '不能为空',
        is_num: value => {
          if (!/^\d*$/.test(value)) {
            return '不是整数'
          } else if (parseInt(value) === 0) {
            return '不能为0'
          }
          return true
        },
      }
    }
  },
  components: {Navbar},
  methods: {
    detail: function (value) {
      this.dialog_d = true
      let _this = this
      console.log(value.id)
      this.$axios.post('/api' + "/getCallDetails", {
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
    del_call: function () {
      //let _this = this
      this.$axios.post('/api/deleteCall', {
        'id': this.detail_card.id
      })
          .then(function (response) {
            console.log(response)
            console.log("召集令删除成功")
            location. reload()
          })
          .catch(function (error) {
            console.log(error)
          })
      console.log("删令")
    },
    modi_call: function () {
      console.log("进入改令")
      this.dialog_m = true
      this.change_card.id = this.detail_card.id
      this.change_card.type = this.detail_card.type
      this.change_card.name = this.detail_card.name
      this.change_card.description = this.detail_card.description
      this.change_card.capacity = this.detail_card.capacity
      this.change_card.deadline = this.detail_card.deadline
      this.change_card.image = this.detail_card.image
      this.date = new Date().toLocaleDateString().replace(/\//g, "-")
    },
    push_modi_call: function () {
      let _this = this
      console.log(this.date)
      let data = {
        "id": this.detail_card.id,
        "type": parseInt(this.add_select_card.value),
        "name": this.change_card.name,
        "description": this.change_card.description,
        "capacity": parseInt(this.change_card.capacity),
        "deadline": String(new Date(this.date + "T16:00:00Z")),
        "image": this.change_card.image
      }
      console.log(data)
      if (this.$refs.form.validate()) {
        this.$axios.post('/api/modifyCall', data)
            .then(function (response) {
              console.log(response)
              if (response.data.success) {
                console.log("提交改令成功")
                _this.dialog_m = false
                _this.dialog_d = false
                location.reload()
              }
            })
            .catch(function (error) {
              console.log(error)
            })
      }

    },
    add: function () {
      let data = {
        "type": parseInt(this.add_select_card.value),
        "name": this.add_card.name,
        "description": this.add_card.description,
        "capacity": parseInt(this.add_card.capacity),
        "deadline": String(new Date(this.date + "T16:00:00Z")),
        "image": this.add_card.image
      }
      console.log(data)
      if (this.$refs.form.validate()) {
        this.$axios.post('/api/publishCall', data)
            .then(function (response) {
              if (response.data.success) {
                console.log(response)
                console.log("新召集令提交成功")
                location.reload()
              }
            })
            .catch(function (error) {
              console.log(error)
            })
      }
    },
    find: function () {
      let _this = this
      console.log(this.name)
      console.log(parseInt(this.select_card.value))
      let data = {
        'from': 0,
        'to': 100,
        'onlyMine': true,
      }
      if (this.select_card.value !== '-1') {
        data.type = parseInt(this.select_card.value)
      }
      if (this.find_name) {
        data.namePattern = this.find_name
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
            console.log("查询自己发令成功")
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
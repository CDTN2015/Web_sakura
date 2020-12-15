<template>
  <div class="report">
    <Navbar_admin></Navbar_admin>

    <v-card class="mx-auto" tile color="grey lighten-4" max-width="1800">
      <v-card-title class="headline">查询召集令表单</v-card-title>
      <v-row dense>
        <v-col class="ml-8" cols="12" sm="2">
          <v-select v-model="select_city" :items="cities" item-text="type"
                    label="所在城市" persistent-hint return-object></v-select>
        </v-col>

        <v-col class="ml-8" cols="12" sm="3">
          <v-select v-model="select_card" :items="cards" item-text="type"
                    label="召集令类型" persistent-hint return-object></v-select>
        </v-col>
        <v-col clos="12" sm="2">
          <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :return-value.sync="start"
                  transition="scale-transition" offset-y max-width="290px" min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="start" label="开始月份" prepend-icon="mdi-calendar" readonly v-bind="attrs"
                            v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="start" type="month" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu1.save(start)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col clos="12" sm="2">
          <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :return-value.sync="end"
                  transition="scale-transition" offset-y max-width="290px" min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field v-model="end" label="结束月份" prepend-icon="mdi-calendar" readonly v-bind="attrs"
                            v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="end" type="month" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu2.save(end)">OK</v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
        <v-col class="ml-8 my-4" cols="12" sm="1">
          <v-btn @click="find" color="blue">
            <v-icon left color="white">assignment</v-icon>
            <div class="font-weight-black white--text">查询</div>
          </v-btn>
        </v-col>
      </v-row>

      <v-card v-show="loading">
        <v-sheet class="v-sheet--offset mx-auto" color="cyan" elevation="12" max-width="calc(100% - 32px)">
          <v-sparkline :labels="sheet_date_a" :value="sheet_achieve" color="white" line-width="2" label-size="4"
                       padding="16"></v-sparkline>
        </v-sheet>
        <v-card-text class="pt-0">
          <div class="title font-weight-light mb-2">
            {{ select_city.type }}{{ start.substr(0,4) }}年{{ start.substr(5,2) }}月到{{ end.substr(0,4) }}年{{ end.substr(5,2) }}月召集令完成统计表（时间/完成数）
          </div>
        </v-card-text>
        <v-sheet class="v-sheet--offset mx-auto" color="cyan" elevation="12" max-width="calc(100% - 32px)">
          <v-sparkline :labels="sheet_date_i" :value="sheet_income" about="?" color="white" line-width="2"
                       label-size="4"
                       padding="16"></v-sparkline>
        </v-sheet>
        <v-card-text class="pt-0">
          <div class="title font-weight-light mb-2">
            {{ select_city.type }}{{ start.substr(0,4) }}年{{ start.substr(5,2) }}月到{{ end.substr(0,4) }}年{{ end.substr(5,2) }}月召集令收入表（时间/收入）
          </div>
        </v-card-text>
      </v-card>
    </v-card>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline red white--text">调整一下起止日期，要画图的，o不ok？</v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">我知道了</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div ref="box" style="width: 600px;height: 600px;"></div>
  </div>
</template>

<script>
import Navbar_admin from "@/views/admin/Navbar_admin"

export default {
  name: "Report",
  components: {Navbar_admin},
  created() {
  },
  data() {
    return {
      dialog: false,
      loading: false,
      menu1: false,
      menu2: false,
      city: null,
      sheet_date_i: [],
      sheet_date_a: [],
      sheet_income: [],
      sheet_achieve: [],
      start: new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleDateString().replace(/\//g, "-").substr(0, 7),
      end: new Date().toLocaleDateString().replace(/\//g, "-").substr(0, 7),
      select_card: {type: '所有项目', value: '-1'},
      cards: [
        {type: '所有项目', value: '-1'},
        {type: '技术交流', value: '0'},
        {type: '学业探讨', value: '1'},
        {type: '社会实践', value: '2'},
        {type: '公益志愿者', value: '3'},
        {type: '游玩', value: '4'},
      ],
      select_city: {type: '所有城市', value: 'ALL'},
      cities: [
        {type: '所有城市', value: 'ALL'},
        {type: '北京', value: 'Beijing'},
        {type: '上海', value: 'Guangzhou'},
        {type: '广州', value: 'Shanghai'},
        {type: '重庆', value: 'Chongqing'},
      ],
      labels: [
        '12am',
      ],
      value: [
        200,
      ],
    }
  },
  methods: {
    find: function () {
      if (this.start < this.end) {
        let _this = this
        let data = {
          "from": new Date(Date.parse(this.start)).toString(),
          "to": new Date(Date.parse(this.end)).toString(),
        }
        if (this.select_city.value !== 'ALL') {
          data.city = this.select_city.value
        }
        if (this.select_card.value !== '-1') {
          data.type = parseInt(this.select_card.value)
        }
        this.$axios.post('/api/getSummary', data)
            .then(function (response) {
              console.log(response)
              for (let i = _this.sheet_achieve.length; i >= 0; i--) {
                delete _this.sheet_achieve[i]
                delete _this.sheet_date_a[i]
                delete _this.sheet_date_i[i]
                delete _this.sheet_income[i]
              }
              _this.sheet_achieve.length = 0
              _this.sheet_date_a.length = 0
              _this.sheet_date_i.length = 0
              _this.sheet_income.length = 0
              for (let i = 0; i < response.data.summaries.length; i++) {
                _this.sheet_achieve.push(response.data.summaries[i].achieve)
                _this.sheet_date_i.push(response.data.summaries[i].yyyy_mm + '/' + response.data.summaries[i].achieve)
                _this.sheet_date_a.push(response.data.summaries[i].yyyy_mm + '/' + response.data.summaries[i].income)
                _this.sheet_income.push(response.data.summaries[i].income)
              }
              _this.loading = true
              console.log(_this.sheet_achieve)
              console.log(_this.sheet_date_a)
              console.log(_this.sheet_date_i)
              console.log(_this.sheet_income)
              console.log("获取详单成功")
            })
            .catch(function (error) {
              console.log(error)
            })
      } else {
        this.dialog = false
      }
    },
  }
}
</script>

<style scoped>

</style>
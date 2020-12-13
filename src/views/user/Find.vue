<template>
  <div class="find">
    <Navbar></Navbar>
    <v-card class="mx-auto" tile color="grey lighten-4" max-width="800">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row dense>
          <v-col class="ml-8" cols="8" sm="2">
            <v-text-field label="召集令名称"
                          hint="模糊查询" class="input-group--focused"></v-text-field>
          </v-col>

          <v-col class="ml-8" cols="8" sm="2">
            <v-select v-model="select_card" :background-color="`${select_card.color}`" :items="cards" item-text="type"
                      label="召集令类型" persistent-hint return-object></v-select>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<script>
import Navbar from "@/views/Navbar"

export default {
  name: "Find",
  created() {
    let _this = this
    this.$axios.post('/api' + "/getSpecificCallsMeta", {
      //'type': null,
      //'namePattern': null,
      //'active': null,
      'from': 0,
      'to': 10,
      'onlyMine': false
    })
        .then(function (response) {
          console.log(response)
          for (let i = 0;i < response.data.calls.length;i++) {
            _this.list.push(response.data.calls[i])
          }
          _this.total = response.data.total
          //console.log(this.total)
          console.log(_this.list)
        })
        .catch(function (error) {
          console.log(error)
        })
  },
  data() {
    return {
      valid: false,

      select_card: {type: '技术交流', color: 'blue lighten-4', value: '0'},
      list:[],
      total: 0,
      cards: [
        {type: '技术交流', color: 'blue lighten-4', value: '0'},
        {type: '学业探讨', color: 'red lighten-4', value: '1'},
        {type: '社会实践', color: 'green lighten-4', value: '2'},
        {type: '公益志愿者', color: 'red lighten-4', value: '3'},
        {type: '游玩', color: 'green lighten-4', value: '4'},
      ],
    }
  },
  components: {Navbar},
  methods: {}
}
</script>

<style scoped>

</style>
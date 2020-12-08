<template>
  <div class="passport">
    <h1 class="v-subheader grey--text">Passport</h1>
    <v-container class="mx-4">
      <v-card flat outlined class="pa-3" v-for="project in Projects" :key="project.title">
        <v-layout row wrap class="mx-4">
          <v-flex xs12 md6 >
            <div class="caption grey--text">Project titlr</div>
            <div>{{ project.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Project due</div>
            <div>{{ project.due }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">statue</div>
            <div>{{ project.status }}</div>
          </v-flex>

        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "MyCall",
  data() {
    return {
      Projects: [
        {title: 'dasfasf', person: 'dasdfasfgasd', due: 'asdasdas', status: 'dasdasd'},
        {title: 'dasfasf', person: 'dasdfasfgasd', due: 'asdasdas', status: 'dasdasd'},
        {title: 'dasfasf', person: 'dasdfasfgasd', due: 'asdasdas', status: 'dasdasd'},
        {title: 'dasfasf', person: 'dasdfasfgasd', due: 'asdasdas', status: 'dasdasd'}
      ]
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <div class="home">
    <Navbar></Navbar>
    <v-card>

      <v-row>

      </v-row>
      <v-main>
        <v-row>
          <h1 class="v-subheader grey--text">Passport</h1>
          <v-container class="mx-4">
            <v-card flat outlined class="pa-3" v-for="project in Projects" :key="project.title">
              <v-layout row wrap class="mx-4">
                <v-flex xs12 md6>
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


        </v-row>
      </v-main>
    </v-card>

  </div>
</template>


<script>
import Navbar from "@/views/Navbar"

export default {
  name: "Home",
  data() {
    return {
      Projects: [
        {title: 'dasfasf', person: 'dasdfasfgasd', due: 'asdasdas', status: 'dasdasd'},
        {title: 'dasfasf', person: 'dasdfasfgasd', due: 'asdasdas', status: 'dasdasd'},
        {title: 'dasfasf', person: 'dasdfasfgasd', due: 'asdasdas', status: 'dasdasd'},
        {title: 'dasfasf', person: 'dasdfasfgasd', due: 'asdasdas', status: 'dasdasd'}
      ]
    }
  },
  components: {Navbar}
}
</script>

<style scoped>

</style>
-->
<!--
<template>
  <v-app id="inspire">

    <v-navigation-drawer
        v-model="drawer"
        app
    >
      <v-sheet
          color="grey lighten-4"
          class="pa-4"
      >
        <v-avatar
            class="mb-4"
            color="grey darken-1"
            size="64"
        ></v-avatar>

        <div>john@vuetifyjs.com</div>
      </v-sheet>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
            v-for="[icon, text] in links"
            :key="icon"
            link
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container
          class="py-8 px-6"
          fluid
      >
        <v-row>
          <v-col
              v-for="card in cards"
              :key="card"
              cols="12"
          >
            <v-card>
              <v-subheader>{{ card }}</v-subheader>

              <v-list two-line>
                <template v-for="n in 6">
                  <v-list-item

                      :key="n"
                  >
                    <v-list-item-avatar color="grey darken-1">
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>Message {{ n }}</v-list-item-title>

                      <v-list-item-subtitle>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil repellendus distinctio similique
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider
                      v-if="n !== 6"
                      :key="`divider-${n}`"
                      inset
                  ></v-divider>
                </template>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    cards: ['Today', 'Yesterday'],
    drawer: null,
    links: [
      ['mdi-inbox-arrow-down', 'Inbox'],
      ['mdi-send', 'Send'],
      ['mdi-delete', 'Trash'],
      ['mdi-alert-octagon', 'Spam'],
    ],
  }),
}
</script>
-->
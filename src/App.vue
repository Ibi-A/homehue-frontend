<template>
  <v-app>
    <v-content>
      <router-view class='pa-12'/>
    </v-content>

    <v-navigation-drawer app absolute class="deep-purple accent-4" dark>
      <v-list dense nav class="py-0">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>HomeHue</v-list-item-title>
            <v-list-item-subtitle>Menu principal</v-list-item-subtitle>
            <v-divider></v-divider>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Accueil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to='/lights'>
          <v-list-item-icon>
            <v-icon>mdi-lightbulb-group</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Lumières</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to='/groups'>
          <v-list-item-icon>
            <v-icon>mdi-sofa</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Pièces</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-light-switch</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Capteurs</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-update</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Routines</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-btn color="primary" class='ma-3' dark x-large fixed bottom right fab @click="switchLight()">
      <v-icon>mdi-home-lightbulb</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    
  }),

  methods: {
    switchLight: function() {
      
    }
  }
};
</script>

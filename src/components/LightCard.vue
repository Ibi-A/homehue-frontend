<template>
  <v-col cols="12" xs="12" sm="12" md="6" lg="4" xl="3">
    <v-card v-if="ready">
      <v-card-title>{{ lightName }}</v-card-title>
      <v-card-actions>
        <v-switch v-model="isLightOn" @></v-switch>
      </v-card-actions>

      <v-snackbar
        v-model="snackbar"
        :timeout="2500"
      >{{ lightName }} est {{ isLightOn ? 'allumé' : 'éteint' }}</v-snackbar>
    </v-card>
  </v-col>
</template>

<script>
import axios from "axios";

export default {
  name: "LightCard",
  props: {
    lightId: String
  },
  data() {
    return {
      baseUrl: this.$store.state.baseUrl + "/lights/" + this.lightId,
      ready: false,
      snackbar: false,
      lightName: String,
      isLightOn: Boolean
    };
  },
  watch: {
    isLightOn: function(value) {
      this.updateLightState(value);
      this.snackbar = true;
    }
  },
  mounted() {
    this.getLightInfo();
  },
  methods: {
    getLightInfo() {
      axios.get(this.baseUrl).then(response => {
        this.lightName = response.data.name;
        this.isLightOn = response.data.state.on;
        this.ready = true;
      });
    },
    updateLightState(newState) {
      axios.put(this.baseUrl + "/state", { on: newState });
    }
  }
};
</script>
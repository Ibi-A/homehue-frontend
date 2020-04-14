<template>
  <v-col cols="12" xs="12" sm="12" md="6" lg="4" xl="3">
    <v-card v-if="ready" raised>
      <v-card-title>{{ lightName }}</v-card-title>
      <v-card-actions>
        <v-slider v-model="brightness" min="1" max="254" :disabled="!isLightOn"/>
        <v-switch v-model="isLightOn" />
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
      isLightOn: Boolean,
      brightness: Number
    };
  },
  watch: {
    isLightOn: function(value) {
      this.updateLightState(value);
      this.snackbar = true;
    },
    brightness: function(value) {
      this.setLightBrightness(value);
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
        this.brightness = response.data.state.bri;
        this.ready = true;
      });
    },
    updateLightState(newState) {
      axios.put(this.baseUrl + "/state", { on: newState });
    },
    setLightBrightness(value) {
      axios.put(this.baseUrl + "/state", { bri: value });
    }
  }
};
</script>
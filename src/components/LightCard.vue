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
import Hue from '@/services/hue'

export default {
  name: "LightCard",
  props: {
    lightId: String
  },
  data() {
    return {
      ready: false,
      snackbar: false,
      lightName: String,
      isLightOn: Boolean,
      brightness: Number
    };
  },
  watch: {
    isLightOn: function(value) {
      Hue.setLightState(this.lightId, value)
      this.snackbar = true;
    },
    brightness: function(value) {
      Hue.setLightBrightness(this.lightId, value)
    }
  },
  mounted() {
    this.getLightInfo();
    this.ready = true
  },
  methods: {
    getLightInfo: async function() {
      const lightInfo = await Hue.getLightInfo(this.lightId)

      console.log(lightInfo)
      this.lightName = lightInfo.name
      this.isLightOn = lightInfo.on
      this.brightness = lightInfo.brightness
    },
  }
};
</script>
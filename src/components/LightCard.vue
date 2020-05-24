<template>
  <v-col cols="12" xs="12" sm="12" md="6" lg="4" xl="3">
    <v-card v-if="ready" raised>
      <v-card-title>{{ lightName }}</v-card-title>
      <v-card-actions>
        <v-slider
          v-model="brightness"
          min="1"
          max="254"
          :disabled="!isLightOn"
          thumb-label
        />
        <v-switch v-model="isLightOn" inset />
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import Hue from "@/services/hue";

export default {
  name: "LightCard",
  props: {
    lightId: String
  },
  data() {
    return {
      ready: false,
      lightName: String,
      isLightOn: Boolean,
      brightness: Number
    };
  },
  watch: {
    isLightOn: function(value) {
      Hue.setLightState(this.lightId, value);
    },
    brightness: function(value) {
      Hue.setLightBrightness(this.lightId, value);
    }
  },
  mounted() {
    this.getLightInfo();
  },
  methods: {
    getLightInfo: async function() {
      const lightInfo = await Hue.getLightInfo(this.lightId);

      this.lightName = lightInfo.name;
      this.isLightOn = lightInfo.on;
      this.brightness = lightInfo.brightness;
      this.ready = true;
    }
  }
};
</script>
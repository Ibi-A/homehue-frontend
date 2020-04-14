<template>
  <v-col cols="12" xs="12" sm="12" md="6" lg="4" xl="3">
    <v-card v-if="ready" raised>
      <v-card-title>{{ groupName }}</v-card-title>
      <v-card-actions>
        <v-slider min="1" max="254" :disabled="!isLightOn" v-model="brightness" v-on:end="setBrightness()"/>
        <v-switch v-model="isLightOn" />
      </v-card-actions>

      <v-snackbar
        v-model="snackbar"
        :timeout="2500"
      >{{ groupName }} est {{ isLightOn ? 'allumé' : 'éteint' }}</v-snackbar>
    </v-card>
  </v-col>
</template>

<script>
import axios from "axios";

export default {
  name: "GroupCard",
  props: {
    groupId: String
  },
  data() {
    return {
      baseUrl: this.$store.state.baseUrl + "/groups/" + this.groupId,
      ready: false,
      snackbar: false,
      groupName: String,
      isLightOn: Boolean,
      brightness: Number
    };
  },
  watch: {
    isLightOn: function(value) {
      this.updateGroupState(value);
      this.snackbar = true;
    }
  },
  mounted() {
    this.getGroupInfo();
  },
  methods: {
    getGroupInfo() {
      axios.get(this.baseUrl).then(response => {
        this.groupName = response.data.name;
        this.isLightOn = response.data.state.on;
        this.brightness = response.data.state.bri;
        this.ready = true;
      });
    },
    updateGroupState(newState) {
      axios.put(this.baseUrl + "/action", { on: newState });
    },
    setBrightness() {
      axios.put(this.baseUrl + "/action", { bri: this.brightness });
    }
  }
};
</script>
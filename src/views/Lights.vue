<template>
  <v-container>
    <h1 class="display-4">Lumières</h1>
    <v-row v-if="ready" class="py-12">
      <LightCard
        v-for="lightId in lightIds"
        :key="lightId"
        :light-id="lightId"
      />
    </v-row>
  </v-container>
</template>

<script>
import LightCard from "@/components/LightCard";
import Hue from "@/services/hue";

export default {
  name: "Lights",
  data() {
    return {
      lightIds: null,
      ready: false
    };
  },
  components: {
    LightCard
  },
  mounted() {
      this.getLights()
    this.ready = true;
  },
  methods: {
    getLights: async function() {
      const response = await Hue.getLights();
      console.log(response.lights)
      this.lightIds = response.lights;
    }
  }
};
</script>
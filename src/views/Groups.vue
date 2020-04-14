<template>
  <v-container>
    <h1 class="display-4">Pièces</h1>
    <v-row v-if="ready" class="py-12">
      <GroupCard v-for="groupId in groupIds" :key="groupId" :group-id="groupId" />
    </v-row>
  </v-container>
</template>

<script>
import GroupCard from "@/components/GroupCard";
import axios from "axios";

export default {
  name: "Groups",
  data() {
    return {
      baseUrl: this.$store.state.baseUrl + "/groups",
      groupIds: [],
      ready: false
    };
  },
  components: {
    GroupCard
  },
  mounted() {
    axios.get(this.baseUrl).then(response => {
      console.log(response);

      let allGroupIds = Object.keys(response.data);

        console.log("[*] Here I am " + allGroupIds)

      for (let groupId in allGroupIds) {
        axios.get(this.baseUrl + "/" + groupId).then(response2 => {
          console.log('[*] Current group ID: ' + groupId);
          console.log('[*] Fetched data:')
          console.log(response2)
          if (response2.data.type === "LightGroup") {
            this.groupIds.push(groupId);
          }
        });
      }
      this.ready = true;
    });
  }
};
</script>
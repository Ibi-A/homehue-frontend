<template>
    <v-container>
        <h1 class="display-4">Lumières</h1>
        <v-row v-if="ready" class="py-12">
            <LightCard v-for="lightId in lightIds" :key="lightId" :light-id="lightId"/>
        </v-row>
    </v-container>
</template>

<script>
import LightCard from '@/components/LightCard'
import axios from 'axios'

export default {
    name: 'Lights',
    data() {
        return {
            baseUrl: this.$store.state.baseUrl + '/lights',
            lightIds: null,
            ready: false
        }
    },
    components: {
        LightCard
    },
    mounted() {
        axios.get(this.baseUrl).then(response => {
            this.lightIds = Object.keys(response.data)
            console.log(this.lightIds)
            this.ready = true
        })
    }
}
</script>
import axios from 'axios'
import HueConfig from '@/conf/local-config'

const baseUrl = HueConfig.hueApiBaseUrl + '/' + HueConfig.hueUsername

const endpoints = {
  lights: () => (`${baseUrl}/lights`),
  light: (lightId) => (`${endpoints.lights()}/${lightId}`),
  lightState: (lightId) => `${endpoints.light(lightId)}/state`,
}

const hue = {
  getLights: async function() {
    const response = await axios.get(endpoints.lights())
    const data = response.data
    const payload = {
      lights: Object.keys(data)
    }

    return payload
  },
  getLightInfo: async function(lightId) {
    const response = await axios.get(endpoints.light(lightId))
    const data = response.data
    const payload = {
      name: data.name,
      on: data.state.on,
      brightness: data.state.bri,
    }

    return payload
  },
  setLightState: async function(lightId, state) {
    const body = {
      on: state
    }

    await axios.put(endpoints.lightState(lightId), body)

    console.log(endpoints.lightState(lightId))
  },
  setLightBrightness: async function(lightId, brightness) {
    const body = {
      bri: brightness
    }

    await axios.put(endpoints.lightState(lightId), body)
  },
}

export default hue
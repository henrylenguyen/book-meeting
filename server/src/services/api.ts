import axios from 'axios'

const eventbriteAPI = axios.create({
  baseURL: 'https://www.eventbrite.com/api/v3',
  headers: {
    Authorization: `Bearer DM5P6EVJY7FR34IPCC`
  }
})

export default eventbriteAPI

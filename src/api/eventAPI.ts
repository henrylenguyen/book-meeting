import Http from './http'

const http = new Http('https://www.eventbrite.com/api/v3')

const eventAPI = {
  getAllOnlineEvents: async () => {
    try {
      const res = await http.get(
        '/destination/events/?event_ids=1026809162847,944160819427,1039249381877,1021502701077,924334598667,794212209097,63049080497,165655358637&expand=event_sales_status,image,primary_venue,saves,ticket_availability,primary_organizer,public_collections&page_size=50&include_parent_events=true'
      )
      if (res.status === 200) {
        return res.data
      }
    } catch (error) {
      throw new Error(error as string)
    }
  }
}

export default eventAPI

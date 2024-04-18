import got from "got";


 export const getFreeGames = async () => {
    const options = {
      method: 'GET',
      url: 'https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions?locale=fr&country=FR&allowCountries=FR',
      headers: {
        'content-type': 'application/json'
      },
      responseType: 'json',

    } 
    try {
      const response = await got(options)
      const {startDate, endDate} =response.body.data.Catalog.searchStore.elements[0].promotions.promotionalOffers[0].promotionalOffers[0]
      const {title, description, keyImages} = response.body.data.Catalog.searchStore.elements[0]
      //console.log(startDate, endDate, title, description, keyImages)
      const startedDate = new Date(startDate.substring(0, startDate.indexOf('T'))).toLocaleDateString('en-GB')
      const endedDate = new Date(endDate.substring(0, endDate.indexOf('T'))).toLocaleDateString('en-GB')
      return {startedDate, endedDate, title, description, keyImages}
    } catch(err) {
      console.error(err)
    }
  }


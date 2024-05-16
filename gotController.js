import got from "got";

 export const getFreeGames = async () => {
  const today = new Date() 
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
      const filteredFreeGames = []
      const result = []
      await response.body.data.Catalog.searchStore.elements.filter(element => {
        const endOfOffer = element.promotions?.promotionalOffers[0]?.promotionalOffers[0].endDate;
        console.log(endOfOffer)
        if (endOfOffer) {
            const endDate = new Date(endOfOffer.substring(0, endOfOffer.indexOf('T'))).toLocaleDateString('en-GB'); 
            const formattedToday = today.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }); 
            if (endDate.split('/').join('') >= formattedToday.split('/').join('')) { 
                filteredFreeGames.push(element);
            }
        }
      });
  
      //console.log(response.body.data.Catalog.searchStore.elements)
    filteredFreeGames.forEach((freeGame) => { 
    const {startDate, endDate} = freeGame.promotions.promotionalOffers[0]?.promotionalOffers[0]
    const {title, description, keyImages} = freeGame
    const startedDate = new Date(startDate.substring(0, startDate.indexOf('T'))).toLocaleDateString('en-GB')
    const endedDate = new Date(endDate.substring(0, endDate.indexOf('T'))).toLocaleDateString('en-GB')
    return result.push({startedDate, endedDate, title, description, keyImages})
    })
    return result
    } catch(err) {
      console.error(err)
    }
  }


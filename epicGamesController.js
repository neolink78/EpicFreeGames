import got from "got";

 export const getFreeGames = async (upcoming) => {
  const today = new Date() 
    const options = {
      method: 'GET',
      url: 'https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions',
      headers: {
        'content-type': 'application/json'
      },
      responseType: 'json',
    } 
    try {
      const response = await got(options)
      const result = []
      const filteredFreeGames = []
      if(!upcoming) {  
      await response.body.data.Catalog.searchStore.elements.filter(element => {
      const endOfOffer = element.promotions?.promotionalOffers[0]?.promotionalOffers[0].endDate;
      const discountPercentage = element.promotions?.promotionalOffers[0]?.promotionalOffers[0].discountSetting.discountPercentage
        if (endOfOffer && discountPercentage === 0) {
            const endDate = new Date(endOfOffer) 
            if (endDate >= today) { 
              return filteredFreeGames.push(element);
            }
        }
      });
      
    filteredFreeGames.forEach((freeGame) => { 
    const {startDate, endDate} = freeGame.promotions.promotionalOffers[0]?.promotionalOffers[0]
    const {title, description, keyImages} = freeGame
    const startedDate = new Date(startDate.substring(0, startDate.indexOf('T'))).toLocaleDateString('en-GB')
    const endedDate = new Date(endDate.substring(0, endDate.indexOf('T'))).toLocaleDateString('en-GB')
    return result.push({startedDate, endedDate, title, description, keyImages})
    })
  }

    if (upcoming) {
      let ender = null
      await response.body.data.Catalog.searchStore.elements.filter(element => {
        const endOfOffer =  element.promotions?.promotionalOffers[0]?.promotionalOffers[0].endDate;
        if (endOfOffer!== undefined) return ender = endOfOffer
        });

      await response.body.data.Catalog.searchStore.elements.filter(element => {
        const offeringStarts = element.promotions?.upcomingPromotionalOffers[0]?.promotionalOffers[0].startDate;
        const discountPercentage = element.promotions?.upcomingPromotionalOffers[0]?.promotionalOffers[0].discountSetting.discountPercentage
          if (offeringStarts === ender && discountPercentage === 0) {
                  filteredFreeGames.push(element);
          }
        });

        filteredFreeGames.forEach((freeGame) => { 
          const {startDate, endDate} = freeGame.promotions?.upcomingPromotionalOffers[0]?.promotionalOffers[0]
          const {title, description, keyImages} = freeGame
          const startedDate = new Date(startDate.substring(0, startDate.indexOf('T'))).toLocaleDateString('en-GB')
          const endedDate = new Date(endDate.substring(0, endDate.indexOf('T'))).toLocaleDateString('en-GB')
          return result.push({startedDate, endedDate, title, description, keyImages})
    })
  }
    return result
    } catch(err) {
      console.error(err)
    }
  }
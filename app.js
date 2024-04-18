import express from 'express'
import axios from 'axios'
import {getFreeGames} from './gotController.js'


const app = express();
const PORT = process.env.PORT || 3000;
const WEBHOOK_URL = 'https://discord.com/api/webhooks/1230139394690646107/JBdoDH9wIMDncE2YHhWCJMh3qtWKtz3yQEqhARZuI5gqE3uintjhD0nlyH51f33EVf5y';

 async function launcher (req, res)  {
  try {
    const {startedDate, endedDate, title, description, keyImages} = await getFreeGames()
    await axios.post(WEBHOOK_URL, {
      content: `Hey ! Le jeux gratuit est ${title}, il est dispo depuis le ${startedDate} et l'offre se termine le ${endedDate} ! ${keyImages[0].url} ${description}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Error sending message');
  }
};

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    //setInterval(
      launcher()
      //, 86400000)
  });


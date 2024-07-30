import express from 'express';
import 'dotenv/config';
import { CronJob } from 'cron';
import { launcher, client } from './freeGamesGetter.js';
import { VerifyDiscordRequest, getRandomEmoji, DiscordRequest } from './utils.js';
import {
  InteractionType,
  InteractionResponseType,
  verifyKeyMiddleware,
} from 'discord-interactions';


const { DISCORD_TOKEN, PUBLIC_KEY, PORT } = process.env;


const app = express()
app.use(express.json({ verify: VerifyDiscordRequest(PUBLIC_KEY) }));

client.on('ready',  (guild) => {
  const job = new CronJob('* 18 * * 4', () => {
   launcher(false, true)
  }, null, true, 'Europe/Paris')
  job.start()
  //   launcher(false, true)
  console.log(`Logged in as ${client.user.tag}`);
});


app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), async function (req, res) {
  const {type, id, data} = req.body
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;
    console.log(name)
    if (name === 'test') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Robot is working fine !`,
        },
      });
    }

    if (name === 'freegames') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: launcher(),
        },
      });
    }

    if (name === 'nextfreegames') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: launcher(true),
        },
      });
    }

    if (name === 'help') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Below are the valid / commands: \n /test :  will respond a test to ensure the bot works fine\n /setLanguage : to change language of response\n /freegames : to check the curent free games available\n /futuregames : to check the next free games `,
        },
      });
    }
  }
})

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});

client.login(DISCORD_TOKEN);
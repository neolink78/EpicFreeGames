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
  const job = new CronJob('0 18 * * 4', () => {
   launcher(false, true)
  }, null, true, 'Europe/Paris')
  job.start()
  //   launcher(false, true)
});


app.post('/interactions', verifyKeyMiddleware(PUBLIC_KEY), async function (req, res) {
  const {type, data} = req.body
  try {
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;
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
          content: launcher(false,false,req.body.channel.guild_id),
        },
      });
    }

    if (name === 'nextfreegames') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: launcher(true,false,req.body.channel.guild_id),
        },
      });
    }

    if (name === 'help') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: `Below are the valid / commands: \n /test :  will respond a test to ensure the bot works fine\n /freegames : to check the curent free games available\n /futuregames : to check the next free games `,
        },
      });
    }
  } } catch (err) {console.log(err)}
})

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});

client.login(DISCORD_TOKEN);
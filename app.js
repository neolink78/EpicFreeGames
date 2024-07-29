import express from 'express';
import { Client, GatewayIntentBits, ChannelType, EmbedBuilder  } from 'discord.js';
import { getFreeGames } from './epicGamesController.js'
import 'dotenv/config';
import { CronJob } from 'cron';
import {
  InteractionType,
  InteractionResponseType,
  InteractionResponseFlags,
  MessageComponentTypes,
  ButtonStyleTypes,
  verifyKeyMiddleware,
} from 'discord-interactions';
import { VerifyDiscordRequest, getRandomEmoji, DiscordRequest } from './utils.js';


const { DISCORD_TOKEN, PUBLIC_KEY, PORT } = process.env;
const client = new Client({ 
  intents: [GatewayIntentBits.Guilds] 
}); 

const app = express()
//app.use(express.json({ verify: VerifyDiscordRequest(PUBLIC_KEY) }));


async function sendMessage(channel) {
    try {
        if (!channel) throw new Error('Channel not found.');
        const freeGames = await getFreeGames();
        const embeds = []
        freeGames.map(freeGame => {embeds.push(
          new EmbedBuilder()
              .setTitle(freeGame.title)
              .setDescription(freeGame.description)
             .setColor(2326507)
              .setImage(freeGame.keyImages[1].url)
            );})
        if (freeGames.length > 1 ){        
          await channel.send({
            content: `Hey! Voici les nouveaux jeux gratuits du moment ! ils seront disponible jusqu'au ${freeGames[0].endedDate}`,
            tts: false,
            embeds: embeds,
            username: 'Epic Free games'
        });
        } else await channel.send({
          content: `Hey! Voici le nouveau jeux gratuit du moment ! il sera disponible jusqu'au ${freeGames[0].endedDate}`,
          tts: false,
          embeds: embeds,
          username: 'Epic Free games'
      });

    } catch (error) {
      const freeGames = await getFreeGames();
        console.error('Error sending message:', freeGames[0] );
    }
}  

const autoLauncher = () => {
   //const job = new CronJob('* 18 * * 4', () => {
    client.guilds.cache.map(guild => {
      const channels = guild.channels.cache;
      const texts = channels.filter(c => c.type === ChannelType.GuildText && c.permissionsFor(guild.members.me).has('SendMessages'))
      if (texts.size > 0) {
          console.log(`There is at least 1 text channel available for ${guild.name}`) //will provide your discord servers's names
          const channel = texts.first()
          sendMessage(channel)
      } else {
          console.log(`No text channel available for ${guild.name}`); //will advise that no text channel was found on your discord server
      }
  });  
  //}, null, true, 'Europe/Paris')
  //job.start()
}

client.on('ready',  (guild) => {
 //autoLauncher()
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
          content: `wassup ${getRandomEmoji()}`,
        },
      });
    }

    if (name === 'freegames') {
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: autoLauncher(),
        },
      });
    }
  }
})

app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});



client.login(DISCORD_TOKEN);
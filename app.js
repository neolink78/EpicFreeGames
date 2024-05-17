import { Client, GatewayIntentBits, ChannelType, EmbedBuilder  } from 'discord.js';
import { getFreeGames } from './gotController.js'
import 'dotenv/config';
import { CronJob } from 'cron';


const { DISCORD_TOKEN } = process.env;
const client = new Client({ 
  intents: [GatewayIntentBits.Guilds] 
}); 

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
        } else  await channel.send({
          content: `Hey! Voici le nouveau jeux gratuit du moment ! il sera disponible jusqu'au ${freeGames[0].endedDate}`,
          tts: false,
          embeds: embeds,
          username: 'Epic Free games'
      });

    } catch (error) {
        console.error('Error sending message:', error);
    }
}  

client.on('ready',  (guild) => {
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
  console.log(`Logged in as ${client.user.tag}`);
});



client.login(DISCORD_TOKEN);
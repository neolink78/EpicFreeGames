import { ChannelType, EmbedBuilder  } from 'discord.js';
import { getFreeGames } from './epicGamesController.js'
import { Client, GatewayIntentBits  } from 'discord.js';

export const client = new Client({ 
    intents: [GatewayIntentBits.Guilds] 
  }); 

export async function sendFreeGames(channel, onLaunch) {
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
            content: `Hey! Here are the ${onLaunch ? 'new' : 'current'} free games ! They will be available until ${freeGames[0].endedDate}`,
            tts: false,
            embeds: embeds,
            username: 'Epic Free games'
        });
        } else await channel.send({
          content: `Hey! Here is the ${onLaunch ? 'new' : 'current'} free game ! It will be available until ${freeGames[0].endedDate}`,
          tts: false,
          embeds: embeds,
          username: 'Epic Free games'
      });

    } catch (error) {
        console.error('Error sending message:', error );
    }
}  

export async function sendFutureFreeGames(channel) {
    try {
        if (!channel) throw new Error('Channel not found.');
        const freeGames = await getFreeGames(true);
        console.log(freeGames)
        const embeds = []
        freeGames.map(freeGame => {embeds.push(
          new EmbedBuilder()
              .setTitle(freeGame.title)
              .setDescription(freeGame.description)
             .setColor(2326507)
              .setImage(freeGame.keyImages[1].url)
            );})
         const nbrGames = freeGames.length
          await channel.send({
            content: `Here ${nbrGames > 1 ? 'are' : 'is'} the incoming free games, ${nbrGames > 1 ? 'they' : 'it'} will be available by ${freeGames[0].startedDate}`,
            tts: false,
            embeds: embeds,
            username: 'Epic Free games'
        });
    } catch (error) {
        console.error('Error sending message:', error );
    }
}  

export const launcher = (upcoming, onlaunch) => {
     client.guilds.cache.map(guild => {
       const channels = guild.channels.cache;
       const texts = channels.filter(c => c.type === ChannelType.GuildText && c.permissionsFor(guild.members.me).has('SendMessages'))
       if (texts.size > 0) {
           console.log(`There is at least 1 text channel available for ${guild.name}`)
           const channel = texts.first()
           !upcoming && sendFreeGames(channel, onlaunch)
           upcoming && sendFutureFreeGames(channel)
       } else {
           console.log(`No text channel available for ${guild.name}`);
       }
   });  
 
 }
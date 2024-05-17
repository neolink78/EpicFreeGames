Free Epic Games.

Here I created a bot that allows any discord server to have information each Thursday at 6PM about the free games from the Epic Games Store.
You can simply get the project by cloning it, run "npm install" then create a .env file, give your discord_token, go to the link 
https://discord.com/oauth2/authorize?client_id=1229474162821697647&permissions=134160&scope=bot then run "npm run dev" from your terminal. 

You will need to be the admin of your discord server in order to be able to add it.
The bot will look for the first text channel available and display the available offers provided by the Epic Games store.

Since it's the version 1.0, I for now disabled cron, which is what makes it launching by itself at the desired date. You can enable it by uncommenting lines 4, 44, 56 and 57, but please note doing so won't make the bot sending a message directly after you linked it to your discord channel.

In the upcomming version, I will have to make the project online on a server, make prompts so you can select language (now it's in French only), enable you to ask what are the upcoming free games if they are available, and maybe other things if I think about it ! :)

Hope you enjoy this tiny project and don't hesitate to provide feedbacks and future ideas !



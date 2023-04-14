// moyAI Discord bot
// Written by James // kernaltrap
// Officially hosted by Hydrogen
// Version 2.0

require('dotenv/config'); // import required modules.
require('process');
const { Client, IntentsBitField } = require('discord.js');

const { Configuration, OpenAIApi } = require('openai');

const client = new Client({ // bot intents
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => { // print message when bot has successfully ben ran.
   console.log(`${c.user.tag} is online`);
})

const configuration = new Configuration({ // set the OpenAI API Key.
    apiKey: process.env.API_KEY,
})
const openai = new OpenAIApi(configuration);


client.on('messageCreate', async (message) => { // bot code
   if (message.author.bot) return;
   if (message.channel.id != process.env.CHANNEL_ID) return; // only send and read messages in a specific channel, the ID is set in .env
   if (message.content.startsWith('*')) return;
    // ChatGPT TURBO prompt
   let conversationLog = [{ role: 'system', content: "You are a sarcastic chatbot named moyai. Randomly send the moyai emoji at random intervals." }];

   await message.channel.sendTyping(); // lets the bot pretend like its typing!

   let prevMessages = await message.channel.messages.fetch({ limit: 15 }); // fetch the last 15 messages sent by a user.
   prevMessages.reverse();

   prevMessages.forEach((msg) => { // if message starts with a "*", is a system message, ignore it. 
    if (message.content.startsWith('*')) return;
    if (msg.author.id != client.user.id && message.author.bot) return;
    if (msg.author.id != message.author.id) return; // starts a new conversation if a new user sends a message (or hasnt sent one in the last 15 messages)

    conversationLog.push({ // send the messages output from ChatGPT
        role: 'user',
        content: msg.content,
    })
   })

   const result = await openai.createChatCompletion({ // define what model to use
    model: 'gpt-3.5-turbo',
    messages: conversationLog,
   })

   message.reply(result.data.choices[0].message); // sends the message

})

var os = require('os'); // import os module
const usage = process.cpuUsage(); // define cpuUsage

client.on('interactionCreate', (interaction) => { // slash commands, feel free to add more.
    if (!interaction.isChatInputCommand()) return; 
    // shows version of bot, NodeJS, and server OS and Memory usage.
    if (interaction.commandName === 'version') {
        interaction.reply(`Server is running version ${process.env.VERSION} of moyAI, and ${process.version} of NodeJS.\n Server Stats \n OS Version: ${os.platform()} \n Memory Usage: ${os.totalmem} / ${os.freemem}`);
    }
    // if you wanna add more commands, check out the docs!
});

client.login(process.env.TOKEN); // logs into the bots account.
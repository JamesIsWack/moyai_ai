const {REST, Routes } = require('discord.js');
require('dotenv/config');

const commands = [
    {
        name: 'version',
        description: 'Prints current bot version, as well as some server-side info.',
    },
 
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () =>{
    try {
        console.log('Registering slash commands...');

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.APP_ID, 
                process.env.GUILD_ID
                ),
        { body: commands }
        );

        console.log('Successfully registered slash commands.');
    } catch (error) {
        console.log(`Oh snap, something went wrong! Error details: ${error}`);
    }
})();

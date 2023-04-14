# How to add more slash commands
Its very simple really. In the `register-commands.js` file, add a new command name and description.

```
const commands = [
    {
        name: 'new-command-name',
        description: 'Helpful description of what this command does.',
    }
]
```

Every new command will be a new line inside the `const commands`.

```
const commands = [
    {
        name: 'new-command-name',
        description: 'Helpful description of what this command does.',
    }

    {
        name: 'cooler-command-name',
        description: 'More helpful description',
    }
]
```

Then add the code the the bots `index.js`

```
client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return; 

    if (interaction.commandName === 'exact-comand-name') {
        interaction.reply(`This is what the bot will reply with.`);
    }

});
```
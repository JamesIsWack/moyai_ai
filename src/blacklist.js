  // User BlackList Script
  
  const arrayOfUsersIds = ['658361671236190259', '1022248762019680359']; // blacklist, ignore messages from these member IDs.
    for (let i = 0; i < arrayOfUsersIds.length; i++) {
        if (message.author.id === arrayOfUsersIds[i]) return message.reply('You are on the blacklist!');
    };

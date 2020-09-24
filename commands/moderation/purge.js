/**
 * Command entry function
 *
 * @param bot
 * @param message
 * @param args
 */
module.exports.run = async(bot, message, args) => {

    // Check if user has required permissions
    // Check if user is an administrator
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.reply(`You're not allowed to execute this command!`);
    }

    // Amount of messages to purge
    const purgeAmount = args[0];

    // No purge amount was specified
    if (!purgeAmount) {
        return message.channel.send("** Please specify amount of messages to purge! Choose between 1 - 100 **");
    }

    // No more than 100
    if (purgeAmount > 100 || purgeAmount < 1) {
        return message.channel.send("You can only purge ** 1 - 100 ** messages due to Discord limitation");
    }

    // Delete messages
    await message.channel.bulkDelete(purgeAmount)
        .catch(() => message.channel.send(`** Failed to delete ${purgeAmount} messages! **`))
}


module.exports.meta = {
    name: 'purge',
    author: 'Marek Dev',
    alias: ['p'],
    version: '1.0.0'
}
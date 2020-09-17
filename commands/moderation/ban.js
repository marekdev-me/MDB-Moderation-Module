const Discord = require('discord.js');

/**
 * Command entry point
 * 
 * @param {*} bot 
 * @param {*} message 
 * @param {*} args 
 */
module.exports.run = async (bot, message, args) => {

    message.channel.send(process.env.BOT_TOKEN)
    // Check if user is an administrator
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.reply(`You're not allowed to execute this command!`);
    }

    // Get mentioned user
    const user = message.mentions.users.first();

    // No user was mentioned
    if (!user) return message.reply("Please mention an existing user!");

    // Compose ban reason from args after mention
    const banReason = args.slice(1).join(' ');

    // Author of command cannot ban themself
    if (user == message.author) return message.reply("Can not ban yourself!");

    // OOPS no ban reason was specified
    if (!banReason) return message.reply("No reason has been specified!");

    // Bot does not have required permissions
    if (!message.guild.member(user).bannable) return message.reply("You can not ban this user because bot has not sufficient permissions!");

    // Ban user
    await message.guild.ban(user);
    

    // Send ban confirmation embed to channel 
    const banConfirmationEmbed = new Discord.RichEmbed()
    .setColor('RED')
    .setDescription(`✅ ${user.tag} has been successfully banned!`);

    message.channel.send({
        embed: banConfirmationEmbed
    })

}


module.exports.meta = {
    name: 'ban',
    author: 'Marek Dev',
    version: '1.0.0'
}
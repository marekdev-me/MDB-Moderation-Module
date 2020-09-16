const Discord = require('discord.js');


module.exports.run = async (bot, message, args) => {

    // Check if user is an administrator
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        return message.reply(`You're not allowed to execute this command!`);
    }

    // Get mentioned user
    const user = message.mentions.users.first();

    if (!user) return message.reply("Please mention an existing user!");

    const banReason = args.slice(1).join(' ');

    if (user == message.author) return message.reply("Can not ban yourself!");

    if (!banReason) return message.reply("No reason has been specified!");

    if (!message.guild.member(user).bannable) return message.reply("You can not ban this user because bot has not sufficient permissions!");

    await message.guild.ban(user);
    

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
const { RichEmbed } = require('discord.js');


/**
 * Command entry point
 * 
 * @param bot
 * @param message
 * @param args
 */

exports.run = async (bot, message, args) => {

    // Check if message was sent in guild
    if (!message.guild) return;

    // Check if user has required permissions
    if (!message.member.hasPermission("BAN_MEMBERS")) {

        return message.reply(`You're not allowed to execute this command!`);
    }

    // Check if user id was supplied
    if (!args[0]) {

        return message.reply("Please specify user ID!");
    
    }

    // Get userid
    const userToUnban = args[0];

    message.guild.unban(userToUnban).then(() => {

        const unabnnedEmbed = new RichEmbed()
        .setTitle("Member Unbanned")
        .setDescription(`Unbanned ${userToUnban} (ID)`)
        .setAuthor(message.author.username + "#" + message.author.discriminator, `${message.author.avatarURL}`)
        .addField("BY", `${message.author.username} # ${message.author.discriminator}`)
        .setColor('GREEN')
        .setTimestamp()

        return message.channel.send({
            embed: unabnnedEmbed
        })

    }).catch(() => {
        // Inavlid userid specified
        return message.reply("Invalid user ID specified!");
    });

}


exports.meta =  {
    name: 'unban',
    author: 'Marek Dev',
    version: '1.0.0'
}
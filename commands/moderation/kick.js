const { RichEmbed } = require('discord.js');

/**
 * 
 * @param bot
 * @param message
 * @param args
 */
exports.run = async (bot, message, args) => {

    // Check if its DM or Guild
    if (!message.guild) return;


    // Check if user has permissions
    if (!message.member.hasPermission('KICK_MEMBERS')) {

        return message.reply(`You're not allowed to execute this command!`);
    
    }


    const userToKick = message.mentions.members.first();

    // Check if user was mentioned
    if (!userToKick) {

        return message.reply(`Please mention user to kick!`);

    }


    // Kick user
    userToKick.kick().then((member) => {

        const userKicked = new RichEmbed()
            .setTitle("Member Kicked")
            .setDescription(`Kicked ${member.discriminator}`)
            .setAuthor(message.author.username + "#" + message.author.discriminator, `${message.author.avatarURL}`)
            .addField("BY", `${message.author.username} # ${message.author.discriminator}`)
            .setColor('RED')
            .setTimestamp();

        return message.channel.send({
            embed: userKicked
        })

    }).catch(() => {
        // Invalid user ID specified
        return message.reply('ERROR: Invalid user ID specified!');
    })
}


exports.meta = {
    name: 'kick',
    author: 'Marek Dev',
    version: '1.0.0'
}
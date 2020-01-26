const Discord = require('discord.js');
const tools = require('../tools');

module.exports = {
	name: 'addemoji',
    aliases: ['a', 'addemote'],
	description: 'Adds an emoji to this server',
    usage: '[image attachment/url/@user] <name>',
    args: true,
    guildOnly: true,
    ownerOnly: false,
    cooldown: 6,
	async execute(message, args) {
        try {
            if (args.length > 2) throw "too many arguments (max 2)";
            const name = args[args.length - 1];
            let link = message.author.avatarURL;
            const lastMsgs = await message.channel.fetchMessages(10);
            const attachmentMsg = lastMsgs.find((msg) => msg.attachments.size);
            if (attachmentMsg) link = attachmentMsg.attachments.first().url;
            if (message.mentions.users.size) link = message.mentions.users.first().avatarURL;
            if (message.attachments.size) link = message.attachments.first().url;
            if (args.length == 2 && !message.mentions.users.size) link = args[0];

            message.guild.createEmoji(link, name).then((emoji) => {
                const embed = tools.makeEmbed('<:mdCheck:568466407616938004> Added emoji!', `added the emoji ${args[args.length-1]}`);
                message.channel.send(embed);
            }).catch((error) => {
                return tools.errorMessage(message, err);
            });
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

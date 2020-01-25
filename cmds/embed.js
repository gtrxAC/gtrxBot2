const Discord = require('discord.js');
const tools = require('../tools');

module.exports = {
	name: 'embed',
    aliases: ['emb'],
	description: 'Sends an embed with a title, desc, footer and color.',
    usage: "<title>|[description]|[footer]|[color]",
    args: true,
    guildOnly: false,
    ownerOnly: false,
	async execute(message, args) {
        try {
            message.delete();
            const input = args.join(' ').split('|');
            if (input.length > 4) throw "too many arguments (max 4)"
            const embed = new Discord.RichEmbed()
            .setTitle(input[0])
            if (input.length > 1) embed.setDescription(input[1]);
            if (input.length > 2) embed.setFooter(input[2]);
            if (input.length > 3) embed.setColor(input[3]);
            else embed.setColor(0x7289DA);
            message.channel.send(embed);
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

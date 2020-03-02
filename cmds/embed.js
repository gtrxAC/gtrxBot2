const Discord = require('discord.js');
const tools = require('../tools');

module.exports = {
	name: 'embed',
	description: 'Sends an embed with a title, desc, footer and color',
    usage: "<title>|[description]|[footer]|[color]",
    args: true,
	async execute(message, args) {
        try {
            //delete the command message, most people would do that
            message.delete();

            //separate args by |, not space
            const input = args.join(' ').split('|');

            //max 4 arguments
            if (input.length > 4) throw 'too many arguments (max 4)'

            //create the embed and send it
            const embed = new Discord.MessageEmbed()
            .setTitle(input[0])
            if (input.length > 1) embed.setDescription(input[1]);
            if (input.length > 2) embed.setFooter(input[2]);
            if (input.length > 3) embed.setColor(input[3]);
            else embed.setColor(0x7289DA);
            tools.sendEmbed(message.channel, embed);
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

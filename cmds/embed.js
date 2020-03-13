const Discord = require('discord.js');
const tools = require('../tools');

module.exports = {
    name: 'embed',
    description: 'Sends an embed with a title, desc, footer and color',
    usage: "<title>|[description]|[footer]|[color]|[image url]",
    args: true,
    async execute(message, args) {
        try {
            //separate args by |, ignore if escaped with a backslash
            const input = args.join(' ').split(/(?<!\\)\|/g);

            //max 5 arguments
            if (input.length > 5) throw "too many arguments, max 5";

            //create the embed and send it, replacing the escaped \|'s with unescaped |'s
            const embed = new Discord.MessageEmbed()
            .setTitle(input[0].replace(/\\\|/g, '|'))
            if (input.length > 1) embed.setDescription(input[1].replace(/\\\|/g, '|'));
            if (input.length > 2) embed.setFooter(input[2].replace(/\\\|/g, '|'));
            if (input.length > 3) embed.setColor(input[3].replace(/\\\|/g, '|'));
            if (input.length > 4) embed.setImage(input[4].replace(/\\\|/g, '|'));
            else embed.setColor(0x7289DA);
            tools.sendEmbed(message.channel, embed);

            //delete the command message, most people would do that anyway
            message.delete();
        } catch (err) {
            return tools.errorMessage(message, err);
        }
    },
};

const Discord = require('discord.js');
const tools = require('../tools');

module.exports = {
	name: 'snipe',
    aliases: ['sn'],
	description: 'Reveals the last deleted message.',
    usage: '',
    args: false,
    guildOnly: false,
    ownerOnly: false,
	async execute(message, args) {
        try {
            const delMsg = message.client.lastDel.get(message.channel.id)
            if(delMsg === undefined) throw 'no message found';
            const embed = tools.makeEmbed(`${delMsg.author} said:`, delMsg.content);
            message.channel.send(embed);
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

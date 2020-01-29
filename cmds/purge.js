const Discord = require('discord.js');
const tools = require('../tools');

module.exports = {
	name: 'purge',
    aliases: ['p'],
	description: 'Removes many messages at once.',
    usage: '<num of msgs>',
    args: true,
    guildOnly: true,
    ownerOnly: false,
	async execute(message, args) {
        try {
            if (message.member.permissions.has('MANAGE_MESSAGES')) {
                message.channel.bulkDelete(Number(args[0])+1).then((msgs) => {
                    const embed = tools.makeEmbed('<:mdCheck:568466407616938004> Success', `deleted ${args[0]} messages`)
                    message.channel.send(embed).then((msg) => {
                        msg.delete(3000);
                    });
                }).catch((err) => {
                    return tools.errorMessage(message, err);
                });
            } else {
                throw "you don't have the manage messages permission";
            }
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

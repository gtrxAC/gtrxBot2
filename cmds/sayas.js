const Discord = require('discord.js');
const tools = require('../tools');

module.exports = {
	name: 'sayas',
    aliases: ['sas', 'saya'],
	description: 'Sends a message as a look-alike of another user.',
    usage: '<@user> <message ...>',
    args: true,
    guildOnly: false,
    ownerOnly: false,
    cooldown: 6,
	async execute(message, args) {
        try {
            message.delete();
            if (!message.mentions.users.size) throw "no user mentioned";
            const target = message.mentions.users.first();
            const content = args.slice(1).join(' ');
            message.channel.createWebhook(target.username, target.avatarURL).then((hook) => {
                hook.send(content.replace(/(@everyone|@here)/gm, ' `[mention removed]` ')).then(() => {
                    hook.delete();
                });
            });
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

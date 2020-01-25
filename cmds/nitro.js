const Discord = require('discord.js');
const tools = require('../tools');

module.exports = {
	name: 'nitro',
    aliases: ['n'],
	description: 'Sends all specified emoji.\nUseful for sending nitro emoji without a subscription.',
    usage: '[-s] <emoji ...>\n\n-s: Send as a look-alike of your user',
    args: true,
    guildOnly: false,
    ownerOnly: false,
    cooldown: 3,
	async execute(message, args) {
        try {
            let target;
            if (args[0] === '-s') {
                args.shift();
                target = await message.channel.createWebhook(
                    message.author.username, message.author.avatarURL);
            } else {
                target = message.channel;
            }
            let output = '';
            args.forEach((emojiName) => {
                const emoji = message.client.emojis.find("name", emojiName);
                if (emoji) {
                    output = `${output} ${emoji}`;
                } else {
                    message.channel.send(`${emojiName} not found.`);
                };
            });
            target.send(output).catch((error) => {
                return tools.errorMessage(message, error);
            });
            if (target instanceof Discord.Webhook) target.delete();
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

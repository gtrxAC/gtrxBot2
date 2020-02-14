const Discord = require('discord.js');
const tools = require('../tools');

module.exports = {
	name: 'nitro',
    aliases: ['n'],
	description: 'Sends all the specified emoji.',
    usage: '[-s] <emoji ...>\n\n-s: Send as a look-alike of your user',
    args: true,
    cooldown: 3,
	async execute(message, args) {
        try {
            //if -s was added, create a webhook and send as that instead
            let target;
            if (args[0] === '-s') {
                args.shift();
                target = await message.channel.createWebhook(
                    message.author.username, message.author.avatarURL);
            } else {
                target = message.channel;
            }
            let output = '';

            //loop through every emoji and add it to the output, or warn if emoji not found
            args.forEach((emojiName) => {
                const emoji = message.client.emojis.find("name", emojiName);
                if (emoji) {
                    output = `${output} ${emoji}`;
                } else {
                    message.channel.send(`${emojiName} not found.`);
                };
            });

            //send the output
            target.send(output).catch((error) => {
                return tools.errorMessage(message, error);
            });

            //clean up webhook if it was used
            if (target instanceof Discord.Webhook) target.delete();
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

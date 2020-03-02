const tools = require('../tools');

module.exports = {
	name: 'snipe',
	description: 'Reveals the last deleted message',
    usage: '[#channel]',
	async execute(message, args) {
        try {
            //use a mentioned channel, or the current one if none were mentioned
            let channel;
            if (message.mentions.channels.size) {
                channel = message.mentions.channels.first();
            } else {
                channel = message.channel;
            }

            //find an edited message, send an error if none were found
            const delMsg = message.client.lastDel.get(channel.id);
            if (delMsg === undefined) throw 'no message found';

            //send an embed with the message content
            const embed = tools.makeEmbed(`${delMsg.author} said:`, delMsg.content);
            if (delMsg.attachments.size) embed.addField('Attachment', delMsg.attachments.first().url);
            tools.sendEmbed(message.channel, embed);
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

const tools = require('../tools');

module.exports = {
	name: 'editsnipe',
    aliases: ['editsn', 'esn'],
	description: 'Reveals the history of an edited message.',
    usage: '[#channel]',
	async execute(message, args) {
        try {
            //use a mentioned channel, or the current one if none were mentioned
            let channel;
            if (message.mentions.channels.size) {
                channel = message.mentions.channels.first();
            } else {
                channel = message.channel;
            };

            //find an edited message, send an error if none were found
            const editedMsg = message.client.lastEdits.get(channel.id);
            if (editedMsg === undefined) throw 'no message found';

            //create an embed with the message content
            const embed = tools.makeEmbed(`${editedMsg.author} said:`)
            .setDescription('')
            .addField('Old Message', `\`${editedMsg.oldContent}\``)
            .addField('New Message', `\`${editedMsg.newContent}\``);
            message.channel.send(embed);
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

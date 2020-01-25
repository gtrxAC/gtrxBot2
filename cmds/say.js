const tools = require('../tools');

module.exports = {
	name: 'say',
    aliases: ['echo', 's', 'ec'],
	description: 'Sends the specified message.',
    usage: '<message ...>',
    args: true,
    guildOnly: false,
    ownerOnly: false,
	async execute(message, args) {
        try {
            message.delete();
            const content = args.join(' ')
            .replace(/(@everyone|@here)/gm, ' `[Mention Removed]` ');
            message.channel.send(content);
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

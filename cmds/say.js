const tools = require('../tools');

module.exports = {
	name: 'say',
    aliases: ['echo', 's', 'ec'],
	description: 'Sends the specified message.',
    usage: '<message ...>',
    args: true,
	async execute(message, args) {
        try {
            message.delete();
            const content = args.join(' ')
            //remove pings, we don't want ping exploits
            .replace(/(@everyone|@here)/gm, ' `[Mention Removed]` ');
            message.channel.send(content);
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

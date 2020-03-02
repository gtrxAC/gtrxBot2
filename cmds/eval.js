const tools = require('../tools');

module.exports = {
	name: 'eval',
	description: 'Run JavaScript code (bot owner only)',
    usage: '<code ...>',
    args: true,
    ownerOnly: true,
	async execute(message, args) {
        try {
            const output = eval(args.join(' '));
            const embed = tools.makeEmbed('<:mdCheck:568466407616938004> Success', output);
            tools.sendEmbed(message.channel, embed);
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

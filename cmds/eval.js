const tools = require('../tools');

module.exports = {
    name: 'eval',
    aliases: ['run', 'exec'],
    description: 'Run JavaScript code',
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

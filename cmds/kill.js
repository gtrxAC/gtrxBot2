const Discord = require('discord.js');
const tools = require('../tools');

module.exports = {
	name: 'kill',
    aliases: ['k'],
	description: 'Kills the specified user in a random way.',
    usage: '[text or @user]',
    args: false,
    guildOnly: false,
    ownerOnly: false,
	async execute(message, args) {
        try {
            let target;
            if (args.length) {target = args.join(' ')}
            else {target = message.author;};
            const messages = [
                `${target} died.`,
                `${target} ate too much ass.`,
                `${target} didn't join [the meme cave](http://discord.gg/dvsxQQG).`,
                `${target} was caught awake at 3am.`,
                `${target} got rejected.`,
                `${target} nutted twice in a day, his weak body couldn't last any more.`,
                `${target} laughed at an instagram meme.`,
                `${target} got wooooshed.`,
                `${target} was a mod in r/dankmemes.`,
                `${target} ran out of ideas.`
            ]
            const killMsg = messages[Math.floor(Math.random() * messages.length)];
            const embed = tools.makeEmbed('', '')
            .setDescription(killMsg);
            message.channel.send(embed);
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

const Discord = require('discord.js');

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
                `${target} dies.`,
                `${target} ate too much ass.`,
                `${target} didn't join [the meme cave](http://discord.gg/dvsxQQG).`,
                `${target} was caught awake at 3am.`,
                `${target} got rejected.`,
                `${target} nutted twice in a day, his weak body couldn't last any more.`,
                `${target} laughed at an instagram meme.`,
                `${target} got wooooshed.`
            ]
            const killMsg = messages[Math.floor(Math.random() * messages.length)];
            const embed = new Discord.RichEmbed()
            .setColor(0x7289DA)
            .setDescription(`${killMsg}`)
            .setFooter(new Date().toISOString());
            message.channel.send(embed);
        } catch (error) {
            const embed = new Discord.RichEmbed()
            .setColor(0x7289DA)
            .setTitle('<:mdError:568466408250408970> Error')
            .setDescription(`\`${error}\``)
            .setFooter(new Date().toISOString());
            message.channel.send(embed);
        }
	},
};

const Discord = require('discord.js');

module.exports = {
	name: 'eval',
    aliases: ['ev'],
	description: 'Run JavaScript code',
    usage: '<code ...>',
    args: true,
    guildOnly: false,
    ownerOnly: true,
	async execute(message, args) {
        try {
            const output = eval(args.join(' '));
            const embed = new Discord.RichEmbed()
            .setColor(0x7289DA)
            .setTitle('<:mdCheck:568466407616938004> Success')
            .setDescription(`\`${output}\``)
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

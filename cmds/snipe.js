const Discord = require('discord.js');

module.exports = {
	name: 'snipe',
    aliases: ['sn'],
	description: 'Reveals the last deleted message.',
    usage: '',
    args: false,
    guildOnly: false,
    ownerOnly: false,
	async execute(message, args) {
        try {
            const delMsg = message.client.lastDel.get(message.channel.id)
            if(delMsg === undefined) throw 'no message found';
            const embed = new Discord.RichEmbed()
            .setColor(0x7289DA)
            .setTitle(delMsg.author)
            .setDescription(delMsg.content)
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

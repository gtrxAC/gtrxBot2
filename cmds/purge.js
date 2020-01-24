const Discord = require('discord.js');

module.exports = {
	name: 'purge',
    aliases: ['p'],
	description: 'Removes many messages at once.',
    usage: '<num of msgs>',
    args: true,
    guildOnly: true,
    ownerOnly: false,
	async execute(message, args) {
        try {
            if (message.member.permissions.has('MANAGE_MESSAGES')) {
                message.channel.bulkDelete(Number(args[0])+1).then((msgs) => {
                    const embed = new Discord.RichEmbed()
                    .setColor(0x7289DA)
                    .setTitle('<:mdCheck:568466407616938004> Success')
                    .setDescription(`\`deleted ${args[0]} messages\``)
                    .setFooter(new Date().toISOString());
                    message.channel.send(embed).then((msg) => {
                        msg.delete(3000);
                    });
                }).catch((err) => {
                    const embed = new Discord.RichEmbed()
                    .setColor(0x7289DA)
                    .setTitle('<:mdError:568466408250408970> Error')
                    .setDescription(`\`${err}\``)
                    .setFooter(new Date().toISOString());
                    message.channel.send(embed);
                });
            } else {
                throw 'you don\'t have the manage messages permission';
            }
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

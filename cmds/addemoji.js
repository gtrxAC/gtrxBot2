const Discord = require('discord.js');

module.exports = {
	name: 'addemoji',
    aliases: ['a', 'addemote'],
	description: 'Adds an emoji to this server',
    usage: '[attachment/url] <name>',
    args: true,
    guildOnly: true,
    ownerOnly: false,
    cooldown: 6,
	async execute(message, args) {
        try {
            let link;
            let name;
            if (args.length > 2) throw "too many arguments (max 2)";
            if (args.length == 1) {
                if (message.attachments.size) {
                    link = message.attachments.first().url;
                    name = args[0];
                } else {throw "no image attached"};
            } else {
                link = args[0];
                name = args[1];
            };
            message.guild.createEmoji(link, name).then((emoji) => {
                const embed = new Discord.RichEmbed()
                .setColor(0x7289DA)
                .setTitle('<:mdCheck:568466407616938004> Added emoji!')
                .setFooter(new Date().toISOString());
                message.channel.send(embed);
            }).catch((error) => {
                const embed = new Discord.RichEmbed()
                .setColor(0x7289DA)
                .setTitle('<:mdError:568466408250408970> Error')
                .setDescription(`\`${error}\``)
                .setFooter(new Date().toISOString());
                message.channel.send(embed);
            });
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

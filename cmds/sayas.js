const Discord = require('discord.js');

module.exports = {
	name: 'sayas',
    aliases: ['sas', 'saya'],
	description: 'Sends a message as a look-alike of another user.',
    usage: '<@user> <message ...>',
    args: true,
    guildOnly: false,
    ownerOnly: false,
    cooldown: 6,
	async execute(message, args) {
        try {
            message.delete();
            if (!message.mentions.users.size) throw "No user mentioned!";
            const target = message.mentions.users.first();
            const content = args.slice(1).join(' ');
            message.channel.createWebhook(target.username, target.avatarURL).then((hook) => {
                hook.send(content.replace(/(@everyone|@here)/gm, ' `[Mention Removed]` ')).then(() => {
                    hook.delete();
                });
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

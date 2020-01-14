module.exports = {
	name: 'say',
    aliases: ['echo', 's', 'ec'],
	description: 'Sends the specified message.',
    usage: '<message ...>',
    args: true,
    guildOnly: false,
    ownerOnly: false,
	async execute(message, args) {
        try {
            message.delete();
            const content = args.join(' ')
            .replace(/(@everyone|@here)/gm, ' `[Mention Removed]` ');
            message.channel.send(content);
        } catch (error) {
            const embed = new Discord.RichEmbed()
            .setColor(0x7289DA)
            .setTitle('<:mdError:568466408250408970> Error')
            .setDescription(`\`Couldn't reload command\n${error}\``)
            .setFooter(new Date().toISOString());
            message.channel.send(embed);
        }
	},
};

const tools = require('../tools');

module.exports = {
	name: 'mention',
    aliases: ['m'],
	description: "Mention a role that isn't mentionable.",
    usage: '<role>',
    args: true,
    guildOnly: true,
    requires: 'MENTION_EVERYONE',
	async execute(message, args) {
        try {
            args = message.content.split(' ').slice(1).join(' ');
            message.delete()
            const role = message.guild.roles.find(r => (r.name == args || r.id == args[0] || r.name.includes(args)));
            if (!role) throw 'no role found';
            await role.setMentionable(true);
            await message.channel.send(role.toString());
            role.setMentionable(false);
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

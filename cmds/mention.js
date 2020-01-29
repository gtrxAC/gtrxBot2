const Discord = require('discord.js');
const tools = require('../tools');

module.exports = {
	name: 'mention',
    aliases: ['m'],
	description: "Mention a role that isn't mentionable",
    usage: '<role>',
    args: true,
    guildOnly: true,
    ownerOnly: false,
	async execute(message, args) {
        try {
            if (message.member.permissions.has('MENTION_EVERYONE')) {
                message.delete()
                const role = message.guild.roles.find(r => r.name == args.join(' ') || r.name.split(' ')[0] == args[0] || r.id == args[0]);
                if (!role) throw 'no role found';
                await role.setMentionable(true);
                await message.channel.send(role.toString());
                role.setMentionable(false);
            } else {
                throw "you don't have the mention everyone permission";
            }
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

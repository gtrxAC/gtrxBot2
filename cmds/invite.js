const Discord = require('discord.js');
const tools = require('../tools');

module.exports = {
	name: 'invite',
    aliases: ['in', 'support', 'su'],
	description: 'Invite gtrxBot² to your server.',
    usage: '',
    args: false,
    guildOnly: false,
    ownerOnly: false,
	async execute(message, args) {
        try {
            const embed = new Discord.RichEmbed()
            .setColor(0x7289DA)
            .setTitle('<:mdExternal:568466408212529153> Links')
            .setDescription(
            `[Add me to your server](https://discordapp.com/api/oauth2/authorize?client_id=568738663572176916&permissions=8&scope=bot)\n`+
            `[Join the meme cave™](http://discord.gg/dvsxQQG)\n`+
            `[Join development server](https://discord.gg/bRTPbpg)\n`+
            `[Join icon emotes server](https://discord.gg/TVQdyea)`)
            .setFooter(new Date().toISOString());
            message.channel.send(embed);
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

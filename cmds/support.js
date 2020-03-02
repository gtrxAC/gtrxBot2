const Discord = require('discord.js');
const tools = require('../tools');

module.exports = {
	name: 'support',
    aliases: ['invite', 'addbot', 'getbot'],
	description: 'Join the support server or invite gtrxBot² to your server',
    usage: '',
	async execute(message, args) {
        try {
            const embed = new Discord.MessageEmbed()
            .setColor(0x7289DA)
            .setTitle('<:mdExternal:568466408212529153> Links')
            .setDescription(
            `[Add me to your server](https://discordapp.com/api/oauth2/authorize?client_id=${message.client.user.id}&permissions=8&scope=bot)\n`+
            `[Join the meme cave™](https://discord.gg/vRzh7wr)\n`+
            `[Join development server](https://discord.gg/bRTPbpg)\n`+
            `[Join icon emotes server](https://discord.gg/TVQdyea)`)
            .setFooter(new Date().toISOString());
            tools.sendEmbed(message.channel, embed);
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

const Discord = require('discord.js');
const tools = require('../tools');

module.exports = {
    name: 'invite',
    aliases: ['support', 'addbot', 'getbot'],
    description: 'Add gtrxBot² to your server or join the support server',
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
            `[Join icon emotes server](https://discord.gg/TVQdyea)\n`+
            `[View source code](https://github.com/gtrxAC/gtrxBot2)`)
            .setFooter(new Date().toISOString());
            tools.sendEmbed(message.channel, embed);
        } catch (err) {
            return tools.errorMessage(message, err);
        }
    },
};

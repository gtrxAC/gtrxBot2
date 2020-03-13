const Discord = require('discord.js');
const fetch = require('node-fetch');
const tools = require('../tools');

module.exports = {
    name: 'emoji',
    aliases: ['emote'],
    description: 'Gets a random emoji from discordemoji.com',
    usage: '',
    nsfw: true,
    cooldown: 4,
    async execute(message, args) {
        try {
            //get all emoji from discordemoji's api
            const response = await fetch('https://discordemoji.com/api').then(r => r.json());

            //choose a random one
            const emoji = response[Math.floor(Math.random() * response.length)];

            //use the emoji category's name instead of just a number
            const categories = ['Unknown', 'Original Style', 'TV/Movie', 'Meme', 'Anime', 'Celebrity', 'Blobs',
            'Thinking', 'Animated', 'NSFW', 'Gaming', 'Letters', 'Other', 'Pepe', 'Logos', 'Cute', 'Utility',
            'Animals', 'Recolors'];
            const category = categories[emoji.category];

            //create an embed with the emoji info, and send it along with the emoji itself
            const embed = new Discord.MessageEmbed()
            .setColor(0x7289DA)
            .setTitle(`<:mdEmoji:568466408535490571> Emoji ${emoji.title}`)
            .setDescription(`\`\`\`Name:     ${emoji.title}\n`+
            `Author:   ${emoji.submitted_by}\n`+
            `Category: ${category}\n`+
            `Faves:    ${emoji.faves}\`\`\``)
            .setFooter(`ID: ${emoji.id} | ${new Date().toISOString()}`);
            await tools.sendEmbed(message.channel, embed);
            message.channel.send({files: [emoji.image]});
        } catch (err) {
            return tools.errorMessage(message, err);
        }
    },
};

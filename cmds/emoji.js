const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'emoji',
    aliases: ['emote', 'emo'],
	description: 'Gets a random emoji from discordemoji.com. (nsfw)',
    usage: '',
    args: false,
    guildOnly: false,
    ownerOnly: false,
    cooldown: 4,
	async execute(message, args) {
        try {
            if (!message.channel.nsfw) throw "This command is NSFW only, due to some emoji being NSFW."
            const response = await fetch('https://discordemoji.com/api').then(r => r.json());
            const emoji = response[Math.floor(Math.random() * response.length)];
            const categories = ['Unknown', 'Original Style', 'TV/Movie', 'Meme', 'Anime', 'Celebrity', 'Blobs',
            'Thinking', 'Animated', 'NSFW', 'Gaming', 'Letters', 'Other', 'Pepe', 'Logos', 'Cute', 'Utility',
            'Animals', 'Recolors', 'Unknown', 'Unknown', 'Unknown', 'Unknown'];
            const category = categories[emoji.category];
            const embed = new Discord.RichEmbed()
            .setColor(0x7289DA)
            .setTitle(`<:mdEmoji:568466408535490571> Emoji ${emoji.title}`)
            .setDescription(`\`\`\`Name:     ${emoji.title}\n`+
            `Author:   ${emoji.submitted_by}\n`+
            `Category: ${category}\n`+
            `Faves:    ${emoji.faves}\`\`\``)
            .setFooter(`ID: ${emoji.id} | ${new Date().toISOString()}`);
            message.channel.send(embed);
            message.channel.send({files: [emoji.image]});
        } catch (error) {
            const embed = new Discord.RichEmbed()
            .setColor(0x7289DA)
            .setTitle('<:mdError:568466408250408970> Error')
            .setDescription(`\`${error}\``)
            .setFooter(new Date().toISOString());
            message.channel.send(embed);
            console.error(error);
        }
	},
};

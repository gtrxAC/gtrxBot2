const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
	name: 'iinside',
    aliases: ['ii'],
	description: 'I\'m sick of crying, tired of trying, yeah I\'m smiling but inside I\'m...',
    usage: '[image attachment/url/@user] <text ...>',
    args: false,
    guildOnly: false,
    ownerOnly: false,
	async execute(message, args) {
        try {
            let link = message.author.avatarURL;
            const lastMsgs = await message.channel.fetchMessages(10);
            const attachmentMsg = lastMsgs.find((msg) => msg.attachments.size);
            if (args.length && !attachmentMsg && !message.mentions.users.size &&
                !message.attachments.size) link = args.shift();
            if (attachmentMsg) link = attachmentMsg.attachments.first().url;
            if (message.mentions.users.size) link = message.mentions.users.first().avatarURL;
            if (message.attachments.size) link = message.attachments.first().url;

            const canvas = Canvas.createCanvas(1000, 1140);
            const ctx = canvas.getContext('2d');
            
            const background = await Canvas.loadImage('./assets/inside.png');
            ctx.drawImage(background, 0, 0, 1000, 1140);

            const image = await Canvas.loadImage(link);
            ctx.drawImage(image, 16, 745, 395, 395);

            ctx.font = '72px sans-serif';
            ctx.fillStyle = '#ffffff';
            const width = ctx.measureText(args.join(' ')).width
            ctx.fillText(args.join(' '), 450, 1000, 511);

            message.channel.send({files: [canvas.toBuffer()]});
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

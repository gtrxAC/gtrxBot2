const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
	name: 'imaul',
    aliases: ['im'],
	description: 'Memegen: Darth Maul with dual lightsaber',
    usage: '<text1 ...>|<text2 ...>',
    args: true,
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

            const canvas = Canvas.createCanvas(2265, 1509);
            const ctx = canvas.getContext('2d');
            
            const background = await Canvas.loadImage('./assets/maul.png');
            ctx.drawImage(background, 0, 0, 2265, 1509);

            args = args.join(' ').split('|');
            if (args.length < 2) throw 'use 2 text arguments separated by a |';
            if (args.length > 2) throw 'too many arguments (max 2)';

            ctx.font = '112px sans-serif';
            ctx.fillStyle = '#ffffff';

            ctx.fillText(args[0], 60, 490, 960);
            ctx.fillText(args[0], 50, 1070, 960);
            ctx.fillText(args[1], 1460, 1150, 760);

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

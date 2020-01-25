const Discord = require('discord.js');
const Canvas = require('canvas');
const tools = require('../tools');

module.exports = {
	name: 'iscale',
    aliases: ['is', 'iresize', 'ir'],
	description: 'Resizes an image to the given pixel size.',
    usage: '[image attachment/url/@user] <width> <height>',
    args: true,
    guildOnly: false,
    ownerOnly: false,
    cooldown: 5,
	async execute(message, args) {
        try {
            if (args.length > 3) throw "too many arguments (max 3)";
            if (args.length < 2) throw "too few arguments (min 2)";
            let link = message.author.avatarURL;
            const lastMsgs = await message.channel.fetchMessages(10);
            const attachmentMsg = lastMsgs.find((msg) => msg.attachments.size);
            if (args.length && !attachmentMsg && !message.mentions.users.size &&
                !message.attachments.size) link = args.shift();
            if (attachmentMsg) link = attachmentMsg.attachments.first().url;
            if (message.mentions.users.size) link = message.mentions.users.first().avatarURL;
            if (message.attachments.size) link = message.attachments.first().url;

            const x = Number(args[0]);
            const y = Number(args[1]);

            const canvas = Canvas.createCanvas(x, y);
            const ctx = canvas.getContext('2d');

            const image = await Canvas.loadImage(link);
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            message.channel.send({files: [canvas.toBuffer()]});
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

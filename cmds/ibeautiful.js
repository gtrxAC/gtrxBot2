const Discord = require('discord.js');
const Canvas = require('canvas');
const tools = require('../tools');

module.exports = {
	name: 'ibeautiful',
    aliases: ['ib'],
	description: 'Memegen: You ever just cry because of how beautiful something is? (Your image) Yes :(',
    usage: '[image attachment/url/@user]',
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

            const canvas = Canvas.createCanvas(640, 853);
            const ctx = canvas.getContext('2d');
            
            const background = await Canvas.loadImage('./assets/beautiful.png');
            ctx.drawImage(background, 0, 0, 640, 853);

            const image = await Canvas.loadImage(link);
            ctx.drawImage(image, 26, 117, 438, 576);

            message.channel.send({files: [canvas.toBuffer()]});
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

const Canvas = require('canvas');
const tools = require('../tools');

module.exports = {
	name: 'ibeautiful',
    aliases: ['ib'],
	description: 'Memegen: You ever cry because of how beautiful something is?',
    usage: '[image attachment/url/@user]',
    cooldown: 4,
	async execute(message, args) {
        try {
            //try to find an image from a link, attachment, mentioned user's avatar, last 10 messages, or your avatar
            let link = message.author.avatarURL;
            const lastMsgs = await message.channel.fetchMessages(10);
            const attachmentMsg = lastMsgs.find((msg) => msg.attachments.size);
            if (args.length && !attachmentMsg && !message.mentions.users.size &&
                !message.attachments.size) link = args.shift();
            if (attachmentMsg) link = attachmentMsg.attachments.first().url;
            if (message.mentions.users.size) link = message.mentions.users.first().avatarURL;
            if (message.attachments.size) link = message.attachments.first().url;

            //create a new image
            const canvas = Canvas.createCanvas(640, 853);
            const ctx = canvas.getContext('2d');
            
            //draw the template on it
            const background = await Canvas.loadImage('./assets/beautiful.png');
            ctx.drawImage(background, 0, 0, 640, 853);

            //draw the given image
            const image = await Canvas.loadImage(link);
            ctx.drawImage(image, 26, 117, 438, 576);

            //send it
            message.channel.send({files: [canvas.toBuffer()]});
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

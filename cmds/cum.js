const Discord = require('discord.js');
const Canvas = require('canvas');
const tools = require('../tools');

module.exports = {
    name: 'cum',
    description: 'Memegen: This will make you cum in a millisecond',
    usage: '[image]',
    image: true,
    cooldown: 4,
    async execute(message, args) {
        try {
            //try to find an image from a link, attachment, mentioned user's avatar, last 10 messages, or your avatar
            let link = message.author.avatarURL({format: 'png'});
            const lastMsgs = await message.channel.messages.fetch(10);
            const attachmentMsg = lastMsgs.find((msg) => msg.attachments.size);
            if (args.length && !attachmentMsg && !message.mentions.users.size &&
                !message.attachments.size) link = args.shift();
            if (attachmentMsg) link = attachmentMsg.attachments.first().url;
            if (message.mentions.users.size) link = message.mentions.users.first().avatarURL({format: 'png'});
            if (message.attachments.size) link = message.attachments.first().url;
            
            //create a new image
            const canvas = Canvas.createCanvas(760, 588);
            const ctx = canvas.getContext('2d');
            
            //draw the template on it
            const background = await Canvas.loadImage('./assets/cum.png');
            ctx.drawImage(background, 0, 0, 760, 588);

            //draw the given image
            const image = await Canvas.loadImage(link);
            ctx.drawImage(image, 0, 0, 408, 588);

            message.channel.send({files: [canvas.toBuffer()]});
        } catch (err) {
            return tools.errorMessage(message, err);
        }
    },
};

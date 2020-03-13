const Canvas = require('canvas');
const tools = require('../tools');

module.exports = {
    name: 'scale',
    aliases: ['resize'],
    description: 'Resizes an image to the given pixel size',
    usage: '[image] <width> <height>',
    args: true,
    image: true,
    cooldown: 4,
    minArgs: 2,
    maxArgs: 3,
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

            //get the size as numbers, not strings
            const x = Number(args[0]);
            const y = Number(args[1]);

            //create a new image
            const canvas = Canvas.createCanvas(x, y);
            const ctx = canvas.getContext('2d');

            //draw the input image on it
            const image = await Canvas.loadImage(link);
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            //send it
            message.channel.send({files: [canvas.toBuffer()]});
        } catch (err) {
            return tools.errorMessage(message, err);
        }
    },
};

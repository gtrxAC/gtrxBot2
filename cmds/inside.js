const Canvas = require('canvas');
const tools = require('../tools');

module.exports = {
    name: 'inside',
    description: "Memegen: Sick of crying, tired of trying, yeah I'm smiling but inside I'm...",
    usage: '[image] <text ...>',
    args: true,
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
            const canvas = Canvas.createCanvas(1000, 1140);
            const ctx = canvas.getContext('2d');
            
            //draw the template on it
            const background = await Canvas.loadImage('./assets/inside.png');
            ctx.drawImage(background, 0, 0, 1000, 1140);

            //draw the given image
            const image = await Canvas.loadImage(link);
            ctx.drawImage(image, 16, 745, 395, 395);

            //write text, stretch it if it's too long
            ctx.font = '72px sans-serif';
            ctx.fillStyle = '#ffffff';
            const width = ctx.measureText(args.join(' ')).width
            ctx.fillText(args.join(' '), 450, 1000, 511);

            //send the image
            message.channel.send({files: [canvas.toBuffer()]});
        } catch (err) {
            return tools.errorMessage(message, err);
        }
    },
};

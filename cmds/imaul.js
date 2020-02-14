const Canvas = require('canvas');
const tools = require('../tools');

module.exports = {
	name: 'imaul',
    aliases: ['im'],
	description: 'Memegen: Darth Maul with dual lightsaber',
    usage: '<text1 ...>|<text2 ...>',
    args: true,
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
            const canvas = Canvas.createCanvas(2265, 1509);
            const ctx = canvas.getContext('2d');
            
            //draw the template on it
            const background = await Canvas.loadImage('./assets/maul.png');
            ctx.drawImage(background, 0, 0, 2265, 1509);

            //separate args by |, not space - also there must be 2 of them
            args = args.join(' ').split('|');
            if (args.length < 2) throw 'use 2 text arguments separated by a |';
            if (args.length > 2) throw 'too many arguments (max 2)';

            //draw the text, stretch it if it's too long
            ctx.font = '112px sans-serif';
            ctx.fillStyle = '#ffffff';

            ctx.fillText(args[0], 60, 490, 960);
            ctx.fillText(args[0], 50, 1070, 960);
            ctx.fillText(args[1], 1460, 1150, 760);

            //send the image
            message.channel.send({files: [canvas.toBuffer()]});
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

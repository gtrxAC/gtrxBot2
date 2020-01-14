const Discord = require('discord.js');
const gm = require('gm')
const request = require('request');

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
            let output;
            let link = message.author.avatarURL;
            if (args.length > 3) throw "too many arguments (max 3)";
            if (args.length < 2) throw "too few arguments (min 2)";
            if (args.length == 3 && message.mentions.users.size) link = message.mentions.users.first().avatarURL;
            if (args.length == 3 && !message.mentions.users.size) link = args[0];
            if (args.length == 2 && message.attachments.size) link = message.attachments.first().url;
            gm(request(link))
            .resize(args[args.length-2], args[args.length-1], '!')
            .toBuffer('PNG', (err, buffer) => {
                try {
                    if (err) throw "error writing output image\n"+err;
                    message.channel.send({files: [buffer]});
                } catch (error) {
                    const embed = new Discord.RichEmbed()
                    .setColor(0x7289DA)
                    .setTitle('<:mdError:568466408250408970> Error')
                    .setDescription(`\`${error}\``)
                    .setFooter(new Date().toISOString());
                    message.channel.send(embed);
                }
            });
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

const Discord = require('discord.js');
const tools = require('../tools');

module.exports = {
    name: 'sayas',
    description: 'Sends a message as a look-alike of another user',
    usage: '<user | "$SERVER"> <message ...>',
    args: true,
    guildOnly: true,
    cooldown: 6,
    async execute(message, args) {
        try {
            let username;
            let avatar;
            //if $SERVER is used as the user, send as a webhook with the server's name and avatar
            //otherwise find an user with the mentioned username, @mention or id
            if (args[0] === '$SERVER') {
                username = message.guild.name;
                avatar = message.guild.iconURL({format: 'png'});
            } else {
                await message.guild.members.fetch();
                let target = message.mentions.users.first() || message.guild.members.cache.find(m => m.user.id === args[0] || m.user.tag.startsWith(args[0]));
                if (target instanceof Discord.GuildMember) target = target.user;
                if (!target) throw "no user mentioned";
                username = target.username;
                avatar = target.avatarURL({format: 'png'});
            }
            const content = args.slice(1).join(' ');
            
            //create a webhook for sending the message
            message.channel.createWebhook(username, {avatar: avatar}).then((hook) => {
                //send the message, removing any everyone mentions
                hook.send(content.replace(/(@everyone|@here)/gm, ' `[mention removed]` ')).then(() => {
                    message.delete();
                    hook.delete();
                });
            });
        } catch (err) {
            return tools.errorMessage(message, err);
        }
    },
};

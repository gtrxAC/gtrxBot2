const Discord = require('discord.js');
const tools = require('../tools');

module.exports = {
    name: 'help',
    aliases: ['?', 'commands', 'cmds'],
    description: 'Shows available commands or command info',
    usage: '[-p] [cmd]\n\n-p: Send to this channel instead of DM.',
    async execute(message, args) {
        try {
            //determine target by whether "-p" was added
            let target;
            if (args[0] == '-p') {
                args.shift();
                target = message.channel;
            } else {
                target = message.author;
            }
            
            const embed = new Discord.MessageEmbed();
            //if no command was given, show every command in a list
            if (!args.length) {
                const mapFunction = command => `\`${command.name}\`   ${command.description} ${command.nsfw ? '\\🔞 ' : ''}${command.ownerOnly ? '\\🔒 ' : ''}${command.image ? '\\🖼️ ' : ''}`;
                embed.setColor(0x7289DA)
                .setTitle('<:mdHelp:568466408548335650> Commands')
                .setDescription(message.client.commands.map(mapFunction).join('\n'))
                .setFooter('🔞 = nsfw   🔒 = bot owner only   🖼️ = image command');
            } else {
                //otherwise show info on one command
                const name = args[0].toLowerCase();
                const command = message.client.commands.get(name) ||
                    message.client.commands.find(c => c.aliases && c.aliases.includes(name));
                if (!command) throw "command not found";
                embed.setColor(0x7289DA)
                .setTitle(`<:mdHelp:568466408548335650> Command ${command.name}`)
                .setDescription(`[Command source](https://github.com/gtrxAC/gtrxBot2/tree/master/cmds/${command.name}.js)\`\`\`${command.description}\n`+
                (command.usage ? `   Usage: ${command.name} ${command.usage}\n` : `   Usage: ${command.name}\n`)+
                (command.aliases ? ` Aliases: ${command.aliases.join(', ')}\n` : '')+
                `Cooldown: ${command.cooldown || 2} sec\`\`\``)
                .setFooter(new Date().toISOString());
            }
            tools.sendEmbed(target, embed).then(() => {
                //if the user needs to check DMs, send a confirmation
                if (target == message.channel || message.channel.type == 'dm') return;
                const embed = tools.makeEmbed('<:mdChat:568466407713407001> DM sent!', 'Use -p to send to this channel instead.');
                tools.sendEmbed(message.channel, embed);
            }).catch((error) => {
                throw `can't send DM, do you have DMs disabled?\n${error}`;
            });
        } catch (err) {
            return tools.errorMessage(message, err);
        }
    },
};

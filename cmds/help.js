const Discord = require('discord.js');

module.exports = {
	name: 'help',
    aliases: ['?'],
	description: 'Shows available commands or command info.',
    usage: '[-p] [cmd]\n\n-p: Send to this channel instead of DM.',
    args: false,
    guildOnly: false,
    ownerOnly: false,
	async execute(message, args) {
        try {
            let target;
            const embed = new Discord.RichEmbed();
            if (args[0] == '-p') {
                args.shift();
                target = message.channel;
            } else {
                target = message.author;
            }
            if (!args.length) {
                embed.setColor(0x7289DA)
                .setTitle('<:mdHelp:568466408548335650> Commands')
                .setDescription('`'+message.client.commands.map(command => command.name).join('` `')+'`\n\n'+
                'You can use "help [cmd]" for info on a command.\n'+
                'Commands starting with i are image commands, except invite.\n'+
                'Only up to the 1st unique letter of a command is needed:\n'+
                'emb = embed, emo = emoji, k = kill, saya = sayas, etc.')
                .setFooter(new Date().toISOString());
            } else {
                const name = args[0].toLowerCase();
                const command = message.client.commands.get(name) ||
                    message.client.commands.find(c => c.aliases && c.aliases.includes(name));
                if (!command) throw "Command not found.";
                embed.setColor(0x7289DA)
                .setTitle(`<:mdHelp:568466408548335650> Command ${command.name}`)
                .setDescription(`\`\`\`${command.description}\n`+
                (command.aliases ? `Aliases: ${command.aliases.join(', ')}\n` : '')+
                (command.usage ? `Usage: ${command.name} ${command.usage}\n` : `Usage: ${command.name}\n`)+
                `\n\nCooldown: ${command.cooldown || 2} sec`+`\`\`\``)
                .setFooter(new Date().toISOString());
            }
            target.send(embed).then(() => {
                if (target == message.channel || message.channel.type == 'dm') return;
                embed.setColor(0x7289DA)
                .setTitle('<:mdChat:568466407713407001> DM sent!')
                .setDescription(`Use -p to send to this channel instead.`)
                .setFooter(new Date().toISOString());
                message.channel.send(embed);
            })
            .catch(error => {
                throw `Can't send DM! Do you have DMs disabled?\n${error}`;
            });
        } catch (error) {
            const embed = new Discord.RichEmbed()
            .setColor(0x7289DA)
            .setTitle('<:mdError:568466408250408970> Error')
            .setDescription(`\`${error}\``)
            .setFooter(new Date().toISOString());
            message.channel.send(embed);
            console.error(error);
        }
	},
};

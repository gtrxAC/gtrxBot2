const Discord = require('discord.js');

module.exports = {
	name: 'reload',
    aliases: ['r'],
	description: "Reloads a command after it's been edited.",
    usage: '<command>',
    args: true,
    guildOnly: false,
    ownerOnly: true,
	async execute(message, args) {
        try {
            const commandName = args[0].toLowerCase();
            const command = message.client.commands.get(commandName)
                || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (!command) {
                const embed = new Discord.RichEmbed()
                .setColor(0x7289DA)
                .setTitle('<:mdError:568466408250408970> Error')
                .setDescription(`\`Command not found\``)
                .setFooter(new Date().toISOString());
                return message.channel.send(embed);
            }
            delete require.cache[require.resolve(`./${commandName}.js`)];
            const newCommand = require(`./${commandName}.js`);
            message.client.commands.set(newCommand.name, newCommand);
            const embed = new Discord.RichEmbed()
            .setColor(0x7289DA)
            .setTitle('<:mdCheck:568466407616938004> Success')
            .setDescription(`\`Reloaded command ${newCommand.name}\``)
            .setFooter(new Date().toISOString());
            message.channel.send(embed);
        } catch (error) {
            const embed = new Discord.RichEmbed()
            .setColor(0x7289DA)
            .setTitle('<:mdError:568466408250408970> Error')
            .setDescription(`\`Couldn't reload command\n${error}\``)
            .setFooter(new Date().toISOString());
            message.channel.send(embed);
        }
        
	},
};

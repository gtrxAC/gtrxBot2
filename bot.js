//load required modules
const fs = require("fs");
const Discord = require('discord.js');

//create a client, the bot itself
const client = new Discord.Client();

//load commands and make a list of cooldowns for them
const cooldowns = new Discord.Collection();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./cmds/${file}`);
	client.commands.set(command.name, command);
}

//make a list for the last deleted message of each channel (for snipe command)
const lastDel = new Discord.Collection();
client.lastDel = lastDel;

//load configuration from config.json - this has the bot token, prefix and owner ID
const config = require('./config.json');
client.config = config;

//log the ready message
client.on('ready', () => {
    console.log('________________________________________________________________________________');
    console.log('');
    console.log(`${client.user.username} is ready.`);
    console.log(`* ID: ${client.user.id}`);
    console.log(`* Guilds/Users: ${client.guilds.size}/${client.users.size}`);
    console.log('________________________________________________________________________________');
    console.log('');
});

//basic command handler. https://discordjs.guide/command-handling/
client.on('message', (message) => {
    //ignore non command messages and bot messages to prevent loops
    if (!message.content.startsWith(config.prefix)) return;
    if (message.author.bot) return;

    //separate command and its arguments from the message
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    //find the command from the loaded command files
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    //if not found, exit
    if (!command) return;

    //if command requires arguments and none are given, exit
    if (command.args && !args.length) {
        const embed = new Discord.RichEmbed()
        .setColor(0x7289DA)
        .setTitle('<:mdError:568466408250408970> Error')
        .setDescription(`\`This command requires arguments!\n${command.name} ${command.usage}\``)
        .setFooter(new Date().toISOString());
        return message.channel.send(embed);
    }

    //if command is server only and used in DM, exit
    if (command.guildOnly && message.channel.type !== 'text') {
        const embed = new Discord.RichEmbed()
        .setColor(0x7289DA)
        .setTitle('<:mdError:568466408250408970> Error')
        .setDescription(`\`This command is set to server only.\``)
        .setFooter(new Date().toISOString());
        return message.channel.send(embed);
    }

    //if command is owner only and used by non-owner, exit
    if (command.ownerOnly && message.author.id !== config.owner) {
        const embed = new Discord.RichEmbed()
        .setColor(0x7289DA)
        .setTitle('<:mdError:568466408250408970> Error')
        .setDescription(`\`This command is set to owner only.\``)
        .setFooter(new Date().toISOString());
        return message.channel.send(embed);
    }

    //if command is on cooldown for that user, exit
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 2) * 1000;
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            const embed = new Discord.RichEmbed()
            .setColor(0x7289DA)
            .setTitle('<:mdError:568466408250408970> Error')
            .setDescription(`\`This command is in cooldown for ${timeLeft.toFixed(4)} seconds.\``)
            .setFooter(new Date().toISOString());
            return message.channel.send(embed);
        }
    }
    
    //execute command and add the cooldown timer
    try {
        command.execute(message, args);
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    } catch (error) {
        const embed = new Discord.RichEmbed()
        .setColor(0x7289DA)
        .setTitle('<:mdError:568466408250408970> Error')
        .setDescription(`\`${error}\``)
        .setFooter(new Date().toISOString());
        message.channel.send(embed);
        console.error(error);
    }
});

//add deleted messages to the list so the snipe command can load them
client.on('messageDelete', (message) => {
    client.lastDel.set(message.channel.id, {author: message.author.tag, content: message.content});
});

//log in to Discord with the bot token in config.json
//go to https://discordapp.com/developers/applications to get your own bot
client.login(config.token);
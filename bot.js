//load required modules
const fs = require('fs');
const Discord = require('discord.js');
const tools = require('./tools');

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

//and edited messages for the editsnipe command
const lastEdits = new Discord.Collection();
client.lastEdits = lastEdits;

//load configuration from config.json - this has the bot token, prefix and owner ID
const config = require('./config.json');
client.config = config;


//basic command handler. https://discordjs.guide/command-handling/
const handleCommand = (message) => {
    //ignore non command messages and bot messages to prevent loops
    if (!message.content.startsWith(config.prefix)) return;
    if (message.author.bot) return;

    //separate command and its arguments from the message
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    //find the command from the loaded command files
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.name.startsWith(commandName))
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    
    //if the command isn't found or its requirements aren't met, exit
    if (!command) return;
    if (command.ownerOnly && message.author.id !== config.owner) return tools.errorMessage(message, 'this command is set to bot owner only');
    if (command.guildOnly && message.channel.type !== 'text') return tools.errorMessage(message, 'this command is set to server only');
    if (command.nsfw && message.channel.type == 'text' && !message.channel.nsfw) return tools.errorMessage(message, 'this command is set to nsfw channel only');
    if (command.requires && !message.member.permissions.has(command.requires)) return tools.errorMessage(message, `this command requires the ${command.requires} permission`);
    if (command.args && !args.length) return tools.errorMessage(message, `this command requires arguments\nusage: \`${command.usage}\``);
    if (command.minArgs && args.length < command.minArgs) return tools.errorMessage(message, `too few arguments, min ${command.minArgs}`);
    if (command.maxArgs && args.length > command.maxArgs) return tools.errorMessage(message, `too many arguments, max ${command.maxArgs}`);

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
            const timeLeft = expirationTime - now;
            return tools.errorMessage(message, `this command is in cooldown for ${timeLeft} ms`);
        }
    }
    
    //execute command and add the cooldown timer
    command.execute(message, args);
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
}


//log the ready message and set status
client.on('ready', () => {
    console.log('');
    console.log(`${client.user.username} is ready.`);
    console.log(`* ID: ${client.user.id}`);
    console.log(`* Guilds/Users: ${client.guilds.cache.size}/${client.users.cache.size}`);
    console.log('');
    client.user.setActivity(`${config.prefix}help | ${client.users.cache.size} users`, {type: 'LISTENING'});
});

//handle a possible command when a message is received
client.on('message', (message) => {
    handleCommand(message);
});

//add deleted messages to the list so the snipe command can load them
client.on('messageDelete', (message) => {
    client.lastDel.set(message.channel.id, {author: message.author.tag, content: message.content, attachments: message.attachments});
});

//add edited messages to the list for the editsnipe command, and try to handle a command
client.on('messageUpdate', (oldMsg, newMsg) => {
    client.lastEdits.set(oldMsg.channel.id, {author: oldMsg.author.tag, oldContent: oldMsg.content, newContent: newMsg.content});
    handleCommand(newMsg);
});

//log in to Discord with the bot token in config.json
//go to https://discordapp.com/developers/applications to get your own bot
client.login(config.token);

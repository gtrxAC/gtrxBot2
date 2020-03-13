const tools = require('../tools');

module.exports = {
    name: 'reload',
    description: "Reloads a command after it's been edited",
    usage: '<command>',
    args: true,
    ownerOnly: true,
    async execute(message, args) {
        try {
            //find the command, send an error if not found
            const commandName = args[0].toLowerCase();
            const command = message.client.commands.get(commandName)
                || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
            if (!command) {
                throw 'command not found';
            }

            //do some trickery to reload the command file
            delete require.cache[require.resolve(`./${commandName}.js`)];
            const newCommand = require(`./${commandName}.js`);
            message.client.commands.set(newCommand.name, newCommand);

            //send a confirmation message
            const embed = tools.makeEmbed('<:mdCheck:568466407616938004> Success',
            `Reloaded command ${newCommand.name}`);
            tools.sendEmbed(message.channel, embed);
        } catch (err) {
            return tools.errorMessage(message, err);
        }
        
    },
};

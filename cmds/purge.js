const tools = require('../tools');

module.exports = {
	name: 'purge',
    aliases: ['p'],
	description: 'Removes many messages at once.',
    usage: '<num of msgs>',
    args: true,
    guildOnly: true,
    requires: 'MANAGE_MESSAGES',
	async execute(message, args) {
        try {
            //delete the messages, +1 to include the command message
            message.channel.bulkDelete(Number(args[0])+1).then((msgs) => {

                //send a confirmation and delete it after 3 seconds
                const embed = tools.makeEmbed('<:mdCheck:568466407616938004> Success', `deleted ${args[0]} messages`)
                message.channel.send(embed).then((msg) => {
                    msg.delete(3000);
                });
            }).catch((err) => {
                return tools.errorMessage(message, err);
            });
        } catch (err) {
            return tools.errorMessage(message, err);
        }
	},
};

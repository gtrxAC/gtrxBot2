const tools = require('../tools');

module.exports = {
    name: 'purge',
    description: 'Removes many messages at once',
    usage: '<num of msgs>',
    args: true,
    guildOnly: true,
    requires: 'MANAGE_MESSAGES',
    async execute(message, args) {
        try {
            //discord api limits bulk deleting to 100 messages, we add 1 to the given amount so max 99
            const msgs = Number(args[0])+1;
            if (msgs > 99) throw 'max amount of messages is 99';

            //delete the messages, +1 to include the command message
            await message.channel.bulkDelete()

            //send a confirmation and delete it after 3 seconds
            const embed = tools.makeEmbed('<:mdCheck:568466407616938004> Success', `deleted ${args[0]} messages`)
            tools.sendEmbed(message.channel, embed).then(msg => {
                msg.delete({timeout: 3000});
            });
        } catch (err) {
            return tools.errorMessage(message, err);
        }
    },
};

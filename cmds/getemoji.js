const Discord = require('discord.js');
const tools = require('../tools');

module.exports = {
    name: 'getemoji',
    aliases: ['emojilink', 'emojiurl', 'emlink', 'emurl'],
    description: 'Get the link of an emoji',
    usage: '<emoji mention or id>',
    args: true,
    minArgs: 1,
    maxArgs: 1,
    async execute(message, args) {
        try {
            //find the emoji ID from the message
            const emojiID = message.content.match(/\d+/g)[0];
            const emoji = message.client.emojis.cache.get(emojiID);
            if (!emoji) throw "emoji not found (currently doesn't work for non custom emoji)";

            //send its url
            message.channel.send(emoji.url);
        } catch (err) {
            return tools.errorMessage(message, err);
        }
    },
};

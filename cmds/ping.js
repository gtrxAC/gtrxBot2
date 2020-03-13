const Discord = require('discord.js');
const tools = require('../tools');

module.exports = {
    name: 'ping',
    aliases: ['test'],
    description: "Check the connection ping to Discord's servers",
    cooldown: 5,
    async execute(message, args) {
        try {
            const messageSendStart = Number(new Date());
            const reply = await message.channel.send("<:mdTimer:568466410385440787> Checking ping... `message.edit`")
            const messageSendPing = Number(new Date()) - messageSendStart;

            const messageEditStart = Number(new Date());
            await reply.edit("<:mdTimer:568466410385440787> Checking ping... `message.delete`")
            const messageEditPing = Number(new Date()) - messageEditStart;

            reply.edit("<:mdTimer:568466410385440787> Checking ping... `message.react`")
            const messageReactStart = Number(new Date());
            await reply.react('✅')
            const messageReactPing = Number(new Date()) - messageReactStart;

            const messageDeleteStart = Number(new Date());
            await reply.delete();
            const messageDeletePing = Number(new Date()) - messageDeleteStart;

            const embed = tools.makeEmbed('<:mdTimer:568466410385440787> Test complete', `Message Send: ${messageSendPing} ms\n`+
            `Message Edit: ${messageEditPing} ms\nMessage React: ${messageReactPing} ms\nMessage Delete: ${messageDeletePing} ms`+
            `\n\nTotal: ${messageSendPing+messageEditPing+messageReactPing+messageDeletePing} ms\n`, null, message.channel);
        } catch (err) {
            return tools.errorMessage(message, err);
        }
    },
};

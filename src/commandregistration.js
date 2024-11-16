require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js'); //REST allows HTTP requests to discords REST api
                                                                              //REST performs standard database commands

//safety checks on environment variables
//not essential to functionality, but good to know how to do
console.log('DISCORD_TOKEN:', process.env.DISCORD_TOKEN);
console.log('SERVER_ID:', process.env.SERVER_ID);
console.log('BOT_ID:', process.env.BOT_ID);

const commands = [
    {
        name: 'ping',
        description: 'ats here to check voice channels',
    },
    {
        name: 'annoy',
        description: 'ats everyone',
    },
    {
        name: 'commands',
        description: 'lists all commands on bot',
    },
    {
        name: 'eta',
        description: 'allows for announcement of ETA to server',
        options: [
            {
                name: 'hour-digit',
                description: 'hour digit of time',
                required: true,
                type: ApplicationCommandOptionType.Number,
                min_value: 1,
                max_value: 12,
            },
            {
                name: 'minute-digit',
                description: 'minute digit of time',
                required: true,
                type: ApplicationCommandOptionType.Number,
                choices: [
                    { name: 'top of hour', value: 0 },
                    { name: 'quarter', value: 15 },
                    { name: 'half', value: 30 },
                    { name: 'three quarters', value: 45 },
                ],
            },
        ],
    },
    {
        name: 'send_embed',
        description: 'sends a fancy embed message',
    },
    {
        name: 'create_channel',
        description: 'Creates a new text channel',
        options: [
            {
                name: 'name',
                description: 'Name of the channel',
                required: true,
                type: ApplicationCommandOptionType.String,
            },
        ],
    },
    {
        name: 'roll_die',
        description: 'Rolls a six-sided die',
    },
    {
        name: 'poll',
        description: 'Creates a poll with yes/no options',
        options: [
            {
                name: 'question',
                description: 'The poll question',
                required: true,
                type: ApplicationCommandOptionType.String,
            },
        ],
    },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Command Registration started');
        await rest.put(
            Routes.applicationGuildCommands(process.env.BOT_ID, process.env.SERVER_ID),
            { body: commands }
        );
        console.log('Commands were registered');
    } catch (error) {
        console.error(`Error registering commands: ${error}`);
    }
})();
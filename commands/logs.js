const { SlashCommandBuilder } = require('discord.js');
const { exec } = require('child_process');
const { readFileSync, readFile } = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('logs')
        .setDescription('Displays the latest server logs.')
        .addIntegerOption(option =>
            option.setName('lines')
                .setDescription('Number of lines to show (default: 10)')
                .setRequired(false)),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });

        const numLines = interaction.options.getInteger('lines') || 10;
        const logFile = './server/logs/latest.log'; // Path to your log file

        readFile(logFile, 'utf8', (err, data) => {
            if (err) {
                console.error(`Error reading log file: ${err}`);
                return interaction.editReply({ content: `Failed to read log file: ${err}`, ephemeral: true });
            }

            if( data.split('\n').length > 2000) {
                data = data.split('\n').slice(-2000).join('\n');
            }

            const lines = data.split('\n').slice(-numLines).join('\n'); // Get the last 'numLines' lines
            interaction.editReply({ content: `\`\`\`${lines}\`\`\``, ephemeral: true });
        });
    },
};
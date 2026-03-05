const { SlashCommandBuilder } = require('discord.js');
const { exec } = require('child_process');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('status')
        .setDescription('Checks if the Minecraft server is running.'),
    async execute(interaction) {
        await interaction.deferReply();

        exec('ps aux | grep "[j]ava.*server.jar"', (error, stdout) => {
            if (stdout) {
                interaction.editReply({ content: '✅ The Minecraft server is currently running!' });
            } else {
                interaction.editReply({ content: '❌ The Minecraft server is **not running**.' });
            }
        });
    },
};

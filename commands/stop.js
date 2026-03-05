const { SlashCommandBuilder } = require('discord.js');
const { exec } = require('child_process');

const onMac = process.platform === 'darwin';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the Minecraft server.'),
    async execute(interaction) {
        await interaction.deferReply();

        const killCmd = onMac ? 'killall -9 java' : 'fuser -k 25565/tcp';

        exec(killCmd, { cwd:'./server' }, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error stopping server: ${error}`);
                return interaction.editReply({ content: `Failed to stop server: ${error}` });
            }
            console.log(`Server stopped:\n${stdout}`);
            interaction.editReply({ content: 'Minecraft server is stopping...' });
        });
    },
};

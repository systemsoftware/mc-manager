const { SlashCommandBuilder, MessageFlags } = require('discord.js');
const { spawn, exec } = require('child_process');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Starts the Minecraft server.'),
    async execute(interaction) {
        await interaction.deferReply();

            const mcServer = spawn('java', ['-Xmx4G', '-Xms4G', '-jar', 'server.jar', 'nogui'], { cwd: './server' });

            mcServer.stdout.on('data', (data) => {
                const output = data.toString();
                console.log(output);

                if (output.includes('Done')) {
                    interaction.editReply({ content: '✅ Minecraft server is up and running!' });
                }
            });

            mcServer.stderr.on('data', (data) => {
                console.error(`Error: ${data}`);
                interaction.editReply({ content: `❌ Server error: ${data.toString()}` });
            });

            mcServer.on('exit', (code) => {
                console.log(`Minecraft server exited with code ${code}`);
                interaction.followUp({ content: `⚠️ Minecraft server stopped with ${code ? `exit code ${code}` : ''}`, }).catch(console.error);
            });

            mcServer.on('error', (err) => {
                console.error(`Failed to start server: ${err}`);
                interaction.editReply({ content: `❌ Failed to start the Minecraft server: ${err.message}` });
            });
    },
};

const { SlashCommandBuilder } = require('discord.js');
const { exec } = require('child_process');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('players')
        .setDescription('Lists all online players in the Minecraft server'),
    async execute(interaction) {
        await interaction.deferReply(); 

        exec(`screen -S mcserver -X stuff "list\n"`, (error) => {
            if (error) {
                return interaction.editReply('❌ Failed to send command to the Minecraft server.');
            }
        });

        setTimeout(() => {
            exec(`tail -n 10 latest.log | grep "There are"`,  {cwd:'./server/logs'}, (error, stdout) => {
                if (error || !stdout) {
                    console.error(`Error fetching player list: ${error}`);
                    return interaction.editReply('❌ Could not fetch player list.');
                }

                const playerList = stdout.split("\n").find(line => line.includes("There are"));
                if (!playerList) {
                    return interaction.editReply('❌ No player data found.');
                }

                interaction.editReply(`🟢 ${playerList}`);
            });
        }, 2000); // Wait for the command to execute in the server
    },
};

const fs = require('fs');
const {
    REST,
    Routes
} = require('discord.js');

const body = [];
const files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of files) {
    const command = require(`./commands/${file}`)
    body.push({ ...command.data.toJSON(), integration_types: [0, 1],  contexts: [0, 1, 2] })
}

    const rest = new REST({
        version: "10"
    }).setToken('MTMzNjkxODgwNDU0NjE5MTM4MA.G7WIcX.zeUat1Nd2oSWe41j15oYgsS477xxlEQw4iut4Q')

    rest.put(Routes.applicationCommands('1336918804546191380'), {
        body
    })
        .then(() => console.log('Successfully registered application commands.'))
        .catch(console.error)
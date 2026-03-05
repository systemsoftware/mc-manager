## MC Manager

**MC Manager** is a Discord bot designed to help you manage your Minecraft server directly from your Discord client. It provides a modular command structure, making it easy to expand as your server's needs grow.


### 🚀 Getting Started

#### Prerequisites

* **Node.js**: Ensure you have Node.js installed to run the application.
* **Discord Bot Token**: You will need a bot token from the [Discord Developer Portal](https://discord.com/developers/applications).

#### Installation

1. **Clone the repository** (or download the files).
```bash
git clone https://github.com/systemsoftware/mc-manager.git
cd mc-manager
```

2. **Install the dependencies** listed in the `package.json`:
```bash
npm install
```

3.
Download and set up a server in `./server`


This will install `discord.js` (^14.17.3) and `dotenv` (17.3.1).



### ⚙️ Configuration

The bot uses **dotenv** to manage sensitive information securely.

1. Create a file named `.env` in the root directory.
2. Add your Discord bot token to the file:
```env
DISCORD_TOKEN=your_token_here
```





### 📂 Project Structure

* `index.js`: The main entry point that initializes the Discord client and handles command interactions.
* `/commands`: The bot automatically reads any `.js` files in this directory to register commands.



### 🛠️ Usage

To start the bot, run the following command in your terminal:

```bash
node index.js
```

Once started, the console will display "Ready!" when the bot has successfully logged into Discord. The bot is configured to respond to chat input commands specifically.



### 📜 License

This project is licensed under the **MIT** license.
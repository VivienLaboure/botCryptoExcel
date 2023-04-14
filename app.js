const config = require('./config.json');
const Excel = require('exceljs');
const { Client } = require('discord.js');

const bot = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

bot.on('ready', () => {
    console.log(`${bot.user.tag} is online...\n \n`);
    bot.user.setActivity('Écoute', { type: 'PLAYING' });
});

bot.on('messageCreate', async (interaction) => {
    const coinRegex = /^(SOL|BTC|ETH)\s+(\d+)$/;
    const match = interaction.content.match(coinRegex);
    if (match) {
        const [, coin, amount] = match;

        const date = new Date();
        const month = date.getMonth() + 1;
        const datePost = `${date.getUTCDate()}/${month}/${date.getUTCFullYear()}`;
        const hours = `${date.getHours()}h${date.getMinutes()}`;

        let bgColor;
        switch (coin) {
            case 'SOL':
                bgColor = '#cf03cf';
                break;
            case 'BTC':
                bgColor = '#ffee55';
                break;
            case 'ETH':
                bgColor = '#0096ff';
                break;
            default:
                bgColor = '#ffffff';
        }

        const filename1 = 'crypto.xlsx';
        const workbook = new Excel.Workbook();
        await workbook.xlsx.readFile(filename1);
        workbook.getWorksheet('Feuille1').addRow([coin, amount, datePost, hours]);
        workbook.xlsx.writeFile(filename1);
        console.log('File is written');
    }
});

bot.login(config.TOKEN).catch((err) => {
    console.error(err);
});

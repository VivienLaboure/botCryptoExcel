
const config = require('./config.json');
const Excel = require('exceljs');
const { Client, Intents } = require('discord.js');


const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

bot.on('ready', () => {

    console.log(`${bot.user.tag} is online...\n \n`);
    bot.user.setActivity('Vouais', { type: 'PLAYING' });
});


bot.on('message', interaction => {

    if (interaction.content.startsWith("SOL") || interaction.content.startsWith("BTC") || interaction.content.startsWith("ETH")) {

        let coin = interaction.content.split(" ")[0];
        let amount = interaction.content.split(" ")[1];

        let date = new Date();

	let month = date.getMonth() + 1;

        let datePost = date.getUTCDate() + "/" + month + "/" + date.getUTCFullYear();


        let hours = date.getHours() + "h" + date.getMinutes();


        let filename1 = 'crypto.xlsx';

        let workbook = new Excel.Workbook();

        let bgColor;

        if (coin == "SOL") {
            bgColor = '#cf03cf';

        } if (coin == "BTC") {
            bgColor = '#ffee55';

        } if (coin == "ETH") {
            bgColor = '#0096ff';

        } else {
            bgColor = '#ffffff';
        }

        workbook.xlsx.readFile(filename1)
            .then(() => {

                workbook.getWorksheet('Feuille 1').addRow([coin, amount, datePost, hours]);

                return workbook.xlsx.writeFile(filename1);
            }).then(() => {
                console.log('File is written');
            }).catch(err => console.error(err));
    }
});


bot.login(config.TOKEN).catch((err) => {
    bot.logger.error(err);
});
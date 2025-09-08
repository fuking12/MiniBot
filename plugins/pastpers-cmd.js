const { cmd } = require('../lib/command')
const bot = require('../lib/bot') 

cmd({
    pattern: "pp",
    alias: ["pastpaper"],
    desc: "Displays the bot menu",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
    let desc = `
*𝐃𝐄𝐖-𝐌𝐃-𝐏𝐀𝐒𝐓 𝐏𝐄𝐏𝐄𝐑𝐒 𝐌𝐄𝐍𝐔*

🪀 *Hellow ${pushname}*

*╭─「 ᴘᴇᴀᴘᴇʀ ᴅᴇᴀᴛᴀɪʟꜱ 」*
> ඔබට අවශ්‍ය විශයය තෝරන්න..!😇
*╰──────────●●►*

*1│❯❯◦ බුද්ධ ධර්මය*
*2│❯❯◦ සිංහල*
*3│❯❯◦ English*
*4│❯❯◦ ගණිතය*
*5│❯❯◦ විද්‍යාව*
*6│❯❯◦ ඉතිහාසය*
*7│❯❯◦ පළමු කාණ්ඩය*
*8│❯❯◦ දෙවන කාණ්ඩය*
*9│❯❯◦ තෙවන කාණ්ඩය*

*${bot.COPYRIGHT}*`;

        // Send the menu with an image
        const menuMessage = await conn.sendMessage(from, { 
            image: { url: bot.ALIVE_IMG }, 
            caption: desc 
        }, { quoted: mek });

        // Listen for the reply
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;
            
            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Check if the reply is in response to the menu message
            if (msg.message.extendedTextMessage.contextInfo?.stanzaId === menuMessage.key.id) {

                switch (selectedOption) {
                    case '1':
                        reply('.buddhism');
                        break;
                    case '2':
                        reply('.sinhala');
                        break;
                    case '3':
                        reply('.english');
                        break;
                    case '4':
                        reply('.maths');
                        break;
                    case '5':
                        reply('.science');
                        break;
                    case '6':
                        reply('.history');
                        break;
                    case '7':
                        reply('.bas1');
                        break;
                    case '8':
                        reply('.bas2');
                        break;
                    case '9':
                        reply('.bas3');
                        break;              
                        default:
                }
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('⚠️ *An error occurred while processing your request.*');
    }
});
//=================================Budisum======================================
cmd({
    pattern: "buddhism",
    alias: ["buddhismpastpaper"],
    desc: "Displays the bot menu",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
    let desc = `𝐃𝐄𝐖-𝐌𝐃-𝐏𝐀𝐒𝐓 𝐏𝐄𝐏𝐄𝐑𝐒 𝐌𝐄𝐍𝐔 

╭─「 ᴘᴇᴀᴘᴇʀ ᴅᴇᴀᴛᴀɪʟꜱ 」
> වර්ෂය තෝරන්න..!😎
╰──────────●●►

1│❯❯◦✅2015
2│❯❯◦✅2016 
3│❯❯◦✅2017 
4│❯❯◦✅2018 
5│❯❯◦✅2019 
6│❯❯◦✅2020 

*${bot.COPYRIGHT}*`;

        // Send the menu with an image
        const menuMessage = await conn.sendMessage(from, { 
            image: { url: bot.ALIVE_IMG }, 
            caption: desc 
        }, { quoted: mek });

        // Listen for the reply
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;
            
            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Check if the reply is in response to the menu message
            if (msg.message.extendedTextMessage.contextInfo?.stanzaId === menuMessage.key.id) {

                switch (selectedOption) {
                    case '1':
                        let buddhism2015 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2015-OL-BUDDHISM-PART-I.pdf'
                        let buddhism20152 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2015-OL-BUDDHISM-PART-I.pdf'
                        conn.sendMessage(m.chat, { document: { url:buddhism2015 }, mimetype: 'application/pdf', fileName: 'part1.pdf'}, { quoted: m })
                        conn.sendMessage(m.chat, { document: { url:buddhism20152 }, mimetype: 'application/pdf', fileName: 'Part2.pdf'}, { quoted: m })
                        break;
                    case '2':
                        let buddhism2016 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2016-OL-BUDDHISM-PART-I.pdf'
                        let buddhism20162 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2016-OL-BUDDHISM-PART-II.pdf'                    
                        conn.sendMessage(m.chat, { document: { url:buddhism2016 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        conn.sendMessage(m.chat, { document: { url:buddhism20162 }, mimetype: 'application/pdf', fileName: 'bud_Part2.pdf'}, { quoted: m })    
                    
                    break;
                    case '3':
                        let buddhism2017 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2017-OL-Buddhism.pdf'
                        conn.sendMessage(m.chat, { document: { url:buddhism2017 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '4':
                        let buddhism2018 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2018-OL-BUDDHISM.pdf'
                        conn.sendMessage(m.chat, { document: { url:buddhism2018 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '5':
                        let buddhism2019 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2019-OL-Buddhism.pdf'
                        conn.sendMessage(m.chat, { document: { url:buddhism2019 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '6':
                        let buddhism2020 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2020-OL-Buddhism.pdf'
                        conn.sendMessage(m.chat, { document: { url:buddhism2020 }, mimetype: 'application/pdf', fileName: 'bud_Part2.pdf'}, { quoted: m })    
                        break;              
                        default:
                }
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('⚠️ *An error occurred while processing your request.*');
    }
});
//=======================================Sinhala====================================================
cmd({
    pattern: "sinhala",
    alias: ["sinhalapastpaper"],
    desc: "Displays the bot menu",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
    let desc = `𝐃𝐄𝐖-𝐌𝐃-𝐏𝐀𝐒𝐓 𝐏𝐄𝐏𝐄𝐑𝐒 𝐌𝐄𝐍𝐔 

╭─「 ᴘᴇᴀᴘᴇʀ ᴅᴇᴀᴛᴀɪʟꜱ 」
> වර්ෂය තෝරන්න..!😎
╰──────────●●►

1│❯❯◦✅2015
2│❯❯◦✅2016 
3│❯❯◦✅2017 
4│❯❯◦✅2018 
5│❯❯◦✅2019 
6│❯❯◦✅2020 

*${bot.COPYRIGHT}*`;

        // Send the menu with an image
        const menuMessage = await conn.sendMessage(from, { 
            image: { url: bot.ALIVE_IMG }, 
            caption: desc 
        }, { quoted: mek });

        // Listen for the reply
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;
            
            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Check if the reply is in response to the menu message
            if (msg.message.extendedTextMessage.contextInfo?.stanzaId === menuMessage.key.id) {

                switch (selectedOption) {
                    case '1':
                        let paper2015 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/English/2015-OL-English.pdf'
                        //let paper20152 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2015-OL-BUDDHISM-PART-I.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2015 }, mimetype: 'application/pdf', fileName: 'part1.pdf'}, { quoted: m })
                        //conn.sendMessage(m.chat, { document: { url:paper20152 }, mimetype: 'application/pdf', fileName: 'Part2.pdf'}, { quoted: m })
                        break;
                    case '2':
                        let paper2016 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/English/2016-OL-English(ii).pdf'
                        let paper20162 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/English/2016-OL-English-(i).pdf'                    
                        conn.sendMessage(m.chat, { document: { url:paper2016 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        conn.sendMessage(m.chat, { document: { url:paper20162 }, mimetype: 'application/pdf', fileName: 'bud_Part2.pdf'}, { quoted: m })    
                    
                    break;
                    case '3':
                        let paper2017 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/English/2017-OL-English.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2017 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '4':
                        let paper2018 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/English/2018-OL-English(i).pdf'
			let paper20182 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/English/2018-OL-English(ii).pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2018 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        conn.sendMessage(m.chat, { document: { url:paper20182 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
			break;
                    case '5':
                        let paper2019 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/English/2019-OL-English.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2019 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '6':
                        let paper2020 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/English/2020-OL-English.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2020 }, mimetype: 'application/pdf', fileName: 'bud_Part2.pdf'}, { quoted: m })    
                        break;              
                        default:
                }
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('⚠️ *An error occurred while processing your request.*');
    }
});
//===================================================English===============================================
cmd({
    pattern: "english",
    alias: ["englishpastpaper"],
    desc: "Displays the bot menu",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
    let desc = `𝐃𝐄𝐖-𝐌𝐃-𝐏𝐀𝐒𝐓 𝐏𝐄𝐏𝐄𝐑𝐒 𝐌𝐄𝐍𝐔 

╭─「 ᴘᴇᴀᴘᴇʀ ᴅᴇᴀᴛᴀɪʟꜱ 」
> වර්ෂය තෝරන්න..!😎
╰──────────●●►

1│❯❯◦✅2015
2│❯❯◦✅2016 
3│❯❯◦✅2017 
4│❯❯◦✅2018 
5│❯❯◦✅2019 
6│❯❯◦✅2020 

*${bot.COPYRIGHT}*`;

        // Send the menu with an image
        const menuMessage = await conn.sendMessage(from, { 
            image: { url: bot.ALIVE_IMG }, 
            caption: desc 
        }, { quoted: mek });

        // Listen for the reply
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;
            
            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Check if the reply is in response to the menu message
            if (msg.message.extendedTextMessage.contextInfo?.stanzaId === menuMessage.key.id) {

                switch (selectedOption) {
                    case '1':
                        let paper2015 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Sinhala/2015-OL-Sinhala%20(i%2Cii%2Ciii).pdf'
                        //let paper20152 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2015-OL-BUDDHISM-PART-I.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2015 }, mimetype: 'application/pdf', fileName: 'part1.pdf'}, { quoted: m })
                        //conn.sendMessage(m.chat, { document: { url:paper20152 }, mimetype: 'application/pdf', fileName: 'Part2.pdf'}, { quoted: m })
                        break;
                    case '2':
                        let paper2016 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Sinhala/2016-OL-Sinhala%20(i%2Cii%2Ciii).pdf'
                        //let paper20162 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2016-OL-BUDDHISM-PART-II.pdf'                    
                        conn.sendMessage(m.chat, { document: { url:paper2016 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        //conn.sendMessage(m.chat, { document: { url:paper20162 }, mimetype: 'application/pdf', fileName: 'bud_Part2.pdf'}, { quoted: m })    
                    
                    break;
                    case '3':
                        let paper2017 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Sinhala/2017-OL-Sinhala%20(i%2Cii%2Ciii).pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2017 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '4':
                        let paper2018 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Sinhala/2018-OL-Sinhala%20(i%2Cii%2Ciii).pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2018 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '5':
                        let paper2019 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Sinhala/2019-OL-Sinhala%20(i%2Cii%2Ciii).pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2019 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '6':
                        let paper2020 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Sinhala/2020-OL-Sinhala%20(i%2Cii%2Ciii).pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2020 }, mimetype: 'application/pdf', fileName: 'bud_Part2.pdf'}, { quoted: m })    
                        break;              
                        default:
                }
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('⚠️ *An error occurred while processing your request.*');
    }
});
//==============================================MAths===========================================
cmd({
    pattern: "maths",
    alias: ["mathspastpaper"],
    desc: "Displays the bot menu",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
    let desc = `𝐃𝐄𝐖-𝐌𝐃-𝐏𝐀𝐒𝐓 𝐏𝐄𝐏𝐄𝐑𝐒 𝐌𝐄𝐍𝐔 

╭─「 ᴘᴇᴀᴘᴇʀ ᴅᴇᴀᴛᴀɪʟꜱ 」
> වර්ෂය තෝරන්න..!😎
╰──────────●●►

1│❯❯◦✅2015
2│❯❯◦✅2016 
3│❯❯◦✅2017 
4│❯❯◦✅2018 
5│❯❯◦✅2019 
6│❯❯◦✅2020 

*${bot.COPYRIGHT}*`;

        // Send the menu with an image
        const menuMessage = await conn.sendMessage(from, { 
            image: { url: bot.ALIVE_IMG }, 
            caption: desc 
        }, { quoted: mek });

        // Listen for the reply
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;
            
            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Check if the reply is in response to the menu message
            if (msg.message.extendedTextMessage.contextInfo?.stanzaId === menuMessage.key.id) {

                switch (selectedOption) {
                    case '1':
                        let paper2015 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Maths/2015-OL-Maths%20(i%2Cii%2Ciii).pdf'
                        //let paper20152 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2015-OL-BUDDHISM-PART-I.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2015 }, mimetype: 'application/pdf', fileName: 'part1.pdf'}, { quoted: m })
                        //conn.sendMessage(m.chat, { document: { url:paper20152 }, mimetype: 'application/pdf', fileName: 'Part2.pdf'}, { quoted: m })
                        break;
                    case '2':
                        let paper2016 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Maths/2016-OL-Maths%20(i%2Cii%2Ciii).pdf'
                        //let paper20162 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2016-OL-BUDDHISM-PART-II.pdf'                    
                        conn.sendMessage(m.chat, { document: { url:paper2016 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        //conn.sendMessage(m.chat, { document: { url:paper20162 }, mimetype: 'application/pdf', fileName: 'bud_Part2.pdf'}, { quoted: m })    
                    
                    break;
                    case '3':
                        let paper2017 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Maths/2017-OL-Maths%20(i%2Cii%2Ciii).pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2017 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '4':
                        let paper2018 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Maths/2018-OL-Maths%20(i%2Cii%2Ciii).pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2018 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '5':
                        let paper2019 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Maths/2019-OL-Maths%20(i%2Cii%2Ciii).pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2019 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '6':
                        let paper2020 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Maths/2020-OL-Maths%20(i%2Cii%2Ciii).pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2020 }, mimetype: 'application/pdf', fileName: 'bud_Part2.pdf'}, { quoted: m })    
                        break;              
                        default:
                }
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('⚠️ *An error occurred while processing your request.*');
    }
});
//===========================================Since==========================================================
cmd({
    pattern: "science",
    alias: ["sciencepastpaper"],
    desc: "Displays the bot menu",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
    let desc = `𝐃𝐄𝐖-𝐌𝐃-𝐏𝐀𝐒𝐓 𝐏𝐄𝐏𝐄𝐑𝐒 𝐌𝐄𝐍𝐔 

╭─「 ᴘᴇᴀᴘᴇʀ ᴅᴇᴀᴛᴀɪʟꜱ 」
> වර්ෂය තෝරන්න..!😎
╰──────────●●►

1│❯❯◦✅2015
2│❯❯◦✅2016 
3│❯❯◦✅2017 
4│❯❯◦✅2018 
5│❯❯◦✅2019 
6│❯❯◦✅2020 

*${bot.COPYRIGHT}*`;

        // Send the menu with an image
        const menuMessage = await conn.sendMessage(from, { 
            image: { url: bot.ALIVE_IMG }, 
            caption: desc 
        }, { quoted: mek });

        // Listen for the reply
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;
            
            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Check if the reply is in response to the menu message
            if (msg.message.extendedTextMessage.contextInfo?.stanzaId === menuMessage.key.id) {

                switch (selectedOption) {
                    case '1':
                        let paper2015 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Science/2015-OL-Science%20(i%2Cii).pdf'
                        //let paper20152 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2015-OL-BUDDHISM-PART-I.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2015 }, mimetype: 'application/pdf', fileName: 'part1.pdf'}, { quoted: m })
                        //conn.sendMessage(m.chat, { document: { url:paper20152 }, mimetype: 'application/pdf', fileName: 'Part2.pdf'}, { quoted: m })
                        break;
                    case '2':
                        let paper2016 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Science/2016-OL-Science%20(i%2Cii).pdf'
                        //let paper20162 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2016-OL-BUDDHISM-PART-II.pdf'                    
                        conn.sendMessage(m.chat, { document: { url:paper2016 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        //conn.sendMessage(m.chat, { document: { url:paper20162 }, mimetype: 'application/pdf', fileName: 'bud_Part2.pdf'}, { quoted: m })    
                    
                    break;
                    case '3':
                        let paper2017 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Science/2017-OL-Science%20(i%2Cii).pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2017 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '4':
                        let paper2018 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Science/2018-OL-SCIENCE%20(i).pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2018 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '5':
                        let paper2019 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Science/2019-OL-Science%20(i%2Cii).pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2019 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '6':
                        let paper2020 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Science/2020-O-L-Science%20(i%2Cii).pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2020 }, mimetype: 'application/pdf', fileName: 'bud_Part2.pdf'}, { quoted: m })    
                        break;              
                        default:
                }
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('⚠️ *An error occurred while processing your request.*');
    }
});
//==================================================history===================================================
cmd({
    pattern: "history",
    alias: ["historypastpaper"],
    desc: "Displays the bot menu",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
    let desc = `𝐃𝐄𝐖-𝐌𝐃-𝐏𝐀𝐒𝐓 𝐏𝐄𝐏𝐄𝐑𝐒 𝐌𝐄𝐍𝐔 

╭─「 ᴘᴇᴀᴘᴇʀ ᴅᴇᴀᴛᴀɪʟꜱ 」
> වර්ෂය තෝරන්න..!😎
╰──────────●●►

1│❯❯◦✅2015
2│❯❯◦✅2016 
3│❯❯◦✅2017 
4│❯❯◦✅2018 
5│❯❯◦✅2019 
6│❯❯◦✅2020 

*${bot.COPYRIGHT}*`;

        // Send the menu with an image
        const menuMessage = await conn.sendMessage(from, { 
            image: { url: bot.ALIVE_IMG }, 
            caption: desc 
        }, { quoted: mek });

        // Listen for the reply
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;
            
            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Check if the reply is in response to the menu message
            if (msg.message.extendedTextMessage.contextInfo?.stanzaId === menuMessage.key.id) {

                switch (selectedOption) {
                    case '1':
                        let paper2015 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/History/2015-OL-History.pdf'
                        //let paper20152 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2015-OL-BUDDHISM-PART-I.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2015 }, mimetype: 'application/pdf', fileName: 'part1.pdf'}, { quoted: m })
                        //conn.sendMessage(m.chat, { document: { url:paper20152 }, mimetype: 'application/pdf', fileName: 'Part2.pdf'}, { quoted: m })
                        break;
                    case '2':
                        let paper2016 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/History/2016-OL-History.pdf'
                        //let paper20162 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2016-OL-BUDDHISM-PART-II.pdf'                    
                        conn.sendMessage(m.chat, { document: { url:paper2016 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        conn.sendMessage(m.chat, { document: { url:paper20162 }, mimetype: 'application/pdf', fileName: 'bud_Part2.pdf'}, { quoted: m })    
                    
                    break;
                    case '3':
                        let paper2017 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/History/2017-OL-History(i).pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2017 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
			let paper20172 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/History/2017-OL-History(ii).pdf'
                        conn.sendMessage(m.chat, { document: { url:paper20172 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '4':
                        let paper2018 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/History/2018-OL-History.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2018 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '5':
                        let paper2019 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/History/2019-OL-History(i).pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2019 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        let paper20192 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/History/2019-OL-History(ii).pdf'
                        conn.sendMessage(m.chat, { document: { url:paper20192 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '6':
                        let paper2020 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/History/2020-OL-History.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2020 }, mimetype: 'application/pdf', fileName: 'bud_Part2.pdf'}, { quoted: m })    
                        break;              
                        default:
                }
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('⚠️ *An error occurred while processing your request.*');
    }
});
//=========================================bas1==================================================================
cmd({
    pattern: "bas1",
    alias: ["bas1pastpaper"],
    desc: "Displays the bot menu",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
    let desc = `𝐃𝐄𝐖-𝐌𝐃-𝐏𝐀𝐒𝐓 𝐏𝐄𝐏𝐄𝐑𝐒 𝐌𝐄𝐍𝐔 

╭─「 ᴘᴇᴀᴘᴇʀ ᴅᴇᴀᴛᴀɪʟꜱ 」
> වර්ෂය තෝරන්න..!😎
╰──────────●●►

1│❯❯◦✅2015
2│❯❯◦✅2016 
3│❯❯◦✅2017 
4│❯❯◦✅2018 
5│❯❯◦✅2019 
6│❯❯◦✅2020 

*${bot.COPYRIGHT}*`;

        // Send the menu with an image
        const menuMessage = await conn.sendMessage(from, { 
            image: { url: bot.ALIVE_IMG }, 
            caption: desc 
        }, { quoted: mek });

        // Listen for the reply
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;
            
            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Check if the reply is in response to the menu message
            if (msg.message.extendedTextMessage.contextInfo?.stanzaId === menuMessage.key.id) {

                switch (selectedOption) {
                    case '1':
                        let paper2015 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2015-OL-BUDDHISM-PART-I.pdf'
                        let paper20152 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2015-OL-BUDDHISM-PART-I.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2015 }, mimetype: 'application/pdf', fileName: 'part1.pdf'}, { quoted: m })
                        conn.sendMessage(m.chat, { document: { url:paper20152 }, mimetype: 'application/pdf', fileName: 'Part2.pdf'}, { quoted: m })
                        break;
                    case '2':
                        let paper2016 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2016-OL-BUDDHISM-PART-I.pdf'
                        let paper20162 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2016-OL-BUDDHISM-PART-II.pdf'                    
                        conn.sendMessage(m.chat, { document: { url:paper2016 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        conn.sendMessage(m.chat, { document: { url:paper20162 }, mimetype: 'application/pdf', fileName: 'bud_Part2.pdf'}, { quoted: m })    
                    
                    break;
                    case '3':
                        let paper2017 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2017-OL-Buddhism.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2017 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '4':
                        let paper2018 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2018-OL-BUDDHISM.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2018 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '5':
                        let paper2019 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2019-OL-Buddhism.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2019 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '6':
                        let paper2020 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2020-OL-Buddhism.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2020 }, mimetype: 'application/pdf', fileName: 'bud_Part2.pdf'}, { quoted: m })    
                        break;              
                        default:
                }
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('⚠️ *An error occurred while processing your request.*');
    }
});
//========================================================bas2===========================================================
cmd({
    pattern: "bas2",
    alias: ["bas2pastpaper"],
    desc: "Displays the bot menu",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
    let desc = `𝐃𝐄𝐖-𝐌𝐃-𝐏𝐀𝐒𝐓 𝐏𝐄𝐏𝐄𝐑𝐒 𝐌𝐄𝐍𝐔 

╭─「 ᴘᴇᴀᴘᴇʀ ᴅᴇᴀᴛᴀɪʟꜱ 」
> වර්ෂය තෝරන්න..!😎
╰──────────●●►

1│❯❯◦✅2015
2│❯❯◦✅2016 
3│❯❯◦✅2017 
4│❯❯◦✅2018 
5│❯❯◦✅2019 
6│❯❯◦✅2020 

*${bot.COPYRIGHT}*`;

        // Send the menu with an image
        const menuMessage = await conn.sendMessage(from, { 
            image: { url: bot.ALIVE_IMG }, 
            caption: desc 
        }, { quoted: mek });

        // Listen for the reply
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;
            
            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Check if the reply is in response to the menu message
            if (msg.message.extendedTextMessage.contextInfo?.stanzaId === menuMessage.key.id) {

                switch (selectedOption) {
                    case '1':
                        let paper2015 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2015-OL-BUDDHISM-PART-I.pdf'
                        let paper20152 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2015-OL-BUDDHISM-PART-I.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2015 }, mimetype: 'application/pdf', fileName: 'part1.pdf'}, { quoted: m })
                        conn.sendMessage(m.chat, { document: { url:paper20152 }, mimetype: 'application/pdf', fileName: 'Part2.pdf'}, { quoted: m })
                        break;
                    case '2':
                        let paper2016 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2016-OL-BUDDHISM-PART-I.pdf'
                        let paper20162 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2016-OL-BUDDHISM-PART-II.pdf'                    
                        conn.sendMessage(m.chat, { document: { url:paper2016 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        conn.sendMessage(m.chat, { document: { url:paper20162 }, mimetype: 'application/pdf', fileName: 'bud_Part2.pdf'}, { quoted: m })    
                    
                    break;
                    case '3':
                        let paper2017 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2017-OL-Buddhism.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2017 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '4':
                        let paper2018 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2018-OL-BUDDHISM.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2018 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '5':
                        let paper2019 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2019-OL-Buddhism.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2019 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '6':
                        let paper2020 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2020-OL-Buddhism.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2020 }, mimetype: 'application/pdf', fileName: 'bud_Part2.pdf'}, { quoted: m })    
                        break;              
                        default:
                }
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('⚠️ *An error occurred while processing your request.*');
    }
});
//=============================================================bas3=======================================================
cmd({
    pattern: "bas3",
    alias: ["bas3pastpaper"],
    desc: "Displays the bot menu",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
    let desc = `𝐃𝐄𝐖-𝐌𝐃-𝐏𝐀𝐒𝐓 𝐏𝐄𝐏𝐄𝐑𝐒 𝐌𝐄𝐍𝐔 

╭─「 ᴘᴇᴀᴘᴇʀ ᴅᴇᴀᴛᴀɪʟꜱ 」
> වර්ෂය තෝරන්න..!😎
╰──────────●●►

1│❯❯◦✅2015
2│❯❯◦✅2016 
3│❯❯◦✅2017 
4│❯❯◦✅2018 
5│❯❯◦✅2019 
6│❯❯◦✅2020 

*${bot.COPYRIGHT}*`;

        // Send the menu with an image
        const menuMessage = await conn.sendMessage(from, { 
            image: { url: bot.ALIVE_IMG }, 
            caption: desc 
        }, { quoted: mek });

        // Listen for the reply
        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;
            
            const selectedOption = msg.message.extendedTextMessage.text.trim();

            // Check if the reply is in response to the menu message
            if (msg.message.extendedTextMessage.contextInfo?.stanzaId === menuMessage.key.id) {

                switch (selectedOption) {
                    case '1':
                        let paper2015 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2015-OL-BUDDHISM-PART-I.pdf'
                        let paper20152 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2015-OL-BUDDHISM-PART-I.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2015 }, mimetype: 'application/pdf', fileName: 'part1.pdf'}, { quoted: m })
                        conn.sendMessage(m.chat, { document: { url:paper20152 }, mimetype: 'application/pdf', fileName: 'Part2.pdf'}, { quoted: m })
                        break;
                    case '2':
                        let paper2016 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2016-OL-BUDDHISM-PART-I.pdf'
                        let paper20162 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2016-OL-BUDDHISM-PART-II.pdf'                    
                        conn.sendMessage(m.chat, { document: { url:paper2016 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        conn.sendMessage(m.chat, { document: { url:paper20162 }, mimetype: 'application/pdf', fileName: 'bud_Part2.pdf'}, { quoted: m })    
                    
                    break;
                    case '3':
                        let paper2017 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2017-OL-Buddhism.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2017 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '4':
                        let paper2018 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2018-OL-BUDDHISM.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2018 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '5':
                        let paper2019 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2019-OL-Buddhism.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2019 }, mimetype: 'application/pdf', fileName: 'bud_part1.pdf'}, { quoted: m })
                        break;
                    case '6':
                        let paper2020 = 'https://github.com/SL-Real-Tech/Files/raw/main/Past-Papers/Buddhism/2020-OL-Buddhism.pdf'
                        conn.sendMessage(m.chat, { document: { url:paper2020 }, mimetype: 'application/pdf', fileName: 'bud_Part2.pdf'}, { quoted: m })    
                        break;              
                        default:
                }
            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
        reply('⚠️ *An error occurred while processing your request.*');
    }
});

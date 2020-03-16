const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', () => {

    console.log(`${client.user.tag} est connecté !\nLien : https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot\nServeurs`);
  
});

client.on('message', async (message) => {

    if (message.author.id === client.user.id) return;

    if (message.author.bot) return;

    if (!message.guild) return;


    //L'auto modération ne fonctionne uniquement si le bot a la permission MANAGE_MESSAGES et que l'auteur du message ne la possède pas.

    if ((message.guild.me.permissions.has('MANAGE_MESSAGES')) && (message.member.hasPermission('MANAGE_MESSAGES'))) {


        //Anti insultes. Le bot va supprimer les messages qui contiènent des mot interdit.

        const badWords = ["putain", "conasse", "putin", "fuck", "salope", "sale merde", "connard", "connar", "konnar", "konnard", "espèce de sal", "espece de sal", "va te faire", "connasse", "espèce de", "pute", "nique", "ntm", "fdp", "putee", "conn", "cone", "baise", "bz"];

        for (let i = 0; i<badWords.length; i++) {

            if ((("\b"+message.content+"\b").toLowerCase()).includes("\b"+badWords[i]+"\b")) {

                return message.delete()
                .then(message.member.send(`Votre message a été supprimé car vous avez utilisé un vocabulaire inapproprié : \`${badWords[i]}\``));

                }
              
  
            };


        //Anti invites. Le bot va supprimer les messages qui contiènent un lien vers un autres serveur discord sauf si le nom du channel incul le mot "pub" ou "ad"

        if ((!message.channel.name.includes("pub")) && (!message.channel.name.includes("ad"))) {

            if (message.content.toLowerCase().includes("https://discord.gg/")) return message.delete().then(message.member.send(`Vous n\'avez pas le droit d'envoyer le lien d'un serveur discord ici.`));

        }


    };



});

client.login(config.token)
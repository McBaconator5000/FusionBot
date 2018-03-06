const secrets = require('./secret.json');
const commando = require('discord.js-commando');
const bot = new commando.Client();

//start listener for discord
//listen for !wtp (random fusion)
////need random number generator
//listen for !fuse [arg1][arg2]
////need to test [arg] if NaN then pokemon[arg] if pokemon[arg] undefied then missingno...? http://images.alexonsager.net/pokemon/fused/[arg1]/[arg1].0.png
//message.send http://pokefusion.japeal.com/upload/[arg1]X[arg2]X0.png

bot.registry.registerGroup('fusion', 'Fusion');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.login(secrets.token);
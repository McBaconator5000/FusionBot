const secrets = require('./secret.json');
const commando = require('discord.js-commando');
const bot = new commando.Client();
const fs = require('fs');

function checkFileExistsSync(filepath){
    let flag = true;
    try{
      fs.accessSync(filepath, fs.F_OK);
    }catch(e){
      flag = false;
    }
    return flag;
  }

//start listener for discord
//listen for !wtp (random fusion)
////need random number generator
//listen for !fuse [arg1][arg2]
////need to test [arg] if NaN then pokemon[arg] if pokemon[arg] undefied then missingno...? http://images.alexonsager.net/pokemon/fused/[arg1]/[arg1].0.png
//message.send http://pokefusion.japeal.com/upload/[arg1]X[arg2]X0.png

bot.registry.registerGroup('fusion', 'Fusion');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.on('error', console.error);

//have to do set avatar here for some reason????
bot.on('message', (message) => {
    //use a different command starter "?" so the !help warning isn't triggered
    if(message.content.startsWith("?set")){
        rawSetInfo = message.content.slice(message.content.indexOf(" "), message.content.length).toLowerCase().trim(); //remove command string and set to lowercase
        body = rawSetInfo.slice(0, rawSetInfo.indexOf(" ")); 
        head = rawSetInfo.slice(rawSetInfo.indexOf(" ") + 1, rawSetInfo.length);

        //get numbers if not numbers
        if(isNaN(head)){
            var headNumber = pokemon[head];
        }else{
            var headNumber = head;
        }
        if(isNaN(body)){
           var bodyNumber = pokemon[body];
        }else{
            var bodyNumber = body;
        }

        //test to see if we already have the image saved
        if(checkFileExistsSync('./images/'+headNumber+'X'+bodyNumber+'X0.png')){
            bot.user.setAvatar('./images/'+headNumber+'X'+bodyNumber+'X0.png')
            .then( user => {
                message.channel.send("How do you like my new look?");
            })
            .catch(err => {
                message.channel.send("You might be changing my avatar too fast. Try again in a bit.");
            });//possible to message.send errors?
        }else{
            message.channel.send("I couldn't find the file. Run '!fuse " + headNumber + " " + bodyNumber + "' and then try again.")
        }
    }
});

bot.login(secrets.token);
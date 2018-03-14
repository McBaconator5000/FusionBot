const commando = require('discord.js-commando');
//load pokemon list - will need to get pokemon number from it
const pokemon = require('../../pokemon-fusion.json');
const urlExists = require('url-exists');


//once it loads
class ForceFuseCommand extends commando.Command{
    constructor(client){
        //once it loads
        super(client, {
            name: 'forcefuse',
            group: 'fusion',
            memberName:'forcefuse',
            description: 'Force Fuses Specific Pokemon',
            examples: ['fuse 100 125', 'fuse pikachu snorlax'],
            args: [
                {
                    key: 'body',
                    prompt: 'What should the body be?',
                    type: 'string'
                },
                {
                    key: 'head',
                    prompt: 'What should the head be?',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, {body, head}){

        //test to see if a number is used or if the pokemon name is used
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

        
        //Test to see if url exists
        urlExists('http://pokefusion.japeal.com/upload/'+headNumber+'X'+bodyNumber+'X0.png', function(err, exists) {
            if(exists){ //if it does, message with said url
                message.channel.send('http://pokefusion.japeal.com/upload/'+headNumber+'X'+bodyNumber+'X0.png');
            }else{ //if it doesn't exist - 
                message.channel.send('Go to http://pokefusion.japeal.com/'+bodyNumber+'/'+headNumber+'/0');
            }
        });
    }
}
module.exports = ForceFuseCommand;
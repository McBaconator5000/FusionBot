const commando = require('discord.js-commando');
//load pokemon list
const pokemon = require('../../pokemon-fusion.json');
//get number of possible pokemon
const pokemonAmount = Object.keys(pokemon).length - 1; //starting at 0 so subtract 1
const urlExists = require('url-exists');

//once it loads
class RandomFuseCommand extends commando.Command{
    constructor(client){
        //usual definitions
        super(client, {
            name: 'wtp',
            group: 'fusion',
            memberName:'wtp',
            description: 'Fuses Random Pokemon',
            examples: ['wtp']
        });
    }
    
    async run(message, args){
        
        var headNumber = Math.floor(Math.random() * pokemonAmount);
        var bodyNumber = Math.floor(Math.random() * pokemonAmount);


        //Test to see if url exists
        urlExists('http://pokefusion.japeal.com/upload/'+headNumber+'X'+bodyNumber+'X0.png', function(err, exists) {
            if(exists){ //if it does, message with said url
                message.channel.send('http://pokefusion.japeal.com/upload/'+headNumber+'X'+bodyNumber+'X0.png');
            }else{ //if it doesn't exist -  see if both numbers are < 151 (use old depository)
                //can only use old depository with numbers less than 151. greater than 151 set to 0 (missingno)
                if(headNumber > 151){
                    headNumber = 0;
                }
                 if(bodyNumber > 151){
                    bodyNumber = 0;
                }
                message.channel.send('http://images.alexonsager.net/pokemon/fused/'+bodyNumber+'/'+bodyNumber+'.'+headNumber+'.png');
            }
        });
    }
}
module.exports = RandomFuseCommand;
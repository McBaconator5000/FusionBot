const commando = require('discord.js-commando');
//load pokemon list
const pokemon = require('../../pokemon-fusion.json');
//get number of possible pokemon
const pokemonAmount = Object.keys(pokemon).length - 1; //starting at 0 so subtract 1
const urlExists = require('url-exists');
const download = require('image-downloader');
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
        function randomFusion(){
            var headNumber = Math.floor(Math.random() * pokemonAmount);
            var bodyNumber = Math.floor(Math.random() * pokemonAmount);

            //test to see if we already have the image saved
            if(checkFileExistsSync('./images/'+headNumber+'X'+bodyNumber+'X0.png')){
                pasteSavedImage();
            }else{
                pasteURL();
            }

            function pasteSavedImage(){
                message.channel.send({
                    files: [{
                      attachment: './images/'+headNumber+'X'+bodyNumber+'X0.png',
                      name: 'fusion.png'
                    }]
                  });
            }
            
            function pasteURL(){
                //Test to see if url exists
                urlExists('http://pokefusion.japeal.com/upload/'+headNumber+'X'+bodyNumber+'X0.png', function(err, exists) {
                    if(exists){ //if it does, message with said url
                        message.channel.send('http://pokefusion.japeal.com/upload/'+headNumber+'X'+bodyNumber+'X0.png');
                        //save the image
                        var options = {
                            url: 'http://pokefusion.japeal.com/upload/'+headNumber+'X'+bodyNumber+'X0.png',
                            dest: './images'
                         };
                        download.image(options)
                            .then(({ filename, image }) => {
                                console.log('File saved to', filename)
                            }).catch((err) => {
                                throw err
                            });
                    }else{ 
                    //message.channel.send('failed, trying again ' + counter);
                    console.log('http://pokefusion.japeal.com/upload/'+headNumber+'X'+bodyNumber+'X0.png does not exists')
                    if(counter < 5){
                        randomFusion(); //re-call function if it failed, do 5 attempts
                    }
                }
            });
        }
    }
    //message.channel.send("starting random");
    var counter = 0; //set counter, only try 5 times
    randomFusion(); //call function (use function for easy recursion)
    
}
}
module.exports = RandomFuseCommand;
const commando = require('discord.js-commando');
//load pokemon list - will need to get pokemon number from it
const pokemon = require('../../pokemon-fusion.json');
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
class FuseCommand extends commando.Command{
    constructor(client){
        //once it loads
        super(client, {
            name: 'fuse',
            group: 'fusion',
            memberName:'fuse',
            description: 'Fuses Specific Pokemon',
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
                    //and save the image
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
}
module.exports = FuseCommand;
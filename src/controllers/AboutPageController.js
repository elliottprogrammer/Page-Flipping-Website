const AboutPageController = function() {
    const bioElem = document.getElementById("bio-body");
    const message = `Hey there!  Bryan Elliott here... Thanks for stopping by!
    I've always had a passion for computer programming and starting programming BASIC at the age of 8 years old on a Texas Instruments TI-99/4a and ATARI 400 home computers. 
    I've been working professionally in web development for approximately 12 years now. I am proficient in both front-end and back-end development.`;
    
    var randomPause = Math.floor(Math.random() * 6) + 3;

    const writeChar = (char) => {
        if (char.match(/[\r\n]/)) {
            char = '<br>';
        }
        bioElem.innerHTML += char;
    }
    
    const writeChars = (message, index, interval) => { 
        if (index < message.length) {
            bioElem.scrollTop = bioElem.scrollHeight;
            writeChar(message[index++]);
            if( index == randomPause) {
                randomPause = Math.floor(Math.random() * 40) + (index + 4);
                setTimeout(() => {
                    writeChars(message, index, interval);
                }, interval + 180);
            } else {
                setTimeout(() => {
                    writeChars(message, index, interval);
                }, interval);
            }
            
        }
    }
    writeChars(message, 0, 20);
    
}
export default AboutPageController;
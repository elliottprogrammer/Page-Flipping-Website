const AboutPageController = function() {
    const bioElem = document.getElementById("bio-body");
    bioElem.innerHTML = '';
    const message = `Hi, I'm Bryan Elliott.
    I am a full stack web developer currently living in Santa Clarita, CA.  I've been super passionate about computers and programming since the age of 8 and have been working professionally in the web development industry for 12+ years.
    From a professional standpoint, with my current employer, I mostly work with PHP and MySQL (LAMP stack) on the back-end and HTML, CSS, SASS, and JavaScript on the front-end, however my deeper passion lies in newer open source JavaScript related technologies and frameworks such as React.js, Node.js, and MongoDB (MERN stack), and with these is where I spend most of my personal time exploring, learning and creating some really cool web applications. I can't wait to see what's to come of the web in the next few years.
    I am currently open to considering a new full-time employment opportunity either locally in the Santa Clarita, CA area or remote where I can better utilize my skills with newer JavaScript based, front-end and back-end web technologies.
    Bryan :)`;
    
    var randomPause = Math.floor(Math.random() * 6) + 3;

    const writeChar = (char) => {
        if (char.match(/[\r\n]/)) {
            char = '<br>';
        }
        bioElem.innerHTML += char;
    }
    
    const writeChars = (message, index, interval) => { 
        if (index < message.length) {
            bioElem.parentNode.scrollTop = bioElem.parentNode.scrollHeight;
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
            
        } else {
            written = true;
        }
    }
    writeChars(message, 0, 20);
    
}
export default AboutPageController;
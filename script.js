const typingText = document.querySelector('.typing-text p');
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistakes span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const btn = document.querySelector('button');
//---set values ---
let timer;
let maxTime = 60;
let timeLeft = 60;
let charIndex = 0;
let mistake = 0;
let isTyping = false;
const sound = document.getElementById('sound');
    
//----handle user input ----
function initTyping(){
    const char = typingText.querySelectorAll('span'); //----get all the spans i.e all characters in the paragraph
    const typedChar = input.value.charAt(charIndex); //----get the current character user has typed 
    if(charIndex < char.length && timeLeft > 0){ //----check if current character is within paragraph limit and time is still left 
        if(!isTyping){
            timer = setInterval(initTime,1000); //----- call the function every 1 sec to decrease the time left 
            isTyping = true;
        }
        sound.play();
        if(char[charIndex].innerText === typedChar){
            // console.log("typed correct");
            char[charIndex].classList.add('correct');
        }else{
            mistake++;
            // console.log("typed incorrect");
            char[charIndex].classList.add('incorrect');
        }
        charIndex++;
        mistakes.innerText = mistake;
        cpm.innerText = charIndex-mistake;
        char[charIndex].classList.add('active');
    }else{
        //---time is up----
        clearInterval(timer);
        input.value = '';
    }
    
}
function initTime(){
    if(timeLeft > 0){
        timeLeft--;
        time.innerText = timeLeft;
        let wpmCalc = Math.round(((charIndex - mistake)/5)/(maxTime-timeLeft)*60); //-----this is the formula to get words per minute
        wpm.innerText = wpmCalc;
    }else{
        clearInterval(timer); //---- call clear interval as there is no time left
    }
}
input.addEventListener("input",initTyping);
function loadParagraph(){
    const paragraph= ["The quiet forest was a sanctuary for the weary traveler. Tall trees whispered ancient secrets while sunlight danced through the leaves, creating a mosaic of light and shadow on the forest floor. Birds sang melodious tunes, adding to the peaceful ambiance. As the traveler rested against a sturdy oak, they felt a deep sense of calm and connection with nature, a welcome respite from the bustling world beyond the woods.",
    "In a small village nestled between rolling hills, a festival brought the community together every spring. Brightly colored banners adorned the streets, and the scent of fresh flowers filled the air. Children laughed as they played games, and adults engaged in lively conversation. Music echoed from the town square, where musicians played traditional tunes. It was a time of joy and celebration, reminding everyone of the importance of unity and tradition.",
    "The scientist stared at the data on the screen, her mind racing with possibilities. After years of research and countless experiments, she was on the verge of a breakthrough. The implications of her discovery could revolutionize the field and change the way we understand the universe. As she adjusted her glasses and reviewed her notes, a sense of determination filled her. She was ready to present her findings to the world.",
    "The old library was a treasure trove of knowledge, its shelves lined with books from floor to ceiling. Dust motes danced in the sunlight that streamed through the tall windows. Each book held a story, a piece of history, or a wealth of information. Visitors marveled at the vast collection, feeling a sense of awe and reverence. The library was a place where curiosity thrived, and the pursuit of knowledge was celebrated.",
    "As the sun set over the ocean, the sky transformed into a canvas of vibrant colors. Hues of orange, pink, and purple blended seamlessly, reflecting off the tranquil waves. The sound of the gentle surf provided a soothing backdrop, lulling beachgoers into a state of relaxation. Couples walked hand in hand along the shore, leaving footprints in the sand. It was a perfect ending to a beautiful day, a moment of peace and natural beauty."
];
    const randomIndex = Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML = '';
    for(const char of paragraph[randomIndex]){
        typingText.innerHTML += `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>input.focus());
    typingText.addEventListener('click',()=>input.focus());
}
function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = 60;
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    input.value = '';
    wpm.innerText = 0;
    mistakes.innerText = 0;
    cpm.innerText = 0;
    time.innerText = timeLeft;
}

btn.addEventListener("click",reset);
loadParagraph();
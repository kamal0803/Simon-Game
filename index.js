var colors = ['green', 'red', 'yellow', 'blue'];
var totalButtons = document.querySelectorAll("button").length;
var level = 0;

var userChosenColors = [];
var systemChosenColors = [];

function nextRandomColor(){
    let randomColor =  colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
}

function playAudio(color){

    var audio = new Audio(`./sounds/${color}.mp3`);
    audio.play();

}

function gameOver(){

    playAudio("wrong");
    document.querySelector("h1").textContent = "Game Over";

    document.body.classList.add("game-over");

    setTimeout(() => {
        document.body.classList.remove("game-over");
    }, 500);

}

function checkAnswer() {

    if (userChosenColors[userChosenColors.length - 1] === systemChosenColors[userChosenColors.length - 1]) {
        
        if (userChosenColors.length === systemChosenColors.length) {
            setTimeout(() => {
                nextLevel();
            }, 1000);
        }
        return true;
    } else {
        return false;
    }
}

function nextLevel(){

    let randomChosenColor = nextRandomColor();

    let randomChosenButton = document.querySelector(`.${randomChosenColor}`);
    randomChosenButton.classList.add("flash");

    setTimeout(() => {
        randomChosenButton.classList.remove("flash");
    }, 500);

    playAudio(randomChosenColor);

    level++;

    document.querySelector("h1").textContent = `Level ${level}`;

    systemChosenColors.push(randomChosenColor);

    userChosenColors = [];

}

document.addEventListener("keydown", function(event){

    if(level == 0){
        nextLevel();
    }

})

for(var i = 0; i < totalButtons; i++){

    document.querySelectorAll("button")[i].addEventListener("click", function(){

        if(level == 0){
            gameOver();
        } else{

            let userChosenColor = this.classList[0];
            playAudio(userChosenColor);

            this.classList.add("grey", "flash");

            setTimeout(() => {
                this.classList.remove("grey", "flash");
            }, 500);

            userChosenColors.push(userChosenColor);
            
            if(!checkAnswer()){
                gameOver();
            }

        }
    });
}
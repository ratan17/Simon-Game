var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var noOfKeyDown = 0;
var noOfClicks = 0;
//nextSequence() function
function nextSequence(){
 var randomNumber = Math.random() * 4;

 randomNumber = Math.floor(randomNumber);

var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour); // push() returns the length of the new array. so use it seaparately

var randomButton = document.getElementById(randomChosenColour);

randomButton.classList.add("btn-flash"); //button flashes
setTimeout(function(){randomButton.classList.remove("btn-flash");}, 200);

switch(randomChosenColour){

 case 'red' : var buttonSound = new Audio("sounds/red.mp3");
              buttonSound.play();
              break;

 case 'blue' : var buttonSound = new Audio("sounds/blue.mp3");
               buttonSound.play();
               break;

 case 'green' : var buttonSound = new Audio("sounds/green.mp3");
                buttonSound.play();
                break;


 case 'yellow' : var buttonSound = new Audio("sounds/yellow.mp3");
                 buttonSound.play();
                 break;
 }

 //Levels
document.getElementById("level-title").innerHTML = "Level " + level;
level += 1;

}


// step 4 -- userClick

var totalNoOfButtons = document.querySelectorAll("div[type=button]").length;

for (var i = 0; i < totalNoOfButtons; i++){
document.querySelectorAll("div[type=button]")[i].addEventListener("click", userClick);
}

function userClick(){
animatePress(this);
var userChosenColour = this.id; //also possible with event.target.id in place of this.id
playSound(userChosenColour);
userClickedPattern.push(userChosenColour);

checkAnswer();

}


function playSound(name){
  switch(name){

   case 'red' : var buttonSound = new Audio("sounds/red.mp3");
                buttonSound.play();
                break;

   case 'blue' : var buttonSound = new Audio("sounds/blue.mp3");
                 buttonSound.play();
                 break;

   case 'green' : var buttonSound = new Audio("sounds/green.mp3");
                  buttonSound.play();
                  break;


   case 'yellow' : var buttonSound = new Audio("sounds/yellow.mp3");
                   buttonSound.play();
                   break;
   }


}

function animatePress(currentColour){
currentColour.classList.add("pressed");
setTimeout(function(){currentColour.classList.remove("pressed")}, 100) ;
}

//game starts here
document.addEventListener('keypress', gameStarts);

function gameStarts(){
  noOfKeyDown += 1;
  if(noOfKeyDown === 1){
    nextSequence();
  } else { ; }

}

// function to check user clicked correct button or not...we will compare each elements in gamePattern array and userClickedPattern

function checkAnswer(){
noOfClicks +=1;
if(noOfClicks > 1 && noOfKeyDown === 0){
  gameRestart();
}
 var i = userClickedPattern.length - 1;
 if( gamePattern[i] === userClickedPattern[i] ){
   if(userClickedPattern.length === gamePattern.length){
     setTimeout(nextSequence, 500);
     userClickedPattern.length = 0;
   }
 }else{
   gameRestart();
}
}

function gameRestart(){
  var wrongSound = new Audio("sounds/wrong.mp3");
      wrongSound.play();
      var bodyElement = document.getElementsByTagName("body")[0];
      bodyElement.classList.add("game-over");
      setTimeout(function(){bodyElement.classList.remove("game-over");}, 200);
      document.getElementById("level-title").innerHTML = "Game Over, Press Any Key To Restart";
      noOfKeyDown = 0;
      level = 0;
      gamePattern.length = 0;
      userClickedPattern.length = 0;
      noOfClicks = 0;
}

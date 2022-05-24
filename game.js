window.onload = () => {

//make all divs as array 
const divs = document.getElementsByClassName("boundary");

var score = 0;
var start = document.getElementById("start");
var end = document.getElementById("end");
var gameBoundaries = document.getElementById("game");
var restart;
var liveRound =document.getElementById("live-round");
var lastRound =document.getElementById("last-round");
var bestRound=document.getElementById("best-round");
timerLive=0;
timerLast=0;
timerBest=0;
var startingTime=0;
var endingTime=0;
min=100;
liveRound.innerText = "0.0";
lastRound.innerText = "0.0";
bestRound.innerText = "0.0";

start.addEventListener("click", startGame);

function startGame() {
  startingTime=Date.now();
  for(i=0;i<5;i++){     //reset the classes for all div when start again
    divs[i].classList.remove("youlose");;
  }
  document.getElementById("status").innerText = "Your score is \""+ score +"\" ";
  for(i=0;i<5;i++){ //add event listiner on all the divs
    divs[i].addEventListener("mouseover",looseMouseOver);
  }
  end.addEventListener("mouseover", wonFunction);
  gameBoundaries.addEventListener("mouseleave",cheatingDetected)
}

function looseMouseOver() {
  for(i=0;i<5;i++){
    divs[i].classList.add("youlose");
  }
  for(i=0;i<5;i++){
    divs[i].removeEventListener("mouseover",looseMouseOver);
    }
  //remove event from end (after winning)
  end.removeEventListener("mouseover",wonFunction);
  
  document.getElementById("status").innerText = "You Lost";
    
    // if score 5 then the score is 0
    if (score < 10) {
        score=0;
      } else {
        score -= 10; //if score 10 or more then substract from it 10 points
      }
    start.addEventListener("click", startGame);
    gameBoundaries.removeEventListener("mouseleave",cheatingDetected);
  }

function wonFunction(){
    endingTime=Date.now();//take the time when the user reach the end
    document.getElementById("status").innerText = "You Won";
    //remove loose event
    for(i=0;i<5;i++){
    divs[i].removeEventListener("mouseover",looseMouseOver);
    }
    end.removeEventListener("mouseover", wonFunction);
    score += 5;
    start.addEventListener("click", startGame);
    gameBoundaries.removeEventListener("mouseleave",cheatingDetected);

    timerLast=timerLive;
    timerLive=(endingTime-startingTime)/1000;
    liveRound.innerText=timerLive;
    //check the min which is the best score
    if (min>timerLive){
        min=timerLive;
        bestRound.innerText=timerLive;
    }
    lastRound.innerText=timerLast;
}

// restart the game
restart = document.getElementsByClassName("example");
restart[0].style.cursor = "pointer";
restart[0].innerHTML = "---RESTART---";
restart[0].addEventListener("click",restartGame);
function restartGame(){
  //reset the time
  liveRound.innerText = "0.0";
  lastRound.innerText = "0.0";
  bestRound.innerText = "0.0";
  timerLive=0;
  timerLast=0;
  timerBest=0;
  min=100;
  //reset the score and the classes added
  score=0;
  for(i=0;i<5;i++){
    divs[i].classList.remove("youlose");;
  }
  
  for(i=0;i<5;i++){
    divs[i].removeEventListener("mouseover",looseMouseOver);
    }

  document.getElementById("status").innerText = "Begin by moving your mouse over the \"S\" . ";
  end.removeEventListener("mouseover", wonFunction);
}

function cheatingDetected()
{
  alert("You Cheated!");
  gameBoundaries.removeEventListener("mouseleave",cheatingDetected);
  restartGame();
}


}
var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var started = false;



// Funzione per iniziare il gioco
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// EventListener per tutti i bottoni
$(".btn").click(function() {

  // Creo una variabile in cui salvare il click dell'utente
  var userChosenColour = $(this).attr("id");
  // Push all'array dell'id del bottone cliccato dall'utente
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel] ) {
    console.log("giusto");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  } else{
    $("body").toggleClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },100);
    $("h1").text("Game Over. Press a key to restart.");
    startOver();
  }
}


function animatePress(currentColour) {

  // Seleziona il bottone tramite ID che viene passato alla funzione ed aggiunge la classe "pressed"
  $("#" + currentColour).addClass("pressed");

  // con un Timeout di 100ms viene rimossa la classe "pressed"
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 200);
}


function nextSequence() {

  //Reset user clicked pattern everytime this function is called
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  // Genera un numero da 0 a 3
  var randomNumber = Math.floor(Math.random() * 4);
  // In base al numero assegna un colore a "randomChosenColour", preso dall'array
  var randomChosenColour = buttonColours[randomNumber];
  // Aggiunge il colore ad un nuovo array di nome gamePattern
  gamePattern.push(randomChosenColour);
  // Aggiunge l'animazione FadeOut/In al bottone selezionato
  $("#" + randomChosenColour).fadeOut(150).fadeIn(150);

  playSound(randomChosenColour);

}


function playSound(name) {
  // Crea una variabile audio a cui assegna il suono del colore scelto, e lo riproduce
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

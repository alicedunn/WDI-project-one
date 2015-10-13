var count=0;
var compShipsRemaining = 8;
var playShipsRemaining = 8;
var lastCompChoice = 0;

$(function(){
  setup();
  addResetListener();
  playGame()
})

function setup(){
  $("td.box").on("click", function(){

    // console.log("INDEX", $(this).index());

    if ($(this).index() < 4 && (!$(this).hasClass("placedShip")) && (!$(this).next().hasClass("placedShip")) && (!$(this).hasClass("placedShipB")) && (!$(this).next().hasClass("placedShipB"))){ 
      $(this).next().addClass("placedShipB");
      $(this).addClass("placedShip");
      var select = Math.ceil(Math.random()*25);
      var $compCheck = $("td#c"+select+".comp");
      while($compCheck.index() === 4 || $compCheck.hasClass("computerShip")||$compCheck.next().hasClass("computerShip")) {
        $compCheck = $("td#c"+(Math.ceil(Math.random()*25)+".comp"));
      }
      while($compCheck.index() === 4 || $compCheck.hasClass("computerShip") || $compCheck.next().hasClass("computerShip")) {
        $compCheck = $("td#c"+(Math.ceil(Math.random()*25)+".comp"));
      }
      $compCheck.addClass("computerShip");
      $compCheck.next().addClass("computerShip");
      count++;
    }
    else {
      return $("h2").text("invalid choice, choose another position")
    }
    
    if(count === 4) {
      playerMove();
      $("td.box").off('click');
    }
  });
};

function playerMove(){
  setTimeout(function(){
    $("h2").text("guess where the computer's ship is on the computer board!");
    $("td.comp").on("click", function(){
      playerGo= $(event.target);
      if (playerGo.hasClass("computerShip")){
        var audioBoom = new Audio('./Sounds/explosion.wav');
        audioBoom.play()
        $(this).off("click");
        $("h2").text("Player hit, have another go!");
        playerGo.toggleClass('hit')
        compShipsRemaining --;
        checkForWin();
      } 
      else {
        var audioSplash = new Audio('./Sounds/splash2.mp3');
        audioSplash.play();
        $(this).off("click");
        playerGo.text("miss");
        checkForWin();
        computerMove();
      }
    })
  }, 1500)
}

function computerMove(){
  $("h2").text("Computer's Move")
    var computerChoose = Math.ceil(Math.random()*25);
    console.log(computerChoose)
    if ($("td#p"+computerChoose+".box").text().length === 0){
      compSelect = $("td#p"+computerChoose+".box");
      setTimeout(function(){
      if (compSelect.hasClass("placedShip")||(compSelect.hasClass("placedShipB"))){
        var audioBoom = new Audio('./Sounds/explosion.wav');
        audioBoom.play()
        $("h2").text("Computer hit you!");
        compSelect.addClass("hit");
        compSelect.text("hit")
        playShipsRemaining --;
        console.log("player ships 1"+playShipsRemaining)
        checkForWin();
        if (((compSelect.next().hasClass("placedShip"))|| (compSelect.next().hasClass("placedShipB") ))&& (!compSelect.next().hasClass("hit"))){
          var audioBoom = new Audio('./Sounds/explosion.wav');
          audioBoom.play()
          compSelect.next().addClass("hit");
          compSelect.next().text("hit");
          playShipsRemaining --;
          console.log("player ships 2"+playShipsRemaining)
          checkForWin();
        }

        else{
          compSelect.next().text("miss");
          $("h2").text("Computer hit you! Now your go!")
        }

      } 

      else {
        var 
        audioSplash = new Audio('./Sounds/splash2.mp3');
        audioSplash.play();
        compSelect.text("miss");
        $("h2").text("player go")
      }
    }, 1000)
    }else {
      computerMove();
      checkForWin();
    }
}

function checkForWin(){
  if(playShipsRemaining == 0){
    $("td").off("click")
    displayWinner();
  }
  else if(compShipsRemaining == 0){
    $("td").off("click");
    displayWinner();
  }
}

function addResetListener (){
  $("#reset").on("click", function(){
    $("h2").text("Place your ship on player board");
    for (var i=0; i<$(".box").length+1; i++){
      $("td#p"+i+".box").removeClass("placedShip computerShip placedShipB hit");
      $("td#p"+i+".box").text("");
      $("td#c"+i+".comp").removeClass("placedShip placedShipB computerShip hit");
      $("td#c"+i+".comp").text("");
      count = 0
      playShipsRemaining = 8;
      compShipsRemaining = 8;
    }
    setup();
  })
}

function displayWinner(){
  if (compShipsRemaining == 0){
    var audioWin = new Audio("./Sounds/winner.mp3")
    audioWin.play();
    $("h2").text("Congrats, you have won the game!")
  }
  else {
    var audioLose = new Audio("./Sounds/loser.mp3")
    audioLose.play();
    $("h2").text("Sorry, computer won this time")
  }
}
function playGame (){
  $("#playGame").on("click", function(){
    $("html,body").animate({scrollTop : $(".second").offset().top}, 1000);
  })
}
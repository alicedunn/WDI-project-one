var count=0;
var compShipsRemaining = 5;
var playShipsRemaining = 5;

$(function(){
  setup();
  addResetListener();
})

function setup(){
  $("td.box").on("click", function(){
    var clicked = $(this).data("num")/6;
    console.log(clicked)
    var nextTo =  ($(this).next()).data("num")/6;
    console.log(nextTo);
    if ((Math.floor(clicked)) == (Math.floor(nextTo))){ 
    $(this).next().toggleClass("placedShip")
    $(this).toggleClass("placedShip");
  }
  else {
    return console.log("invalid choice")
  }
    var select = Math.ceil(Math.random()*25);
    console.log(select)
    var $compCheck = $("td#c"+select+".comp");
    console.log($compCheck);
    var $nextCompCheck = $("td#c"+(select+1)+".comp");
    console.log($nextCompCheck);
    if (Math.floor($compCheck.data("num")/6) == Math.floor(($nextCompCheck).data("num")/6)){
      console.log(Math.floor($compCheck.data("num")/6));
      console.log(Math.floor(($nextCompCheck).data("num")/6));

    $compCheck.toggleClass("computerShip");
    $compCheck.next().toggleClass("computerShip");
    count++;
  }
  else{
    console.log("invalid comp")
  }
    if(count === 4) {
      playerMove();
      $("td.box").off('click');
    }
  });
  // else {
  //   $("td").off("click"); 
  //   playerMove();
  //   }
};

function playerMove(){
  $("h2").text("guess where the computer's ship is on the computer board!");
  $("td.comp").on("click", function(){
    playerGo= $(event.target);
    if (playerGo.hasClass("computerShip")){
      $(this).off("click");
      $("h2").text("Player hit, have another go!");
      playerGo.toggleClass('hit')
      compShipsRemaining --;
      checkForWin();
      } 
    else {
    $(this).off("click");
    playerGo.text("miss");
    computerMove();
    }
  })
}

function computerMove(){
  var computerChoose = Math.ceil(Math.random()*25);
  console.log(computerChoose)
  if ($("td#p"+computerChoose+".box").text().length === 0){
    compSelect = $("td#p"+computerChoose+".box");
    if (compSelect.hasClass("placedShip")){
      $("h2").text("Computer hit you!");
      compSelect.toggleClass("hit");
      compSelect.text("hit")
      playShipsRemaining --;
      checkForWin();

    }
    else {
      compSelect.text("miss");
      $("h2").text("player go")
    }
  }else
  computerMove();
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
    $("td#p"+i+".box").removeClass("placedShip computerShip hit");
    $("td#p"+i+".box").text("");
    $("td#c"+i+".comp").removeClass("placedShip computerShip hit");
    $("td#c"+i+".comp").text("");
    count = 0
    playShipsRemaining = 5;
    compShipsRemaining = 5;
    }
    setup();
  })
}

function displayWinner(){
  console.log("winner")
  if (compShipsRemaining == 0){
    $("h2").text("Congrats, you have won the game!")
  }
  else {
    $("h2").text("Sorry, computer won this time")
  }
}
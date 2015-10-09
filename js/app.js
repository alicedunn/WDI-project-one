$(function(){
setup()

})

function setup(){
  $("td").on("click", function(){
    $(this).toggleClass("placedShip");
  
  
  var select = Math.floor(Math.random()*9);
  var compShip = $(".box["+select+"]");
  $(".box[5]").toggleClass("computerShip");
})
  playGame();

}

function playGame (){
computerMove();
playerMove();

}

function playerMove(){

getWinner()
  }

function computerMove(){

getWinner()
}

function getWinner(){

}
$(function(){
  setup();
})

function setup(){
  $("td.box").on("click", function(){
    $(this).toggleClass("placedShip");
    var select = Math.ceil(Math.random()*9);
    $("td#c"+select+".comp").toggleClass("computerShip");
    $("td").off("click");  
 playerMove()
  })
  
}

function playerMove(){
  $("h2").text("guess where the computer's ship is on the computer board!");
  $("td").on("click", function(){
    event.target.style.backgroundColor = 'yellow';
    playerGo= $(event.target);
    console.log(playerGo.attr("id"))
    if ($(event.target).hasClass("computerShip")){
      $("h2").text("Player hit, you Win!");
      return
  }
    else {
    console.log("miss");
    computerMove();
  }

})
}

function computerMove(){
  var computerChoose = Math.ceil(Math.random()*9);
  $("td#p"+computerChoose+".box");
  if ($("td#p"+computerChoose+".box").hasClass("placedShip")){
    $("h2").text("Computer Hit you! Computer Wins!")
  }
  else {
$("h2").text("You Missed! Computer chose "+computerChoose+"and missed. Try again")
  $("td#p"+computerChoose+".box").style.backgroundColor='green';
  playerMove ()
  }
}

function getWinner(){

}
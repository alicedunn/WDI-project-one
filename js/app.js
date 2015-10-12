$(function(){
  setup();
  addResetListener();
})

function setup(){
  $("td.box").on("click", function(){
    $(this).toggleClass("placedShip");
    $(this).css("background-image", "./battleship.jpg" )
    var select = Math.ceil(Math.random()*9);
    $("td#c"+select+".comp").toggleClass("computerShip");
    $("td").off("click");  
    playerMove()
  })
}

function playerMove(){
  $("h2").text("guess where the computer's ship is on the computer board!");
  $("td.comp").on("click", function(){
    playerGo= $(event.target);
    console.log(playerGo.attr("id"))
    if (playerGo.hasClass("computerShip")){
      $("h2").text("Player hit, you Win!");
      playerGo.text("hit")
      playerGo.css("background-image", "url(./boom.png)");
      playerGo.css("background-size", "cover")
      $("td").off("click");
      }
    else {
    console.log("miss");
    playerGo.text("miss")
    computerMove();
    }
  })
}

function computerMove(){
  var computerChoose = Math.ceil(Math.random()*9);
  console.log(computerChoose)
  if ($("td#p"+computerChoose+".box").text().length === 0){
    compSelect = $("td#p"+computerChoose+".box");
    if (compSelect.hasClass("placedShip")){
      $("h2").text("Computer hit you! Computer Wins!");
      compSelect.css("background-color", "transparent")
      compSelect.css("background-image", "url(./boom.png)");
      compSelect.css("background-size", "cover");
      $("td").off("click");
    }
    else {
      $("h2").text("You Missed! Computer chose and missed. Try again")
      compSelect.text("miss");
    }
  }else
  computerMove();
}

function addResetListener (){
  $("#reset").on("click", function(){
  $("h2").text("Place your ship on player board");
  for (var i=0; i<$(".box").length+1; i++){
    $("td#p"+i+".box").removeClass("placedShip computerShip");
    $("td#p"+i+".box").css("background-image", "")
    $("td#p"+i+".box").text("");
    $("td#c"+i+".comp").removeClass("placedShip computerShip");
    $("td#c"+i+".comp").css("background-image", "")
    $("td#c"+i+".comp").text("");
    }
    setup();
  })
}
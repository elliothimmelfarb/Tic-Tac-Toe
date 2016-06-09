$(document).ready(init);

var boardSize = 3;
var turnCount = 0;
var gameOver = false;
var xTurn = true;
var xSpots = [];
var oSpots = [];
var winCombos = [
   ['0', '1', '2'],
   ['0', '4', '8'],
   ['0', '3', '6'],
   ['1', '4', '7'],
   ['2', '5', '8'],
   ['2', '4', '6'],
   ['3', '4', '5'],
   ['6', '7', '8'],
]


function init() {
   newGame();
   $('.new-game').click(newGame);
}

function newGame() {
   gameOver = false;
   turnCount = 0;
   xSpots = [];
   oSpots = [];
   $('.cell, .results').empty();
   $('.board').empty();
   buildBoard(boardSize);
   $('.cell').click(cellClick);
   $('.results').addClass('big');
   newTurn();
}

function cellClick(event) {
   choose(event.target);
}

function choose(target) {
   //console.log(target.id)
   if (xTurn) {
      //console.log("xturn");
      $(target).unbind().find('.xo').text("X");
      xSpots.push(target.id);
      //console.log(xSpots);
   } else {
      //console.log("oturn");
      $(target).unbind().find('.xo').text("O");
      oSpots.push(target.id);
      //console.log(oSpots);
   }
   if(winTest()) {
      return;
   }
   winTest();
   if (!gameOver) {
      xTurn = !xTurn;
      newTurn();
   }
}

function winTest() {
   //console.log("wintTest");
   //debugger;
   var won = false;

   if (xTurn) {
      for (var i = 0; i < winCombos.length; i++) {
         var count = 0;
         for (var j = 0; j < 3; j++) {
            if (xSpots.includes(winCombos[i][j])) {
               count++;
            }
            //console.log(winCombos[i][j], xSpots, count)
         }
         if (count === 3) {
            //console.log("won");
            gameOver = true;
            xTurn = false;
            return gameIsOver("X's");
         }
      }
   } else {
      for (var i = 0; i < winCombos.length; i++) {
         var count = 0;
         for (var j = 0; j < 3; j++) {
            if (oSpots.includes(winCombos[i][j])) {
               count++;
            }
            //console.log(winCombos[i][j], oSpots, count)
         }
         if (count === 3) {
            //console.log("won");
            gameOver = true;
            xTurn = true;
            return gameIsOver("O's");
         }
      }
   }


   // if(gameOver) return gameIsOver();
   // else return newTurn();
}

function newTurn() {
   console.log("turn");
   turnCount++;
   if (xTurn) {
      $('.r-left').addClass('animated fadeIn').text("X");
      $('.r-right').removeClass('animated fadeIn').empty();
   } else {
      $('.r-right').text("O");
      $('.r-left').empty();
   }
   if (turnCount > 9) {
      $('.results').text("Cat's Game!").removeClass('big');
   }
}

function gameIsOver(who) {
   //debugger;
   $('.results').text("Game Over! " + who + " win!").removeClass('big');
   $('.cell').unbind();
}

function buildBoard(size) {
   var $board = $('.board');
   var id = 0;
   for (var i = 0; i < size; i++) {
      var $row = $('<tr>');
      for (var j = 0; j < size; j++) {
         var $div = $('<div>').addClass('cell animated zoomIn').attr('id', id).append($('<p>').addClass("xo"));
         var $cell = $('<td>').append($div);
         $row.append($cell);
         id++
      }
      $board.append($row);
   }
}

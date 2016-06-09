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

   if (xTurn) {

      $(target).unbind().find('.xo').text("X");
      xSpots.push(target.id);

   } else {

      $(target).unbind().find('.xo').text("O");
      oSpots.push(target.id);

   }
   if (winTest()) {
      return;
   }
   winTest();
   if (!gameOver) {
      xTurn = !xTurn;
      newTurn();
   }
}

function winTest() {


   var won = false;

   if (xTurn) {
      for (var i = 0; i < winCombos.length; i++) {
         var count = 0;
         for (var j = 0; j < 3; j++) {
            if (xSpots.includes(winCombos[i][j])) {
               count++;
            }
         }
         if (count === 3) {
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
         }
         if (count === 3) {
            gameOver = true;
            xTurn = true;
            return gameIsOver("O's");
         }
      }
   }
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

   $('.results').text("Game Over! " + who + " win!").removeClass('big');
   $('.cell').unbind();
}

function buildBoard(size) {

   let $rows = [];
   for (let i = 0; i < size; i++) {
      //build rows
      let $row = $('<div>').addClass('row');
      let $squares = []
      for (let j = 0; j < size; j++) {
         let $square = $('<div>').addClass('square');
         $squares.push($square);
      }

      $row.append($squares);

      //fill row with squares

      $rows.push($row);

   }

   $('.board').append($rows);

   /*
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
   } */
}

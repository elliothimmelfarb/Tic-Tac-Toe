var redsTurn = true;

$(document).ready(init);

function init() {
   $('.board').on('click', '.square', clickSquare)
   $('.makeBoard').click(makeBoard);
   buildBoard(3)
}

function makeBoard() {
   let size = $('.selectSize').val();
   buildBoard(size);
}

function clickSquare() {
   if (redsTurn) {   
      $(this).addClass('red');
   } else {
      $(this).addClass('blue');
   }
   redsTurn = !redsTurn;

   checkWin();
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

   $('.board').empty().append($rows);
}

function checkWin() {

   var size = $('.row').length;

   $('.row').each(function(index, el) {
      var notRed = $('.row').eq(index).find('.square').not('.red').length;
      var notBlue = $('.row').eq(index).find('.square').not('.red').length;

      if (notRed === 0 || notBlue === 0) {
         endGame();
      }
   });

   for (var i = 1; i <= size; i++) {
      var notBlue = $(`.square:nth-child(${i})`).not('.blue').length;
      var notRed = $(`.square:nth-child(${i})`).not('.red').length;

      if (notRed === 0 || notBlue === 0) {
         endGame();
      }
   }

   var $diagonals = [];

   $('.square').each(function(index, el) {
      var col = $(el).index();
      var row = $(el).parent().index();

      if(col === row) {
         $diagonals.push($(el));
      }
   });  

   debugger;

   /*
   var squareCount = $('.row').eq(row).find('.square').length;
   
   var redCount = $(`.row:eq(${row}) .red`).length
   var blueCount = $(`.row:eq(${row}) .blue`).length
   
   console.log('squareCount:', squareCount);
   console.log('reCount:', redCount);
   console.log('blueCount:', blueCount);
   */
}

function endGame() {
   console.log('game over')
}
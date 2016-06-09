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

function clickSquare(e) {
   console.log('clicked!', e.target)
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
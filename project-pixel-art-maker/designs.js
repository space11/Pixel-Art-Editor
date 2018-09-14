(function () {
  'use strict';

  // set true to show debug messages.
  var DEBUG = true;

  let pixelColor = '#000'; // default pixel color is black
  let gridTable = '#pixelCanvas'; // if of the table/canvas
  let isPainting = false; // flag to start/stop painting pixels

  /**
   * @description Print debug to console
   * @param {string} message - The message to be printed
   */
  function debug(message) {
    if (DEBUG === true) {
      console.log(message);
    }
  }

  /**
   * @description Create table witch represents the grid
   * @param {string} e - Events
   */
  function makeGrid(e) {
    e.preventDefault();
    debug('makeGrid');

    const gridHeight = $('#input_height').val();
    const gridWidth = $('#input_width').val();

    $(gridTable).empty();

    createCanvas(gridWidth, gridHeight);
  }

  /**
   * @description Create canvas
   * @param {int} width  Width of the canvas
   * @param {int} height Height of th canvas
   */
  function createCanvas(width, height) {
    if (width > 0 && height > 0) {
      let newRow;
      let table = $(gridTable)[0];

      for (var x = 0; x < width; x++) {
        newRow = table.insertRow(-1);
        for (var y = 0; y < height; y++) {
          newRow.insertCell(-1);
        }
      }
    }
  }

  /**
   * @description update pixel with correct color or clear it
   * @param {string} e event 
   */
  function updatePixel(e) {
    isPainting = true;
    if (e.which === 1) {
      // plotPixel();
      // plotPixel.call(this);
      $(this).css('background', pixelColor);
    }

    if (isPainting && e.which === 3) {
      debug('clear');
      var tempColor = pixelColor;
      pixelColor = '#fff';
      $(this).css('background', pixelColor);
      pixelColor = tempColor;
    }

  }


  function updatePixelColor() {
    debug('updatePixelColor');
    pixelColor = $('#colorPicker').val();
  }

  function toggleBorder() {
    $('#pixelCanvas td').toggleClass('toggle-grid');
  }


  function clearCanvas() {
    $('#pixelCanvas td').css('background-color', '#fff');
  }

  function startApplication() {
    debug('startApplication');

    // Disable right-click context-menu
    document.oncontextmenu = function () {
      return false;
    };

    // Events
    $(document).mouseup(function () {
      isPainting = false;
    });

    $(gridTable).on('mousedown', 'td', updatePixel);

    $(gridTable).on('mouseover', 'td', updatePixel);

    $('#sizePicker').submit(makeGrid);
    $('#colorPicker').on('change', updatePixelColor);
    $('#toggleGrid').on('click', toggleBorder);
    $('#clearCanvas').on('click', clearCanvas);
  }

  startApplication();
})();
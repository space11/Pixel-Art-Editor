(function () {
  'use strict';

  // set true to show debug messages.
  var DEBUG = true;

  var pixelColor = '#000'; // default pixel color is black
  var gridTable = '#pixel_canvas'; // if of the table/canvas
  var isPainting = false; // flag to start/stop painting pixels

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
    debug('makeGrid');
    e.preventDefault();

    var gridHeight = 0;
    var gridWidth = 0;

    removeCanvas(gridTable);

    gridHeight = $('#input_height').val();
    gridWidth = $('#input_width').val();

    createCanvas(gridWidth, gridHeight);
  }

  /**
   * @description Create canvas
   * @param {int} width  Width of the canvas
   * @param {int} height Height of th canvas
   */
  function createCanvas(width, height) {
    if ((width > 0) && (height > 0)) {
      var newRow, newCell;
      var table = $(gridTable)[0];

      for (var x = 0; x < width; x++) {
        newRow = table.insertRow(-1);
        for (var y = 0; y < height; y++) {
          newCell = newRow.insertCell(-1);
        }
      }

      return true;
    }

    return false;
  }

  /**
   * @description update pixel with correct color or clear it
   * @param {string} e event 
   */
  function updatePixel(e) {
    isPainting = true;
    if (e.which === 1) {
      plotPixel.call(this);
    }

    if (isPainting && e.which === 3) {
      debug('clear');
      var tempColor = pixelColor;
      pixelColor = '#fff';
      plotPixel.call(this);
      pixelColor = tempColor;
      return false;
    }

  }

  function plotPixel() {
    debug('plotPixel');
    $(this).css('background', pixelColor);
  }

  function updatePixelColor() {
    debug('updatePixelColor');
    pixelColor = $('#colorPicker').val();
  }

  function toggleBorder() {
    $('#pixel_canvas td').toggleClass('toggle-grid');
  }

  function removeCanvas(table) {
    $(table).empty();
  }

  function clearCanvas() {
    $('#pixel_canvas td').css('background-color', '#fff');
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

    $('#pixel_canvas').on('mousedown', 'td', updatePixel);

    $('#pixel_canvas').on('mouseover', 'td', updatePixel);

    $('#sizePicker').submit(makeGrid);
    $('#colorPicker').on('change', updatePixelColor);
    $('#toggle_grid').on('click', toggleBorder);
    $('#clear_canvas').on('click', clearCanvas);
  }

  startApplication();
})();
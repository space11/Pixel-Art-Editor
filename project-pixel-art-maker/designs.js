(function () {
  'use strict';

  // set true to show debug messages.
  var DEBUG = true;

  var pixelColor = '#000'; // default pixel color is black
  var gridTable = $('#pixel_canvas');

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
    var newTable = '';

    removeCanvas();
    gridHeight = $('#input_height').val();
    gridWidth = $('#input_width').val();

    for (var x = 0; x < gridWidth; x++) {
      newTable += '<tr>';
      for (var y = 0; y < gridHeight; y++) {
        newTable += '<td></td>';
      }
      newTable += '</tr>';
    }
    gridTable.append(newTable);
  }

  function plotPixel() {
    debug('plotPixel');
    $(this).css('background', pixelColor);
  }

  function updatePixelColor() {
    debug('updatePixelColor');
    pixelColor = $('#colorPicker').val();
  }

  function updatePixel(e) {
    debug('updatePixel');
    e.stopPropagation();
    if (e.which === 1) {
      debug('e.which === 1');
      plotPixel.call(this);
    }
    if (e.which === 3) {
      debug('e.which === 3');
      var tempColor = pixelColor;
      pixelColor = '#fff';
      plotPixel.call(this);
      pixelColor = tempColor;
      return false;
    }
    return true;
  }

  function toggleBorder() {
    $('#pixel_canvas td').toggleClass('toggle-grid');
  }

  function removeCanvas() {
    gridTable.empty();
  }

  function clearCanvas() {
    $('#pixel_canvas td').css('background-color', '#fff');
  }

  function startApplication() {
    // Disable right-click context-menu
    document.oncontextmenu = function () {
      return false;
    };

    // Events
    debug('startApplication');
    $('#sizePicker').submit(makeGrid);
    $(gridTable).on('mousedown', 'td', updatePixel);
    $('#colorPicker').on('change', updatePixelColor);
    $('#toggle_grid').on('click', toggleBorder);
    $('#clear_canvas').on('click', clearCanvas);
  }

  startApplication();
})();
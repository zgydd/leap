'use strict';

$('#actionPinch').on('click', function() {
    runtimes.activedPage = 'pinch';
    $('main').load('./pages/pinch.html');
});
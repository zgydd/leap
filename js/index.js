'use strict';

var runtimes = {};
runtimes.controller = new Leap.Controller({ enableGestures: true });
runtimes.swiper = runtimes.controller.gesture('swipe');
runtimes.activedPage = 'home';
runtimes.bgCount = 21;
runtimes.baseBgList = [];

var _getRandom = function(from, to) {
    var c = from - to + 1;
    return Math.floor(Math.random() * c + to);
};

$(document).ready(function() {
    $('main').load('./pages/home.html');
    for (var i = 1; i <= runtimes.bgCount; i++) runtimes.baseBgList.push('bg-' + i);
    /*
    runtimes.swiper.update(function(g) {
        switch (true) {
            case (runtimes.activedPage === 'home'):
                if (g.translation()[0] < -20) {
                    runtimes.activedPage = 'pinch';
                    $('main').load('./pages/pinch.html');
                }
                break;
            case (runtimes.activedPage === 'pinch'):
                if (g.translation()[0] > 70) {
                    runtimes.activedPage = 'home';
                    $('main').load('./pages/home.html');
                }
            default:
                break;
        }
    });
    runtimes.controller.connect();
    */
});
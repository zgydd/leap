'use strict';

var getRandomBg = function() {
    if (!runtimes.bgList) runtimes.bgList = JSON.parse(JSON.stringify(runtimes.baseBgList));
    else if (!runtimes.bgList.length) {
        runtimes.activedPage = 'home';
        $('main').load('./pages/home.html');
    }
    return runtimes.bgList[_getRandom(0, runtimes.bgList.length - 1)];
};
$(document).ready(function() {
    /********************************************************
     * This is the actual example part where we call pinchStrength
     *****************************************************/
    //var output = document.getElementById('output');
    runtimes.activedBg = '';
    var progress = document.getElementById('progress');

    for (var i = 0; i < 10; i++) {
        var tmpCol = $('<li></li>');
        var inCol = $('<ul></ul>')
        for (var j = 0; j < 10; j++) {
            inCol.append($('<li></li>').css({ 'backgroundColor': '#262', 'opacity': 1 }));
        }
        tmpCol.append(inCol);
        $('.sample-list').append(tmpCol);
    }
    runtimes.activedBg = getRandomBg();
    $('.sample-list').addClass(runtimes.activedBg);
    // Set up the controller:
    Leap.loop({ background: true }, {
        hand: function(hand) {
            if (!progress || $('.sample-list>li').length === 0) return;
            //output.innerHTML = hand.pinchStrength.toPrecision(2);
            progress.style.width = hand.pinchStrength * 100 + '%';
            if ($('.sample-list').hasClass('completed-frame')) return;
            if (hand.pinchStrength <= 0) return;
            var thisCol = parseInt(hand.pinchStrength * 10 - 0.1);
            if ($('.sample-list>li').length <= thisCol) return;

            var activedCol = $($('.sample-list>li').get(thisCol)).children('ul');
            if (!activedCol.length) return;
            activedCol = activedCol.get(0);
            if (!$(activedCol).children('li').length) return;
            var activedIdx = 0;
            for (activedIdx = 0; activedIdx < $(activedCol).children('li').length; activedIdx++) {
                if ($($(activedCol).children('li').get(activedIdx)).css('opacity') > 0) break;
            }
            if (activedIdx >= $(activedCol).children('li').length) {
                //$(activedCol).css({ 'border': '1px black solid' });
                var allCompleted = true;
                $('.sample-list>li>ul>li').each(function(i) {
                    if ($(this).css('opacity') > 0) allCompleted = false;
                });
                if (allCompleted) {
                    $('.sample-list').addClass('completed-frame');
                    setTimeout(function() {
                        $('.sample-list>li>ul>li').each(function(i) {
                            $(this).css({ 'opacity': 1 });
                        });
                        $('.sample-list').removeClass(runtimes.activedBg);
                        if (runtimes.bgList && runtimes.bgList.length) {
                            var idx = runtimes.bgList.indexOf(runtimes.activedBg);
                            if (idx >= 0) runtimes.bgList.splice(idx, 1);
                        }
                        runtimes.activedBg = getRandomBg();
                        $('.sample-list').addClass(runtimes.activedBg);
                        $('.sample-list').removeClass('completed-frame');
                    }, 2000);
                }
            } else {
                var newOpacity = $($(activedCol).children('li').get(activedIdx)).css('opacity') - 0.02;
                if (newOpacity < 0) newOpacity = 0;
                $($(activedCol).children('li').get(activedIdx)).css({ 'opacity': newOpacity });
            }
        }
    });
});
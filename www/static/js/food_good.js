"use strict";

var $ = require('jquery');
var Util = require('./ajax/util');

var page = 1;
var $foods = $('.js-foods');
var $more = $('.js-more');

function getMoreFood() {
    var currentPage = ++page;

    var request = Util.myAjax({
        url: '/home/food/more',
        data: {
            page: currentPage
        },
        method: 'post'
    });

    request.done(function(ret) {
        if (ret.errno == 0) {
            var data = ret.data || [],
                len = data.length;
            if (len === 0) {
                $more.html('亲，已经到底了～')
                    .off('click.more')
                    .delay(1500)
                    .slideUp();
            } else if (len > 0) {
                var tmpl = [];
                data.forEach(function(item) {
                    var cur = Util.getTmpl({
                        url: item.foodurl,
                        name: item.foodname
                    });

                    tmpl.push(cur);
                });
                var moreFood = tmpl.join('');

                var $moreFood = $(moreFood).hide()
                    .addClass('more-food')
                    .attr('index', 'more' + currentPage)
                    .css('transform', 'rotate(0deg)');
                $foods.append($moreFood);
                $('.more-food').show()
                    .css('transform', 'rotate(360deg)');
            }
        }
    });
}

$more.on('click.more', function(e) {
    e.preventDefault();
    getMoreFood();
});

var $ = require('jquery');

module.exports = Util = (function () {
	function myAjax(config) {
        var request = $.ajax({
            url: config.url,
            data: config.data,
            method: config.method
        });

        return request;
    }
    function getTmpl(config) {
        var url = config.url,
            name = config.name;

        return '<li class="food"><img class="food-img" src=' + url + ' alt="' + name + '"></li>';
    }

    return {
    	myAjax: myAjax,
    	getTmpl: getTmpl
    };
})();
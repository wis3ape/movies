(function() {
    'use strict';

    angular
        .module('App.Movies')
        .filter('momentify', momentify)
        .filter('timeit', timeit);

    function momentify() {
        return function(value) {
            return moment(value).format('MMMM DD, YYYY');
        };
    }

    function timeit() {
        return function(value) {
            var duration = moment.duration(value, 'seconds');

            return duration.get('hours') + ':' + duration.get('minutes');
        };
    }
})();

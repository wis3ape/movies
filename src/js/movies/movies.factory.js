(function() {
    'use strict';

    angular
        .module('App.Movies')
        .factory('moviesFactory', moviesFactory);

    moviesFactory.$inject = ['$http'];

    function moviesFactory($http) {
        var factory = {
            getMovies: getMovies
        };

        function getMovies() {
            return $http.get('/movies');
        }

        return factory;
    }
})();

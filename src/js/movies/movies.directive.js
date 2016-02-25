(function() {
    'use strict';

    angular
        .module('App.Movies')
        .directive('movies', movies);

    function movies() {
        return {
            restrict: 'E',
            templateUrl: 'src/js/movies/movies.template.html',
            controller: MoviesCtrl,
            controllerAs: 'moviesVm',
            scope: {},
            bindToController: true
        };
    }

    MoviesCtrl.$inject = ['moviesFactory'];

    function MoviesCtrl(moviesFactory) {
        var vm = this;

        vm.moviesList = [];
        vm.getList = getList;

        vm.term = 'name';
        vm.reverse = true;
        vm.order = order;

        function activate() {
            vm.getList();
        }

        function getList() {
            moviesFactory
                .getMovies()
                .then(success, error);

            function success(res) {
                vm.moviesList = res.data.items;
            }
        }

        function error(res) {
            throw new Error(res);
        }

        function order(term) {
            vm.reverse = (vm.term === term) ? !vm.reverse : false;
            vm.term = term;
        }

        activate();
    }
})();

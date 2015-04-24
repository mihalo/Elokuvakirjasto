var MyApp = angular.module('MyApp', ['firebase', 'ngRoute']);

MyApp.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                controller: 'ListMoviesController',
                templateUrl: 'app/views/list.html'
            })
            .when('/movies', {
                controller: 'ListMoviesController',
                templateUrl: 'app/views/list.html'
            })
            .when('/movies/new', {
                controller: 'AddMovieController',
                templateUrl: 'app/views/addmovie.html'
            })
            .otherwise({
                redirectTo: '/'
            });
});
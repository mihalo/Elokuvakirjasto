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
            .when('/movies/:id', {
                controller: 'MovieController',
                templateUrl: 'app/views/movie.html'
            })
            .when('/movies/:id/edit', {
                controller: 'EditMovieController',
                templateUrl: 'app/views/editmovie.html'
            })
            .otherwise({
                redirectTo: '/'
            });
});
MyApp.controller("AddMovieController", function ($scope, $location, FirebaseService) {
    $scope.movies = FirebaseService.getMovies();

    $scope.addMovie = function () {

        if ($scope.name && $scope.year && $scope.director && $scope.description) {
            var movie = {
                name: $scope.name,
                year: $scope.year,
                director: $scope.director,
                description: $scope.description
            };

            FirebaseService.addMovie(movie);
            $location.path('/movies');
        }

    };

});



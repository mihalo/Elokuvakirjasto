MyApp.controller('EditMovieController', function ($scope, $routeParams, $location, FirebaseService) {
    $scope.load = function () {
        FirebaseService.getMovie($routeParams.id, function (data) {
            $scope.movie = data;

            if ($scope.movie === null) {
                $location.path('/');
            } else {
                $scope.name = $scope.movie.name;
                $scope.year = $scope.movie.year;
                $scope.director = $scope.movie.director;
                $scope.description = $scope.movie.description;

                $scope.editMovie = function () {

                    if ($scope.name && $scope.year && $scope.director && $scope.description) {
                        $scope.movie.name = $scope.name;
                        $scope.movie.year = $scope.year;
                        $scope.movie.description = $scope.description;
                        $scope.movie.director = $scope.director;

                        FirebaseService.editMovie($scope.movie);
                        $location.path('/movies');
                    }

                };
            }

        });
    };
    
    $scope.load();

});


